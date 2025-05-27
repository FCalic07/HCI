import React, { ReactNode } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-common-types";

interface SidebarProps {
  children?: ReactNode;
}

interface SidebarItemProps {
  icon: IconDefinition;
  label: string;
  href: string;
}

/**
 * SidebarItem renders a single navigation link with an icon.
 */
export function SidebarItem({ icon, label, href }: SidebarItemProps) {
  return (
    <Link href={href}>
      <div className="flex items-center text-white px-4 py-3 hover:bg-gray-700 transition-colors">
        <FontAwesomeIcon icon={icon} className="mr-3 w-5 h-5" />
        <span className="font-medium">{label}</span>
      </div>
    </Link>
  );
}


export default function Sidebar({ children }: SidebarProps) {
  return (
    /*Desktop */
    <div className="hidden w-48 h-screen bg-[#170A2D] text-white md:flex flex-col">
      <div className="px-4 py-4 text-ml text-left font-semibold">Admin Dashboard</div>
      <nav className="flex- 1 overflow-y-auto">{children}</nav>
    </div>
  );
}
