"use client";
import { useEffect } from "react";
import Link from "next/link";
import CardsSection from "@/components/CardsSection";
import AOS from "aos";
import "aos/dist/aos.css";
import "./styles.css";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { signOut } from "firebase/auth";

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const [user] = useAuthState(auth);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <>
      {/* Hero Section */}
      <div
        id="hero"
        className="relative md:min-h-screen h-[880px] md:max-w-screen"
        style={{ contentVisibility: "auto" }}
      >
        <Image
          src="/assets/backgroundPicture.webp"
          alt="Taxi company background"
          fill={true}
          objectFit="cover"
          priority // triggers preload
          fetchPriority="high" // helps modern browsers prioritize LCP
          className="z-0 h-[880px] w-screen"
        />
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
          {!user && (
            <Link href="/signin">
              <button
                className="mt-6 bg-red-500 hover:bg-red-700 text-white text-2xl font-semibold py-4 px-8 rounded"
                aria-label="Sign In button"
              >
                <p>Sign In</p>
              </button>
            </Link>
          )}
          {user && (
            <button
              onClick={handleLogout}
              className="mt-6 bg-red-500 hover:bg-red-700 text-white text-2xl font-semibold py-4 px-8 rounded"
              aria-label="Sign Out button"
            >
              <p>Sign Out</p>
            </button>
          )}
        </main>
      </div>

      {/* About Us Section */}
      <section
        id="about"
        className="
  bg-[#170A2D]
  text-white
  py-24
  px-2      
  md:py-30    
  sm:pr-10  
  sm:pl-10
"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-16 gap-8 items-center">
          {/* Left Image */}
          <div className="flex justify-center">
            <img
              src="/assets/aboutUsPicture.webp"
              alt="About Us"
              className="max-w-4/5 h-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Right Content */}
          <div className="md:px-0 px-4 flex-1 flex-col justify-start">
            <h2 className="text-4xl sm:text-7xl font-bold md:text-start text-center mb-6">About Us</h2>
            <p className="text-2xl tracking-wide leading-relaxed text-gray-200 ">
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
          className="md:pt-16 md:pb-0 pb-4 bg-[#170A2D] text-white flex justify-center items-center"
        >
          {/* Logo background image for text effect (preloading handled by Next.js automatically) */}
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
