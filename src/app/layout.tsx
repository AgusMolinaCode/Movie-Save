import "./globals.css";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import { ReactQueryProvider } from "./ReactQueryProvider";
import Link from "next/link";
import Signed from "./components/UI/Signed";
import Footer from "./components/Sections/Footer";
import { ToastContainer } from "react-toastify";

const inter = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movie-Save",
  description: "A movie saving app",
  keywords: ["movie", "series", "app", "TV", "watch", "movies"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
      <html lang="en">
        <ClerkProvider>
          <body className={inter.className}>
            <header className="fixed top-0 z-10 w-full ">
              <ToastContainer />
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
                        className="text-white hidden lg:block font-medium text-md md:text-xl"
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
                              className="text-white font-medium"
                              href="/favoritos"
                            >
                              My Favorites
                            </Link>

                            <Signed />
                          </SignedIn>
                          <SignedOut>
                            <Link
                              className="text-white font-medium"
                              href="/sign-in"
                            >
                              Sign In
                            </Link>
                          </SignedOut>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </header>
            <main>{children}</main>
            <Footer />
          </body>
        </ClerkProvider>
      </html>
    </ReactQueryProvider>
  );
}
