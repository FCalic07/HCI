'use client';
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

type Page = {
  title: string;
  path: `/${string}`;
};

const pages: Page[] = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "What We Offer", path: "/products" },
  { title: "Contact Form", path: "/contact" },
];

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const closeMenu = () => setIsMenuOpen(false);

  // Close the menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="relative z-50 flex items-center justify-between p-1 md:pl-20 md:pr-20 bg-[#170A2D] text-white">
      {/* Logo */}
      <div>
        <Link href="/">
          <Image
            src="/fubarLogo.svg"
            alt="FUBAR Logo"
            width={150}
            height={70}
            priority
          />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-10 font-semibold text-xl">
        {pages.map((page, index) => (
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
        ))}
      </nav>

      {/* Mobile Hamburger Menu Icon */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="focus:outline-none">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="#FF604F"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>

      {/* Sliding Mobile Navigation Menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 h-full bg-[#170A2D] text-white transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out w-64 z-20`}
      >
        {/* Close Button */}
        <button
          onClick={closeMenu}
          className="p-4 focus:outline-none text-[#FF604F]"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>

        {/* Menu Links */}
        <nav className="flex flex-col gap-6 px-6 pt-4">
          {pages.map((page, index) => (
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
              onClick={closeMenu} // Close menu when a link is clicked
            >
              {page.title}
            </Link>
          ))}
        </nav>
      </div>

      {/* Background overlay when menu is open */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10"
          onClick={closeMenu}
        ></div>
      )}
    </header>
  );
}
