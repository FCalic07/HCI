import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Partners",
};

const BASE_API_URL = "https://jsonplaceholder.typicode.com";

type User = {
  id: number;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  website: string;
};

async function getUsers(): Promise<User[]> {
  const response = await fetch(`${BASE_API_URL}/users`);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
}

export default async function AboutPage() {
  const users = await getUsers();

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/backgroundPicture.jpg')" }}
    >
      {/* Overlays for styling */}
      <div className="absolute inset-0 bg-violet-950 opacity-60"></div>
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <main className="relative flex flex-col items-center p-10 z-10">
        {/* Title */}
        <h1 className="text-white text-6xl font-extrabold tracking-tight mb-8">
          Trusted Partners
        </h1>
        <p className="text-white text-xl mb-10 text-center max-w-4xl">
          We collaborate with some of the most innovative companies in the
          industry. Below is a list of our trusted partners.
        </p>

        {/* Grid of company cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full max-w-5xl">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white text-gray-900 shadow-md rounded-lg p-4 text-center hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold mb-2">{user.company.name}</h3>
              <a
                href={`http://${user.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline text-sm"
              >
                {user.website}
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
