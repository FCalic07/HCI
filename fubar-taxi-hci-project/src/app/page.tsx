"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import CardsSection from "@/components/CardsSection";
import AOS from "aos";
import "aos/dist/aos.css";
import "./styles.css";

export default function Home() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div
        id="hero"
        className="relative min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/backgroundPicture.jpg')" }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-violet-950 opacity-60"></div>
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Main Content */}
        <main
          className="relative z-10 flex flex-col items-start p-8 sm:p-10 min-h-screen text-white"
          data-aos="fade-up"
        >
          <h1 className="text-5xl sm:text-7xl font-bold pt-10 leading-tight max-w-2xl">
            THE BEST
            <br />
            FOR YOUR
            <br />
            TAXI COMPANY
          </h1>
          <p className="mt-4 text-xl sm:text-2xl text-fuchsia-200 font-light">
            INCREASE YOUR PRODUCTIVITY WITH OUR SERVICE
          </p>

          <Link href="/signin2">
            <button className="mt-6 bg-red-500 hover:bg-red-700 text-white text-2xl font-semibold py-4 px-8 rounded">
              <p>Sign In</p>
            </button>
          </Link>

          <audio ref={audioRef} src="/assets/audio.mp3" preload="auto" />
        </main>
      </div>

      {/* About Us Section */}
      <section
        id="about"
        className="bg-[#170A2D] text-white py-24 md:py-30 px-8 sm:px-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Image */}
          <div className="flex justify-center">
            <img
              src="/assets/aboutUsPicture.jpg"
              alt="About Us"
              className="max-w-4/5 h-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Right Content */}
          <div className="flex-1 flex-col justify-start">
            <h2 className="text-4xl sm:text-7xl font-bold mb-6">About Us</h2>
            <p className="text-2xl tracking-wide leading-relaxed text-gray-200">
              Welcome to FUBAR, a passionate team of developers dedicated to
              improving taxi services in Bosnia and Herzegovina. Our goal is to
              create innovative, secure, and efficient taxi applications,
              building a better future for mobility — one ride at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Logo Section */}
      {
        <section
          id="fubar"
          className="md:py-0 py-16 bg-[#170A2D] text-white flex justify-center items-center"
        >
          {/* Preload the image */}
          <link
            rel="preload"
            href="/assets/sky.webp"
            as="image"
            fetchPriority="high"
          />
          <h1
            className="bg-fixed bg-center font-extrabold uppercase text-transparent text-center text-7xl md:text-[10vw]"
            style={{
              backgroundImage: "url('/assets/sky.webp')",
              backgroundSize: "cover",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            <span className="align-baseline">FUBAR</span>
            <span className="text-3xl md:text-[4vw] align-baseline ml-2">
              TAXI
            </span>
          </h1>
        </section>
      }

      {/* Cards Section */}
      <section id="cards">
        <CardsSection />
      </section>
    </>
  );
}
