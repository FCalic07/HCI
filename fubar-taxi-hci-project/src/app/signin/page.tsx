import type { Metadata } from "next";
import PlayElvis from "./playElvis"

export const metadata: Metadata = {
  title: "Contact",
};

export default function AboutPage() {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/backgroundPicture.jpg')" }}
    >
      <div className="absolute inset-0 bg-violet-950 opacity-60"></div>
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <main className="flex min-h-screen flex-col items-center p-10 z-10">
        <PlayElvis />
      </main>
    </div>
  );
}
