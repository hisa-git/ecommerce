import React from "react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export const SignIn = () => {
  return (
    <>
      <SignedOut>
        <SignInButton className="text-sm font-semibold hover:text-darkColor hoverEffect text-lightColor hover:cursor-pointer" />
        <SignUpButton className="text-sm font-semibold hover:text-darkColor hoverEffect text-lightColor hover:cursor-pointer" />
      </SignedOut>
      <SignedIn>
        <div className="w-5 h-5">
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-5 h-5",
              },
            }}
          />
        </div>
      </SignedIn>
    </>
  );
};
