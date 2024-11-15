'use client'
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import './styles.css';

export default function Home() {
  const [playSaban, setPlaySaban] = useState("Play Elvis");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSabanSaulic = () => {
    if (audioRef.current) {
      if (playSaban === "Play Elvis") {
        audioRef.current.play();
        setPlaySaban("Pause Elvis");
      } else {
        audioRef.current.pause();
        setPlaySaban("Play Elvis");
      }
    }
  };

  // State for toggling the mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/assets/backgroundPicture.jpg')" }}>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-violet-950 opacity-60"></div>
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Header */}
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

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-[#170A2D] text-white font-semibold text-lg absolute right-0 w-50 z-20 flex flex-col gap-4">
          <Link href="#home" className="hover:text-[#FF604F] hover:overline" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link href="#about" className="hover:text-[#FF604F] hover:overline" onClick={() => setIsMenuOpen(false)}>About</Link>
          <Link href="#services" className="hover:text-[#FF604F] hover:overline" onClick={() => setIsMenuOpen(false)}>What We Offer</Link>
          <Link href="#contact" className="hover:text-[#FF604F] hover:overline" onClick={() => setIsMenuOpen(false)}>Contact Form</Link>
        </div>
      )}

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-start p-8 sm:p-20 min-h-screen text-white">
        <h1 className="text-5xl sm:text-7xl font-bold pt-20 leading-tight max-w-2xl">
          THE BEST<br />
          FOR YOUR<br />
          TAXI COMPANY
        </h1>
        <p className="mt-4 text-xl sm:text-2xl text-fuchsia-200 font-light">
          INCREASE YOUR PRODUCTIVITY WITH OUR SERVICE
        </p>
        <button onClick={playSabanSaulic} className="mt-6 bg-red-500 hover:bg-red-700 text-white text-2xl font-semibold py-4 px-8 rounded">
          {playSaban}
        </button>

        <audio ref={audioRef} src="/assets/audio.mp3" preload="auto" />
      </main>
    </div>
  );
}
