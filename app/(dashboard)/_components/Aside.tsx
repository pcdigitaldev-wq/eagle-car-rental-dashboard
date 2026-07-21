import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavList from "./NavList";
import SuperButton from "../../../components/SuperButton";
 

/* eslint-disable @typescript-eslint/no-unused-vars */
// @typescript-eslint/no-empty-object-type
type Props = {};

const Aside = (props: Props) => {
  return (
    <aside className="w-[240px] bg-site-primary p-[24px] flex flex-col gap-[8px]">
      {/* logo */}
      <Link href={"/"}>
        <div className="relative w-full aspect-video ">
          <Image
            priority
            src={"/Logo.png"}
            className="object-contain"
            fill
            alt="Logo"
          />
        </div>
      </Link>
      {/* nav list */}
      <NavList />
      {/* signout button */}
      <SuperButton className="mt-auto bg-[#41516E] hover:bg-[#41516E]/85" buttonType="signOut" title="Logout"  />
    </aside>
  );
};

export default Aside;
