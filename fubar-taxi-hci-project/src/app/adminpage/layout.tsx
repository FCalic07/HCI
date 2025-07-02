// app/adminpage/layout.tsx
'use client';

import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter, usePathname } from "next/navigation";
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
import TaxiMap from "./dashboard/page";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const pathname = usePathname();

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

  const isDashboard = pathname === "/adminpage/dashboard";

  return (
    <div className="flex min-h-screen bg-[#170A2D] text-white">
      <Sidebar>
        <SidebarItem icon={faCar} label="Dashboard" href="/adminpage/dashboard" />
        <SidebarItem icon={faMapLocationDot} label="Rides" href="/adminpage/rides" />
        <SidebarItem icon={faChartLine} label="Income" href="/adminpage/income" />
        <SidebarItem icon={faPerson} label="Employees" href="/adminpage/employees" />
      </Sidebar>

      <main className="flex-1 relative">
        <div className={`absolute inset-0 ${isDashboard ? "opacity-100 z-10" : "opacity-0 pointer-events-none"}`}>
          <TaxiMap />
        </div>

        <div className={`${isDashboard ? "hidden" : "block"}`}>
          {children}
        </div>
      </main>
    </div>
  );
}
