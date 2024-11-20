'use client'
import { useRef } from "react";
import Link from "next/link";
import './styles.css';

export default function Home() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/assets/backgroundPicture.jpg')" }}>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-violet-950 opacity-60"></div>
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Header in layout */}

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
  );
}
