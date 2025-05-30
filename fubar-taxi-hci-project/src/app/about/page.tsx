import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
};

export type User = {
  id: number;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  website: string;
  address: {
    street: string;
    city: string;
    zipcode: string;
  };
};

async function getUsers(): Promise<User[]> {
  const response = await fetch(`${process.env.BASE_API_URL}/users`);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
}

export default async function AboutPage() {
  const users = await getUsers();

  return (
     <div
      className="relative md:min-h-screen w-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/backgroundPicture.webp')" }}
    >
      {/* Overlays for styling */}
      <div className="absolute inset-0 bg-violet-950 opacity-60"></div>
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <main className="relative flex flex-col items-center p-10 z-10">
        {/* Title */}
        <h1 className="text-white text-5xl font-extrabold text-center tracking-tight mb-8">
          Trusted Partners
        </h1>
        <p className="text-fuchsia-200 text-xl mb-10 text-center max-w-4xl">
          We collaborate with some of the most innovative companies in the
          industry. Below is a list of our trusted partners.
        </p>

        {/* Grid of company cards */}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full max-w-5xl">
          {users.map((user) => (
            <Link
              href={`/about/${user.id}`}
              key={user.id}
              className="relative bg-white/10 border border-white/20 backdrop-blur-md shadow-lg rounded-lg p-6 flex flex-col justify-between hover:bg-opacity-30 transition"
            >
              {/* Company Name */}
              <h3 className="text-white text-xl font-bold mb-4">{user.company.name}</h3>

              {/* Find Out More Link */}
              <div className="mt-auto">
                <p
                  className="text-blue-300 hover:text-blue-400 text-sm"
                >
                  Find out more
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

