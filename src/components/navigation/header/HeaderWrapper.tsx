"use client";
import { usePathname } from "next/navigation";
import { Header } from "@/components/navigation/header/Header";

export default function HeaderWrapper() {
  const pathname = usePathname();
  if (pathname.startsWith("/studio")) return null;
  return <Header />;
}
