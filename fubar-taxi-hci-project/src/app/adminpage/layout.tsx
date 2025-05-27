// app/adminpage/layout.tsx
'use client';

import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { auth } from "@/app/firebase/config";
import Sidebar, { SidebarItem } from "@/components/sidebar";
import {
  faCar,
  faMapLocationDot,
  faChartLine,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading || (!loading && !user)) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar>
        <SidebarItem icon={faCar} label="Taxi" href="/adminpage/dashboard" />
        <SidebarItem icon={faMapLocationDot} label="Rides" href="/adminpage/rides" />
        <SidebarItem icon={faChartLine} label="Income" href="/adminpage/income" />
        <SidebarItem icon={faPerson} label="Employees" href="/adminpage/employees" />
      </Sidebar>

      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
