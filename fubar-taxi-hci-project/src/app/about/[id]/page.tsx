import { BASE_API_URL } from "../page";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { User } from "../page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner",
};

type TrusterPartnersProps = {
    params: { id: string };
};

async function getUsers(id: string): Promise<User[]> {
    const response = await fetch(`${BASE_API_URL}/users/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    return response.json();
};
  
export default async function PartnersPost({ params }: TrusterPartnersProps) {
    const users = await getUsers(params.id);

    const { company, website } = users;
    return (
    <div
        className="relative min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/backgroundPicture.jpg')" }}
    >
        {/* Overlays for styling */}
        <div className="absolute inset-0 bg-violet-950 opacity-60"></div>
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <main className="flex min-h-screen flex-col items-center p-10 z-20">
          <Link
            href="/about/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200 mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to all partners
          </Link>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
            {company.name}
          </h1>
          <p>{website}</p>
      </main>
      
    </div>
    );
}