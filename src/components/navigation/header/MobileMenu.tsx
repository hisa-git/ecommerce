"use client";
import React from "react";
import { AlignLeft } from "lucide-react";
import { SideMenu } from "../SideMenu";
import { useState } from "react";

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={setIsOpen}>
        <AlignLeft className="hover:text-darkColor hoverEffect hover:cursor-pointer md:hidden md:gap-0" />
      </button>
      <div className="md:hidden">
        <SideMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    </>
  );
};
