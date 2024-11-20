import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/assets/backgroundPicture.jpg')" }}>
        <div className="absolute inset-0 bg-violet-950 opacity-60"></div>
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <main className="flex min-h-screen flex-col items-center p-10 z-10">
        <h1 className="text-white text-6xl font-extrabold tracking-tight z-10">Contact Form</h1>
        </main>

    </div>
  );
}