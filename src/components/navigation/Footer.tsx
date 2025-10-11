import React from "react";
import { Container } from "../Container";
import { Logo } from "../Logo";
import { SocialMedia } from "../SocialMedia";
import { SubText, SubTitle } from "../ui/title";
import { quickLinksdata } from "@/constants/quickLinksdata";
import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { getCategories } from "@/sanity/sanity-utils";

export const Footer = async () => {
  const categoriesdata = await getCategories();
  const n = 6;
  const shownCategories = categoriesdata.slice(0, n);

  return (
    <footer className="bg-white border-t">
      <Container className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="space-y-4">
          <Logo />
          <SubText className="text-gray-600 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quia
            asperiores facere itaque distinctio quod, at corrupti hic fugiat
            aspernatur, consequuntur consectetur veritatis architecto?
          </SubText>
          <SocialMedia />
        </div>

        <div>
          <SubTitle>Quick Links</SubTitle>
          <ul className="space-y-3">
            {quickLinksdata.map((item) => (
              <li key={item.href}>
                <SubText>
                  <Link
                    className="hover:text-shop_light_green hoverEffect font-medium"
                    href={item.href}
                  >
                    {item.title}
                  </Link>
                </SubText>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <SubTitle>Categories</SubTitle>
          <ul className="space-y-3">
            {shownCategories.map((item) => (
              <li key={`key-${item.slug.current}`}>
                <SubText>
                  <Link
                    className="hover:text-shop_light_green hoverEffect font-medium"
                    href={`/category/${item.slug.current}`}
                  >
                    {item.title}
                  </Link>
                </SubText>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <SubTitle>Newsletter</SubTitle>
          <SubText>
            Subscribe to our newsletter to receive updates and exclusive offers
          </SubText>
          <form className="space-y-4">
            <Input type="email" required placeholder="Enter your email" />
            <Button className="w-full bg-darkColor">Subscribe</Button>
          </form>
        </div>
      </Container>
    </footer>
  );
};
