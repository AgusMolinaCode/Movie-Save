import Link from "next/link";
import React from "react";
import { FaArrowUp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black  border-t-2 border-[#9fbff5]">
      <div className="relative mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 lg:pt-24">
        <div className="absolute end-4 top-4 sm:end-6 sm:top-6 lg:end-8 lg:top-8">
          <Link
            className="inline-block rounded-full hover:bg-[#9fbff5] p-2  shadow transition duration-300 bg-gray-300 sm:p-3 lg:p-4"
            href="#MainContent"
          >
            <span className="sr-only">Back to top</span>

            <FaArrowUp className="h-6 w-6 text-black " />
          </Link>
        </div>

        <div className="lg:flex lg:items-end lg:justify-between">
          <div>
            <div className="flex justify-center  lg:justify-start">
              <Link
                href="/"
                className="text-[#9fbff5] font-extrabold flex items-center justify-center md:items-start md:justify-start text-[1.47rem] md:text-3xl"
              >
                Movie-Save
              </Link>
            </div>

            <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-300 lg:text-left">
              This is an application to save your favorite movies and remember
              to watch them, Developed by Agustin Molina
            </p>

            <div className="mt-6 flex gap-4 justify-center  lg:justify-start">
              <Link
                target="_blank"
                href="https://www.linkedin.com/in/agustin-molina-994635138/"
                className="text-gray-300 text-xl transition hover:text-[#9fbff5]"
              >
                LinkedIn
              </Link>
              <Link
                target="_blank"
                href="https://github.com/AgusMolinaCode"
                className="text-gray-300 text-xl transition hover:text-[#9fbff5]"
                >
                GitHub
                </Link>


            </div>
          </div>

          <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:justify-end lg:gap-12">
            <li>
              <Link
                className="text-gray-300 text-xl transition hover:text-[#9fbff5]"
                href="/"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                className="text-gray-300 text-xl transition hover:text-[#9fbff5]"
                href="/favoritos"
              >
                Favorites
              </Link>
            </li>
          </ul>
        </div>

        <p className="mt-12 text-center text-sm text-gray-500 lg:text-right">
          Copyright &copy; {new Date().getFullYear()}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
