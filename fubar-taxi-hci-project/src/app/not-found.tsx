"use client";
import "aos/dist/aos.css";
import "./styles.css";
import Head from "next/head";
import Image from "next/image";

export default function NotFound() {
  return (
    <>
      {/* Hero Section */}
      <Head>
        <link
          rel="preload"
          fetchPriority="high"
          as="image"
          href="/assets/backgroundPictureMobile.webp"
          type="image/webp"
        />
        <link rel="preload" href="/assets/backgroundPicture.webp" as="image" />
      </Head>
      <div
        id="hero"
        className="
        relative
        min-h-screen
        max-w-screen
        bg-[url('/assets/backgroundPictureMobile.webp')]
        md:bg-[url('/assets/backgroundPicture.webp')]
        bg-cover bg-center
        flex flex-col md:flex-row
        md:items-center
        justify-center
        md:pt-1
        px-4 
      "
        style={{ contentVisibility: "auto" }}
      >
        {/* Adjust gradient top margin to reduce space */}
        <div className="absolute mt-[50px] bg-gradient-to-b from-transparent to-[#110722] " />

        <div
          id="404"
          className="
      z-10
      text-white text-left
      max-w-full md:max-w-2xl
      mr-0 md:mr-10
      mt-0
      flex flex-col justify-start
      mb-8 md:mb-0
    "
        >
          <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-8xl font-bold leading-tight">
            We couldn't find that page for you.
          </h1>
          <h2 className="text-base sm:text-lg md:text-2xl lg:text-3xl font-semibold mt-4 leading-tight opacity-80">
            Looks like you took a wrong turn - would you like to update your
            destination to{" "}
            <a className="active text-[#FF7366]" href="/">
              home?
            </a>
          </h2>
        </div>

        <div className="z-10 flex justify-center items-center w-full md:w-auto">
          {/* Reduced margin top */}
          <Image
            src="/assets/404Taxi.png"
            alt="404 png"
            width={350}
            height={120}
            className="w-48 h-auto sm:w-72 md:w-[350px]"
            sizes="(max-width: 768px) 12rem, (max-width: 1024px) 18rem, 350px"
            priority
          />
        </div>
      </div>
    </>
  );
}
