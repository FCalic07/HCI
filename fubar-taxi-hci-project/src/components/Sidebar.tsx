import React, { ReactNode } from "react";

interface SidebarProps {
  children?: ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  return (
    <aside
      className="
        hidden md:flex flex-col
        bg-[#170A2D] text-white
        h-screen
        w-16 hover:w-48                   /* from 4rem → 12rem on hover */
        transition-all duration-300 ease-in-out
        overflow-hidden                  /* clip label when collapsed */
        group                             /* enables group-hover on descendants */
        
      "
    >
      <nav className="flex-1 overflow-y-auto">{children}</nav>
    </aside>
  );
}
