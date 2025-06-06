import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { User } from "../page";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Partner",
};

type UserParams = Promise<{ id: string }>;

async function getUser(id: string): Promise<User> {
  const data = await fetch(`${process.env.BASE_API_URL}/users/${id}`);
  if (!data.ok) {
    throw new Error("Failed to fetch users");
  }
  return data.json();
}

export default async function PartnersPost(props: { params: UserParams }) {
  const { id } = await props.params;
  const user = await getUser(id);

  const { company, website, address } = user;

  if (!id) {
    notFound();
  }

  return (
    <div className="relative md:min-h-screen max-w-screen bg-[url('/assets/backgroundPictureMobile.webp')] md:bg-[url('/assets/backgroundPicture.webp')] bg-cover bg-center">
      <main className="relative flex items-start justify-center min-h-screen p-10 z-10">
        {/* Glass Card */}
        <div className="bg-white/10 border border-white/20 backdrop-blur-md rounded-lg mt-24 p-10 max-w-4xl w-full text-center text-white flex flex-col">
          {/* Back to All Partners */}
          <Link
            href="/about"
            className="self-start mb-6 text-white text-lg font-semibold hover:underline hover:text-gray-300 flex items-center"
          >
            <ArrowLeft className="mr-2 h-6 w-6" /> Back to all partners
          </Link>

          {/* Company Name */}
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            {company.name}
          </h1>

          {/* Catchphrase */}
          <p className="text-lg italic text-gray-300 mb-6">
            &quot;{company.catchPhrase}&quot;
          </p>

          {/* Company Details */}
          <div className="space-y-4">
            <p className="text-lg">
              <span className="font-semibold text-gray-100">Website:</span>{" "}
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                {website}
              </a>
            </p>
            <p className="text-lg">
              <span className="font-semibold text-gray-100">Address:</span>{" "}
              {address.street}, {address.city} {address.zipcode}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
