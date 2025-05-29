"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import AdminNavigation from "./AdminNavigation";

type Page = {
  title: string;
  path: string;
};

const basicPages: Page[] = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "Our Services", path: "/products" },
  { title: "Contact Form", path: "/contact" },
];

const adminPages: Page[] = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "Our Services", path: "/products" },
  { title: "Contact Form", path: "/contact" },
  { title: "Admin Page", path: "/adminpage/dashboard" },
];

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false); // NEW STATE
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const [user] = useAuthState(auth);
  const pages = user ? adminPages : basicPages;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close profile modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileModalOpen(false);
      }
    };
    if (isProfileModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isProfileModalOpen]);

  const isActive = (page: Page) => {
    return page.path === "/"
      ? pathname === page.path
      : (pathname ?? "").startsWith(page.path);
  };

  const isAdminPage = pathname?.startsWith("/adminpage");

  if (isAdminPage) {
    return <AdminNavigation user={user} />;
  }

  return (
    <header className="relative z-40 flex items-center justify-between pl-10 pr-10 bg-[#170A2D] text-white">
      {" "}
      {/*LOGO  */}
      <div className="flex justify-between items-center">
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
      </div>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-10 font-semibold text-xl items-center">
        {pages.map((page, index) => (
          <Link
            key={index}
            href={page.path}
            className={`nav-link-overline ${
              isActive(page) ? "active text-[#FF604F]" : "hover:text-[#FF604F]"
            }`}
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
        className={`fixed top-0 right-0 h-full bg-[#170A2D] bg-opacity-20 backdrop-blur-md shadow-xl text-white transform ${
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
              className={`nav-link-overline ${
                isActive(page)
                  ? "active text-[#FF604F]"
                  : "hover:text-[#FF604F]"
              }`}
              onClick={closeMenu}
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
