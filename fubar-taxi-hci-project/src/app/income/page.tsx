"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidebar, { SidebarItem } from "@/components/sidebar";

import {
  faCar,
  faMapLocationDot,
  faChartLine,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";

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
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // Only render page if user is authenticated
  return (
    <div className="bg-black flex flex-row justify-between">
        
      <Sidebar>
              <SidebarItem icon={faCar} label="Taxi" href="/adminpage" />
              <SidebarItem icon={faMapLocationDot} label="Rides" href="/rideLogs" />
              <SidebarItem icon={faChartLine} label="Inocome" href="/income" />
              <SidebarItem icon={faPerson} label="Employees" href="/employees" />
            </Sidebar>
      <h1 className="text-center text-white"> income</h1>
    </div>
  );
}
