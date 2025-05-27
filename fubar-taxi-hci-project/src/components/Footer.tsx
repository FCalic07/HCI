import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-[#170A2D] text-white">
      <div className="flex flex-col items-center justify-center">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/fubarLogo.svg"
            alt="FUBAR Logo"
            width={120}
            height={70}
            priority
          />
        </Link>

        {/* Horizontal Line */}
        <div className="w-full max-w-6xl border-t border-gray-700 mb-2"></div>

        {/* Copyright Text */}
        <p className="text-base text-gray-400 text-center">
          Copyrights © FUBAR. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
