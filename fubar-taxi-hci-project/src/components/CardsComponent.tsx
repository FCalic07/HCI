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
    <Link href={href} className="duration-300 hover:border-[#FF7366] overflow-hidden rounded-t-lg bg-white/10 border border-gray-700 backdrop-blur-md shadow-lg rounded-lg p-2 transition-colors flex flex-col w-full md:w-[30%]">
      {/* Clickable Image */}
      <div className="relative">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full md:h-80 h-60 object-cover"
          />
      </div>
      {/* Description */}
      <p className="text-center text-xl font-bold text-white mt-4 mb-4 px-4">
        {description}
      </p>
    </Link>
  );
}
