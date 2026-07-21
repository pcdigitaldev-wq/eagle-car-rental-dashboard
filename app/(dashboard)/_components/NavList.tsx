"use client";
import { cn } from "@/lib/utils";
import { Bell, Bolt, BookCheck, BookOpenText, Car, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {};

const NavList = (props: Props) => {
  const pathname = usePathname();

  const iconsClassName = "w-[24px] h-[24px]";
  const navList = [
    {
      label: "Dashboard",
      href: "/",
      Icon: <LayoutDashboard className={iconsClassName} />,
      isActive: pathname === "/",
    },
    {
      label: "Bookings",
      href: "/bookings",
      Icon: <BookCheck className={iconsClassName} />,
      isActive: pathname.startsWith("/bookings"),
    },
    {
      label: "Cars",
      href: "/cars",
      Icon: <Car className={iconsClassName} />,
      isActive: pathname.startsWith("/cars"),
    },
    {
      label: "Blogs",
      href: "/blogs",
      Icon: <BookOpenText className={iconsClassName} />,
      isActive: pathname.startsWith("/blogs"),
    },
    {
      label: "Settings",
      href: "/settings",
      Icon: <Bolt className={iconsClassName} />,
      isActive: pathname.startsWith("/settings"),
    },
  ];
  return (
    <nav className="flex flex-col gap-[16px]">
      {navList.map(({ Icon, href, isActive, label }) => (
        <Link key={label} href={href}>
          <div
            className={cn(
              "flex gap-[12px] py-[12px] px-[16px] text-white items-center rounded-[4px] relative transition ",
              isActive && "bg-[#006AFF]",!isActive && 'hover:bg-[#006aff27]'
            )}
          >
            {Icon}
            <span>{label}</span>
            {isActive && (
              <div className="bg-white rounded-[4px] w-[6px] h-[36px] left-0 absolute" />
            )}
          </div>
        </Link>
      ))}
    </nav>
  );
};

export default NavList;
