import React from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useOutsideClick } from "@/hooks";
import { X } from "lucide-react";
import { headerData } from "@/constants/headerdata";
import { usePathname } from "next/navigation";
import { Logo } from "../../media/Logo";

export default function Cart({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const sidebarRef = useOutsideClick<HTMLDivElement>(onClose);

  return (
    <>
      <div className="group relative inline-block">
        <ShoppingBag className="w-5 h-5 hover:text-shop_light_green hoverEffect" />
        <span className="absolute -top-1 -right-1 text-xs bg-shop_dark_green text-white rounded-full px-1">
          0
        </span>
      </div>

      <div
        className={`fixed inset-y-0 left-0 z-50 w-full h-screen bg-black/50 transition-transform md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={onClose}
      >
        <div
          className="min-w-72 max-w-96 bg-black h-screen border-r p-10 border-r-shop_right_green flex flex-col gap-6 text-white shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between gap-5">
            <Logo className="text-white" />
            <button
              onClick={onClose}
              className="hover:text-shop_light_green hoverEffect"
            >
              <X />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
