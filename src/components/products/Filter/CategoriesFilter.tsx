"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Badge } from "../../ui/badge";
import CategoryType from "./CategoryType";

type Props = {
  categories: CategoryType[];
  speed?: number;
  gap?: number;
};

export default function CategoriesTicker({
  categories,
  speed = 25,
  gap = 8,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const offsetRef = useRef<number>(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [contentWidth, setContentWidth] = useState(0);

  //const items = [{ _id: "all", title: "All" }, ...categories];
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

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);
  const handleBadgeEnter = () => setIsPaused(true);
  const handleBadgeLeave = () => setIsPaused(false);

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
            (selectedId === category._id
              ? "bg-black/90 border-black1/90 text-white"
              : "bg-white border-black/10 text-black hover:bg-black/80 hover:text-white")
          }
          onMouseEnter={handleBadgeEnter}
          onMouseLeave={handleBadgeLeave}
          onClick={() => setSelectedId(category._id)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setSelectedId(category._id);
            }
          }}
        >
          <span className="px-3 py-1 text-sm">{category.title}</span>
        </Badge>
      </div>
    ));

  return (
    <div
      className="w-full overflow-hidden select-none mt-10 mb-5"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={containerRef}
      aria-label="Categories ticker"
    >
      <div
        ref={scrollerRef}
        className="flex whitespace-nowrap will-change-transform"
        style={{ transform: "translateX(0px)" }}
      >
        <div className="flex ticker-first">{renderBadges("first")}</div>
        <div className="flex" aria-hidden="true">
          {renderBadges("second")}
        </div>
      </div>
      <style jsx>{`
        .ticker-first,
        .ticker-first > div,
        .flex > div {
          display: inline-flex;
        }
      `}</style>
    </div>
  );
}
