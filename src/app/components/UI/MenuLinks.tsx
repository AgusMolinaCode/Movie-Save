"use client";
import React from "react";
import Link from "next/link";
import Signed from "./Signed";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

const MenuLinks = () => {
  const router = usePathname();

  return (
    <div className="py-3 px-3 md:px-8 bg-opacity-50 backdrop-filter backdrop-blur-md transition-all duration-500 ease-in-out bg-zinc-950">
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-4 items-center">
          <div className="h-[2.6rem] flex">
            <Link
              href="/"
              className="text-[#9fbff5] font-extrabold flex items-center justify-center md:items-start md:justify-start text-[1.47rem] md:text-3xl"
            >
              Movie-Save
            </Link>
          </div>
          <div className="flex justify-center mx-auto gap-2">
            <Link
              href="/"
              className={`text-white hidden lg:block font-medium text-md md:text-xl ${
                router === "/" ? "underline underline-offset-1" : ""
              }`}
            >
              Home
            </Link>
          </div>
        </div>
        <div className="flex items-center  gap-4">
          <div className="flex justify-center gap-2 items-center">
            <div>
              <div className="flex justify-center items-center gap-2">
                <SignedIn>
                  <Link
                    className={`text-white flex font-medium text-md md:text-xl ${
                      router === "/favoritos"
                        ? "underline underline-offset-1"
                        : ""
                    }`}
                    href="/favoritos"
                  >
                    My Favorites
                  </Link>

                  <Signed />
                </SignedIn>
                <SignedOut>
                  <Link className="text-white font-medium" href="/sign-in">
                    Sign In
                  </Link>
                </SignedOut>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuLinks;
