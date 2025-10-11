import React from "react";
import { Container } from "./Container";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const Logo = ({
  className,
  spanDesign,
}: {
  className?: string;
  spanDesign?: string;
}) => {
  return (
    <Container className="px-0">
      <Link href={"/"} className="inline-flex">
        <h2
          className={cn(
            "text-xl font-black tracking-wider uppercase font-sans hoverEffect transition-colors group",
            className
          )}
        >
          Shopcar
          <span className={cn("text-shop_light_green", spanDesign)}>t</span>
        </h2>
      </Link>
    </Container>
  );
};
