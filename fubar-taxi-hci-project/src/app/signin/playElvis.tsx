'use client';

import { useState, useRef } from "react";

export default function PlayElvis() {
  const [playElvis, setPlayElvis] = useState("Play Elvis");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playElvisSong = () => {
    if (audioRef.current) {
      if (playElvis === "Play Elvis") {
        audioRef.current.play();
        setPlayElvis("Pause Elvis");
      } else {
        audioRef.current.pause();
        setPlayElvis("Play Elvis");
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-white text-6xl font-extrabold tracking-tight z-10">You are signed in!</h1>
      <button
        onClick={playElvisSong}
        className="z-20 mt-6 bg-red-500 hover:bg-red-700 text-white text-2xl font-semibold py-4 px-8 rounded"
      >
        {playElvis}
      </button>
      <audio ref={audioRef} src="/assets/audio.mp3" preload="auto" />
    </div>
  );
}
