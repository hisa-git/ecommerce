import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Github,
  Linkedin,
  Slack,
} from "lucide-react";
import { socialLinks } from "@/constants/socialLinks";
import { cn } from "@/lib/utils";
import {
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
  TooltipContent,
} from "../ui/tooltip";
import Link from "next/link";

export const SocialMedia = () => {
  const socialLinks = [
    {
      title: "Youtube",
      href: "https://www.youtube.com/@shopify",
      icon: <Youtube className="w-5 h-5" />,
    },
    {
      title: "Github",
      href: "https://www.youtube.com/@shopify",
      icon: <Github className="w-5 h-5" />,
    },
    {
      title: "Linkedin",
      href: "https://www.youtube.com/@shopify",
      icon: <Linkedin className="w-5 h-5" />,
    },
    {
      title: "Facebook",
      href: "https://www.youtube.com/@shopify",
      icon: <Facebook className="w-5 h-5" />,
    },
    {
      title: "Slack",
      href: "https://www.youtube.com/@shopify",
      icon: <Slack className="w-5 h-5" />,
    },
  ];
  return (
    <TooltipProvider>
      <div className="flex gap-3">
        {socialLinks.map((item) => (
          <Tooltip key={item?.title}>
            <TooltipTrigger asChild>
              <Link
                href={item?.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn("p-2 border rounded-full hoverEffect")}
              >
                {item?.icon}
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>{item?.title}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};
