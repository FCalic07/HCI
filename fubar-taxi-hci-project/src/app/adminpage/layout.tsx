// app/adminpage/layout.tsx
'use client';

import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter, usePathname } from "next/navigation";  // ← pull in usePathname
import { useEffect } from "react";
import { auth } from "@/app/firebase/config";
import Sidebar from "@/components/Sidebar";
import { SidebarItem } from "@/components/SidebarItem";
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
  const pathname = usePathname();              // ← current URL
  console.log(pathname);
  

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
        <SidebarItem
          icon={faCar}
          label="Dashboard"
          href="/adminpage/dashboard"
        />
        <SidebarItem
          icon={faMapLocationDot}
          label="Rides"
          href="/adminpage/rides"
        />
        <SidebarItem
          icon={faChartLine}
          label="Income"
          href="/adminpage/income"
        />
        <SidebarItem
          icon={faPerson}
          label="Employees"
          href="/adminpage/employees"
        />
      </Sidebar>

      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
