"use client";
import React, { useState } from "react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export const SignIn = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  return (
    <>
      <SignedOut>
        <SignInButton mode="modal" />
        <SignUpButton mode="modal" />
      </SignedOut>
      <SignedIn>
        <UserButton
          appearance={{
            elements: {
              avatarBox: "w-1 h-1 bottom-0.5",
            },
          }}
        ></UserButton>
      </SignedIn>
    </>
  );
};
