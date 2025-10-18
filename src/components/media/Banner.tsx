import React from "react";
import { Title } from "../ui/title";
import Link from "next/link";
import Image from "next/image";
import banner_1 from "../../images/banner.png";

const Banner = () => {
  return (
    <div className="py-16 md:py-0 bg-shop_light_pink rounded-lg px-10 lg:px-24 flex items-center justify-between">
      <div className="space-y-5">
        <Title>
          Discount up to 60% on <br />
          headsets and earphones
        </Title>
        <Link
          href={"/shop"}
          className="bg-shop_dark_green text-white/90 px-5 py-2 rounded-md text-sm font-semibold hover:text-white hover:bg-shop_dark_green hoverEffect"
        >
          Buy now
        </Link>
      </div>
      <div>
        <Image
          src={banner_1}
          className="hidden md:inline-flex w-96"
          alt="banner image"
        />
      </div>
    </div>
  );
};

export default Banner;
