import "./globals.css";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import { ReactQueryProvider } from "./ReactQueryProvider";
import Link from "next/link";
import Signed from "./components/UI/Signed";
import Footer from "./components/Sections/Footer";
import { ToastContainer } from "react-toastify";
import MenuLinks from "./components/UI/MenuLinks";


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
              <MenuLinks />
            </header>
            <main>{children}</main>
            <Footer />
          </body>
        </ClerkProvider>
      </html>
    </ReactQueryProvider>
  );
}
