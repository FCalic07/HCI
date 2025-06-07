import type { Metadata } from "next";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import ContactForm from "./_components/contactForm";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {

  return (
    <div className="relative md:min-h-screen max-w-screen bg-[url('/assets/backgroundPictureMobile.webp')] md:bg-[url('/assets/backgroundPicture.webp')] bg-cover bg-center">
      {/* Main content container */}
      <main className="relative z-10 flex flex-col items-center mx-auto w-full max-w-5xl text-white gap-10 p-10 px-6">
        {/* Header Section (aligned left within centered container) */}
        <div className="max-w-lg">
          <h1 className="text-5xl font-extrabold text-center mb-8">
            Contact Us
          </h1>
          <p className="text-fuchsia-200 text-xl text-center">
            Our customer support team is available to assist you. We will get
            back to you as soon as possible.
          </p>
        </div>

        {/* Grid layout: left side for contact info; right side for contact form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
          {/* Left side - Contact Information */}
          <div className="flex flex-col gap-6">
            {/* Glass Card 1 - Phone */}
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-lg p-6 flex items-center gap-4 shadow-lg">
              <FaPhoneAlt className="text-3xl text-[#FF604F]" />
              <div>
                <p className="text-lg font-semibold">Call Us</p>
                <p className="text-gray-300">+385 45 789-1520</p>
                <p className="text-gray-300">+387 65 321-050</p>
              </div>
            </div>

            {/* Glass Card 2 - Email */}
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-lg p-6 flex items-center gap-4 shadow-lg">
              <FaEnvelope className="text-3xl text-[#FF604F]" />
              <div>
                <p className="text-lg font-semibold">Email</p>
                <p className="text-gray-300">contact@fubar.com</p>
                <p className="text-gray-300">support@fubar.com</p>
              </div>
            </div>
          </div>

          <ContactForm/>

        </div>
      </main>
    </div>
  );
}
