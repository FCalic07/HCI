'use client';
import Link from "next/link";

type CardProps = {
  href: string;
  imageSrc: string;
  imageAlt: string;
  description: string;
};

export default function Card({ href, imageSrc, imageAlt, description }: CardProps) {
  return (
    <div className="bg-white/10 border border-white/20 backdrop-blur-md shadow-lg rounded-lg p-2 transition-colors flex flex-col w-full md:w-[30%]">
      {/* Clickable Image */}
      <div className="relative">
        <Link href={href} className="block overflow-hidden rounded-t-lg">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-80 object-cover"
          />
        </Link>
        {/* Learn More Button */}
        <Link
          href={href}
          className="absolute bottom-2 left-2 bg-[#170A2D] text-white text-xl font-semibold p-3 rounded border border-white hover:bg-[#30155D] transition"
        >
          LEARN MORE
        </Link>
      </div>
      {/* Description */}
      <p className="text-center text-xl font-bold text-white mt-4 mb-4 px-4">
        {description}
      </p>
    </div>
  );
}
