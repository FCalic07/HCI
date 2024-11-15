'use client'
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
      };

    return (
        <header className="relative z-10 flex justify-between items-center p-1 md:pl-20 md:pr-20 text-white bg-[#170A2D]">
        <div>
          <Link href="#home">
          <Image src="/fubarLogo.svg" alt="FUBAR Logo" width={150} height={70} priority />
          </Link>
        </div>
        <nav className="hidden md:flex gap-10 font-semibold text-xl">
          <Link href="#home" className="hover:text-[#FF604F] hover:overline">Home</Link>
          <Link href="#about" className="hover:text-[#FF604F] hover:overline">About</Link>
          <Link href="#services" className="hover:text-[#FF604F] hover:overline">What We Offer</Link>
          <Link href="#contact" className="hover:text-[#FF604F] hover:overline">Contact Form</Link>
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
      </header>
    );
}