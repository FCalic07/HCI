'use client'
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

type Page = {
  title: string;
  path: `/${string}`;
};

const pages: Page[] = [
  { title: "Home", path: "/" },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "What We Offer",
    path: "/products",
  },

  {
    title: "Contact Form",
    path: "/contact",
  },
];

function processPage(page: Page, index: number, pathname: string) {
  return (
      <Link
        key={index}  
        href={page.path}
        className={
          page.path === "/"
            ? pathname === page.path
              ? "text-[#FF604F] overline"
              : "hover:text-[#FF604F] hover:overline"
            : pathname.startsWith(page.path)
            ? "text-[#FF604F] overline"
            : "hover:text-[#FF604F] hover:overline"
        }
      >
        {page.title}
      </Link>
  );
}


export function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const toggleMenu = () => {
      console.log("aaa");
        setIsMenuOpen(!isMenuOpen);
      };

    return (
        <header className="relative z-10 items-center flex justify-between p-1 md:pl-20 md:pr-20 text-white bg-[#170A2D]">
        <div>
          <Link href="/">
          <Image src="/fubarLogo.svg" alt="FUBAR Logo" width={150} height={70} priority />
          </Link>
        </div>
        
        <nav className="flex justify-end gap-10 font-semibold text-xl">
          {pages.map((page, index) => processPage(page, index, pathname))}
        </nav>
        
        {/* Mobile Hamburger Menu Icon */}
        <div className="md:hidden pr-4">
          <button onClick={toggleMenu} className="focus:outline-none">
            {/* Hamburger icon */}
            <svg className="w-8 h-8 text-white" fill="none" stroke="#FF604F" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-[#170A2D] text-white font-semibold text-lg absolute right-0 w-50 z-20 flex flex-col gap-4">
          <Link href="#home" className="hover:text-[#FF604F] hover:overline" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link href="#about" className="hover:text-[#FF604F] hover:overline" onClick={() => setIsMenuOpen(false)}>About</Link>
          <Link href="#services" className="hover:text-[#FF604F] hover:overline" onClick={() => setIsMenuOpen(false)}>What We Offer</Link>
          <Link href="#contact" className="hover:text-[#FF604F] hover:overline" onClick={() => setIsMenuOpen(false)}>Contact Form</Link>
        </div>
      )}

      </header>
    );
}