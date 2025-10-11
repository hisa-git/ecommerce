"use client";
import React, { FC } from "react";
import { Logo } from "../Logo";
import { X } from "lucide-react";
import { headerData } from "@/constants/headerdata";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SocialMedia } from "../SocialMedia";
import { on } from "events";
import { useOutsideClick } from "@/hooks";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SideMenu: FC<SideMenuProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const sidebarRef = useOutsideClick<HTMLDivElement>(onClose);
  return (
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

        <div className="flex flex-col space-y-3.5 font-semibold tracking-wide">
          {headerData.map((item) => (
            <Link
              href={item.href}
              key={item.title}
              className={`hover:text-shop_light_green hoverEffect ${
                pathname === item.href ? "text-shop_light_green" : ""
              }`}
            >
              {item.title}
            </Link>
          ))}
        </div>
        <SocialMedia />
      </div>
    </div>
  );
};
