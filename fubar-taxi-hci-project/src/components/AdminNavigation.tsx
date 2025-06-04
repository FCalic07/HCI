"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { signOut, User } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import ProfileModal from "./ProfileModal";

const adminPages = [
  { title: "Home Page", path: "/" },
  { title: "Dashboard", path: "/adminpage/dashboard" },
  { title: "Rides",     path: "/adminpage/rides" },
  { title: "Income",    path: "/adminpage/income" },
  { title: "Employees", path: "/adminpage/employees" },
];

export default function AdminNavigation({ user }: { user: User }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const profilePic = user?.photoURL || "/assets/default-profile.png";

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const isActive = (path: string) =>
    path === "/" ? pathname === path : (pathname ?? "").startsWith(path);

  const handleLogout = async () => {
    await signOut(auth);
    setIsProfileModalOpen(false);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node))
        closeMenu();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setIsProfileModalOpen(false);
      }
    };
    if (isProfileModalOpen) {
      document.addEventListener("mousedown", handler);
    }
    return () => document.removeEventListener("mousedown", handler);
  }, [isProfileModalOpen]);

  return (
    <header className="relative z-40 flex items-center justify-between pl-4 pr-4 bg-[#170A2D] text-white">
      {/* Logo */}
      <Link href="/adminpage/dashboard">
        <Image
          src="/fubarLogo.svg"
          alt="FUBAR Logo"
          width={150}
          height={70}
          priority
        />
      </Link>
      {/* Desktop Profile Icon */}
      <nav className="hidden md:flex gap-10 font-semibold text-xl items-center">
        <Link href={"/"} className={`nav-link-overline hover:text-[#FF604F]`}>
          Homepage
        </Link>
        <div
          className="w-10 h-10 relative cursor-pointer"
          onClick={() => setIsProfileModalOpen(true)}
        >
          <Image
            src={profilePic}
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full border-2 border-[#FF604F] object-cover"
          />
        </div>
      </nav>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="focus:outline-none">
          <HamburgerIcon />
        </button>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMenuOpen}
        menuRef={menuRef}
        links={adminPages}
        isActive={isActive}
        onClose={closeMenu}
        handleLogout={handleLogout}
      />

      {isMenuOpen && <Overlay onClick={closeMenu} />}

      {isProfileModalOpen && (
        <ProfileModal
          profilePic={profilePic}
          user={user}
          profileRef={profileRef}
          handleLogout={handleLogout}
          setIsProfileModalOpen={setIsProfileModalOpen}
        />
      )}
    </header>
  );
}

function HamburgerIcon() {
  return (
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
      />
    </svg>
  );
}

function Overlay({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-black opacity-50 z-10"
      onClick={onClick}
    ></div>
  );
}

function MobileMenu({
  isOpen,
  menuRef,
  links,
  isActive,
  onClose,
  handleLogout,
}: {
  isOpen: boolean;
  menuRef: React.RefObject<HTMLDivElement>;
  links: { title: string; path: string }[];
  isActive: (path: string) => boolean;
  onClose: () => void;
  handleLogout: () => void;
}) {
  return (
    <div
      ref={menuRef}
      className={`fixed top-0 right-0 h-full bg-[#170A2D] bg-opacity-20 backdrop-blur-md shadow-xl text-white transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out w-64 z-20`}
    >
      <button
        onClick={onClose}
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
          />
        </svg>
      </button>
      <nav className="flex flex-col gap-6 px-6 pt-4">
        {links.map((page, index) => (
          <Link
            key={index}
            href={page.path}
            className={`nav-link-overline ${
              isActive(page.path)
                ? "active text-[#FF604F]"
                : "hover:text-[#FF604F]"
            }`}
            onClick={onClose}
          >
            {page.title}
          </Link>
        ))}
        <button onClick={handleLogout}>Sign out</button>
      </nav>
    </div>
  );
}
