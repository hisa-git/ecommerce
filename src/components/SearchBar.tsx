"use client";
import React from "react";
import { Search } from "lucide-react";

export const SearchBar = ({ className }: { className?: string }) => {
  return (
    <div>
      <Search className="w-5 h-5 hover:text-shop_light_green hoverEffect"></Search>
    </div>
  );
};
