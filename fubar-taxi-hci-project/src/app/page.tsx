'use client'
import Image from "next/image";
import { useRef, useState } from "react";

export default function Home() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioButton, setAudioButton] = useState("Play song");

  const playSabanSaulic = () => {
    console.log("aa")
    if (audioRef.current) {
      console.log("aaa")
      if (audioButton === "Play song") {
        audioRef.current.play().catch((error) => {
          console.error("Autoplay failed due to user interaction requirements:", error);
        });
        setAudioButton("Pause song");
      } else if (audioButton === "Pause song") {
        audioRef.current.pause();
        setAudioButton("Play song");
      }
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

        <button 
          onClick={playSabanSaulic} 
          className="bg-white text-black font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-gray-100 transition-all duration-300 hover:shadow-xl active:scale-95">
            {audioButton}
        </button>

        <audio ref={audioRef} src="/assets/audio.mp3" preload="auto" />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
      </footer>
    </div>
  );
}
