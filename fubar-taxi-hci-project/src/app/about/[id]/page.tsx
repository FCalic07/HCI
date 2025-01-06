import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { User } from "../page";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Partner",
};

type UserParams = Promise<{ id: string }>

async function getUser(id: string): Promise<User> {
    const data = await fetch(`${process.env.BASE_API_URL}/users/${id}`);
    if (!data.ok) {
      throw new Error("Failed to fetch users");
    }
    return data.json();
};
  
export default async function PartnersPost(props: { params: UserParams }) {
    const { id } = await props.params;
    const user = await getUser(id);

    const { company, website } = user;

    if (!id) {
      notFound();
    }

    return (
    <div
        className="relative min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/backgroundPicture.jpg')" }}
    >
        {/* Overlays for styling */}
        <div className="absolute inset-0 bg-violet-950 opacity-60"></div>
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <main className="flex min-h-screen flex-col items-center p-10 z-10">
          <Link
            href="/about"
            className="inline-flex items-center text-white-600 hover:text-gray-900 transition-colors duration-200 mb-6 z-10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to all partners
          </Link>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white-900 mb-4 z-10">
            {company.name}
          </h1>
          <p className="z-10">{website}</p>
        </main>
      
    </div>
    );
}