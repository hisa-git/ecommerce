"use client";
import React from "react";
import { Container } from "./Container";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { headerData } from "@/constants/headerdata";
import { usePathname } from "next/navigation";

export const HeaderMenu = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  return (
    <nav className="hidden md:flex items-center gap-7 text-sm capitalize font-semibold text-lightColor font-semibold">
      {headerData?.map((item) => (
        <Link
          key={item?.title}
          href={item?.href}
          className={`hover:text-shop_light_green hoverEffect relative group ${pathname === item?.href ? "text-shop_light_green" : ""} ${className}`}
        >
          {item?.title}
          <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-shop_light_green origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        </Link>
      ))}
    </nav>
  );
};
