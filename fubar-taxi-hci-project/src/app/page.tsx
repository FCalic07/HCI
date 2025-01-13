'use client'
import { useRef } from "react";
import Link from "next/link";
import './styles.css';

export default function Home() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  return (
    <>
      {/* Hero Section */}
      <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/assets/backgroundPicture.jpg')" }}>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-violet-950 opacity-60"></div>
        <div className="absolute inset-0 bg-black opacity-50"></div>

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
          
          <Link href="/signin">
            <button className="mt-6 bg-red-500 hover:bg-red-700 text-white text-2xl font-semibold py-4 px-8 rounded">
              <p>Sign In</p>
            </button>
          </Link>

          <audio ref={audioRef} src="/assets/audio.mp3" preload="auto" />
        </main>
      </div>

      {/* About Us Section */}
      <section className="bg-[#170A2D] text-white py-20 px-8 sm:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left Image */}
          <div className="flex justify-center">
            <img 
              src="/assets/aboutUsPicture.jpg" 
              alt="About Us" 
              className="max-w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Right Content */}
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              About Us
            </h2>
            <p className="text-lg leading-relaxed text-gray-200">
              We are dedicated to providing cutting-edge solutions for taxi companies,
              ensuring smooth operations and increased productivity. Our innovative platform
              is designed to connect passengers, dispatchers, and drivers seamlessly, making
              taxi management effortless and efficient.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#170A2D] text-white py-20 flex justify-center items-center">
        <h1
          className="text-[10vw] font-extrabold uppercase text-transparent"
          style={{
            backgroundImage: "url('/assets/sky.jpg')", // Use the image for the letters
            backgroundSize: "cover", // Ensures the image covers the letters
            backgroundPosition: "center", // Centers the image within the letters
            WebkitBackgroundClip: "text", // Makes the image visible only within the text
            WebkitTextFillColor: "transparent", // Ensures the text is transparent, showing only the image
          }}
        >
          FUBAR
        </h1>
      </section>

        <section className="bg-[#170A2D] py-20 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="bg-gradient-to-b from-white to-[#FF604F] rounded-lg p-2 shadow-lg flex flex-col">
          {/* Clickable Image */}
          <div className="relative">
            <a href="#card1" className="block overflow-hidden rounded-t-lg">
              <img
                src="/assets/dispatcheer.jpg"
                alt="Card 1"
                className="w-full h-64 object-cover"
              />
            </a>
            {/* Learn More Button */}
            <a
              href="#card1"
              className="absolute bottom-2 left-2 bg-[#170A2D] text-white text-xl font-semibold p-3 rounded border border-white hover:bg-purple-800 transition"
            >
              LEARN MORE
            </a>
          </div>
          {/* Description */}
          <p className="text-center text-xl font-bold text-white mt-4 mb-4 px-4">
            Dispatcher App
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-gradient-to-b from-white to-[#FF604F] rounded-lg p-2 shadow-lg flex flex-col">
          <div className="relative">
            <a href="#card2" className="block overflow-hidden rounded-t-lg">
              <img
                src="/assets/happyWoman.jpg"
                alt="Card 2"
                className="w-full h-64 object-cover"
              />
            </a>
            <a
              href="#card2"
              className="absolute bottom-2 left-2 bg-[#170A2D] text-white text-xl font-semibold p-3 rounded border border-white hover:bg-purple-800 transition"
            >
              LEARN MORE
            </a>
          </div>
          <p className="text-center text-xl font-bold text-white mt-4 mb-4 px-4">
            Customized App
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-gradient-to-b from-white to-[#FF604F] rounded-lg p-2 shadow-lg flex flex-col">
          <div className="relative">
            <Link href="#card3" className="block overflow-hidden rounded-t-lg">
              <img
                src="/assets/onphone.jpg"
                alt="Card 3"
                className="w-full h-64 object-cover"
              />
            </Link>
            <a
              href="#card3"
              className="absolute bottom-2 left-2 bg-[#170A2D] text-white text-xl font-semibold p-3 rounded border border-white hover:bg-purple-800 transition"
            >
              LEARN MORE
            </a>
          </div>
          <p className="text-center text-xl font-bold text-white mt-4 mb-4 px-4">
            Taxi Mobile App
          </p>
        </div>
      </div>
    </div>
  </section>





    </>
  );
}
