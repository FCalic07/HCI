"use client";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminPage() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading || (!loading && !user)) {
    // Show nothing or a spinner while loading or redirecting
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // Only render page if user is authenticated
  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/assets/backgroundPicture.jpg')" }}>
      <main className="flex min-h-screen flex-col items-center p-10 z-10">
        <h1 className="text-white text-6xl font-extrabold tracking-tight z-10">
          Admin Page
        </h1>
        <button
          onClick={() => signOut(auth)}
          className="z-10 mt-6 bg-red-500 hover:bg-red-700 text-white text-2xl font-semibold py-4 px-8 rounded"
        >
          <p>Log out</p>
        </button>
        <div className="absolute inset-0 bg-violet-950 opacity-60"></div>
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </main>
    </div>
  );
}
