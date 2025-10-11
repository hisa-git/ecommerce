import { cn } from "@/lib/utils";
import React from "react";

export function Title({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "text-3xl font-semibold text-shop_dark_green capitalize tracking-wide font-sans",
        className
      )}
    >
      {children}
    </h2>
  );
}

export const SubText = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return <p className={cn("text-gray-600 text-sm", className)}>{children}</p>;
};

export function SubTitle({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <h3 className={cn("font-semibold text-gray-900", className)}>{children}</h3>
  );
}
