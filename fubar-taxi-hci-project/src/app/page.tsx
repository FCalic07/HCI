'use client'
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";

export default function Home() {
  const [playSaban, setPlaySaban] = useState("Play Saban");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSabanSaulic = () => {
    if(audioRef.current){
      if(playSaban == "Play Saban"){
        audioRef.current.play();
        setPlaySaban("Pause Saban");
      }
      else {
        audioRef.current.pause();
        setPlaySaban("Play Saban");
      }
    }
  }

  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/assets/backgroundPicture.jpg')" }}>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-violet-950 opacity-60"></div>
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-4 pl-32 pr-32 text-white">
        <div>
          <Link href="#home">
          <Image src="/fubarLogo.svg" alt="FUBAR Logo" width={120} height={50} priority />
          </Link>
        </div>
        <nav className="flex gap-8 font-semibold text-xl">
          <Link href="#home" className="hover:underline">Home</Link>
          <Link href="#about" className="hover:underline">About</Link>
          <Link href="#services" className="hover:underline">What We Offer</Link>
          <Link href="#contact" className="hover:underline">Contact Form</Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-start p-20 pl-32 min-h-screen text-white">
        <h1 className="text-5xl sm:text-7xl font-bold pt-20 leading-tight max-w-2xl">
          THE BEST<br/>
          FOR YOUR<br/>
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
