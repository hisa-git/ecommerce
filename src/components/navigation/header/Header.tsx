import React from "react";
import { Container } from "../../Container";
import { Logo } from "../../Logo";
import { HeaderMenu } from "./HeaderMenu";
import { SearchBar } from "../../SearchBar";
import { CartIcon } from "../../CartIcon";
import { FavoriteButton } from "./FavoriteButton";
import { SignIn } from "../../SignIn";
import { MobileMenu } from "./MobileMenu";

export const Header = () => {
  return (
    <header className="bg-white py-5 border-b border-b-black/20">
      <Container className="flex items-center text-light_color">
        {/* Левая часть */}
        <div className="flex-1 flex items-center gap-3">
          <MobileMenu />
          <div className="flex items-center gap-2">
            <Logo />
          </div>
        </div>

        {/* Центр */}
        <div className="flex-1 flex justify-center">
          <HeaderMenu />
        </div>

        {/* Правая часть */}
        <div className="flex-1 flex justify-end gap-5">
          <SearchBar />
          <CartIcon />
          <FavoriteButton />
          <SignIn />
        </div>
      </Container>
    </header>
  );
};
