import React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";

export const FavoriteButton = () => {
  return (
    <Link href="/cart" className="group relative inline-block">
      <Heart className="w-5 h-5 hover:text-shop_light_green hoverEffect" />
      {/*<span className="absolute -top-1 -right-1 text-xs bg-shop_dark_green text-white rounded-full px-1">
        0
  </span>*/}
    </Link>
  );
};
