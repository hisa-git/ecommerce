"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Badge } from "../../ui/badge";
import CategoryType from "./CategoryType";

type Props = {
  categories: CategoryType[];
  speed?: number;
  gap?: number;
  onCategorySelect?: (id: string | null) => void;
};

export default function CategoriesTicker({
  categories,
  speed = 25,
  gap = 8,
  onCategorySelect,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const offsetRef = useRef<number>(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [contentWidth, setContentWidth] = useState(0);

  const items = [...categories];

  const measure = useCallback(() => {
    if (!scrollerRef.current) return;
    const firstPart = scrollerRef.current.querySelector(
      ".ticker-first"
    ) as HTMLDivElement | null;
    if (!firstPart) return;
    const w = firstPart.getBoundingClientRect().width;
    setContentWidth(w);
  }, []);
  //useEffect(() => {
    //console.log("Categories in ticker:", categories);
  //}, [categories]);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(() => measure());
    if (scrollerRef.current) ro.observe(scrollerRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  useEffect(() => {
    const step = (time: number) => {
      if (isPaused) {
        lastTimeRef.current = time;
        animationRef.current = requestAnimationFrame(step);
        return;
      }
      if (lastTimeRef.current == null) lastTimeRef.current = time;
      const delta = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;
      const move = speed * delta;
      offsetRef.current += move;
      if (contentWidth > 0 && offsetRef.current >= contentWidth) {
        offsetRef.current -= contentWidth;
      }
      if (scrollerRef.current) {
        scrollerRef.current.style.transform = `translateX(-${offsetRef.current}px)`;
      }
      animationRef.current = requestAnimationFrame(step);
    };
    animationRef.current = requestAnimationFrame(step);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
      lastTimeRef.current = null;
    };
  }, [isPaused, contentWidth, speed]);

  const handleSelect = (slug: string) => {
    const newId = selectedId === slug ? null : slug;
    setSelectedId(newId);
    onCategorySelect?.(newId);
  };

  const renderBadges = (prefix: string) =>
    items.map((category) => (
      <div
        key={`${prefix}-${category._id}`}
        className="mr-2 mb-0"
        style={{ marginRight: gap }}
      >
        <Badge
          className={
            "inline-flex items-center cursor-pointer transition-all border " +
            (selectedId === category.slug.current
              ? "bg-black/90 border-black/90 text-white"
              : "bg-white border-black/10 text-black hover:bg-black/80 hover:text-white")
          }
          onClick={() => handleSelect(category.slug.current)}
        >
          <span className="px-3 py-1 text-sm">{category.title}</span>
        </Badge>
      </div>
    ));

  return (
    <div
      className="w-full overflow-hidden select-none mt-10 mb-5"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      ref={containerRef}
    >
      <div
        ref={scrollerRef}
        className="flex whitespace-nowrap will-change-transform"
      >
        <div className="flex ticker-first">{renderBadges("first")}</div>
        <div className="flex" aria-hidden="true">
          {renderBadges("second")}
        </div>
      </div>
    </div>
  );
}
