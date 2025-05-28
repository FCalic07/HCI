import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-common-types";

interface SidebarItemProps {
  icon: IconDefinition;
  label: string;
  href: string;
}

export function SidebarItem({ icon, label, href }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className="
        flex items-center
        px-4 py-3
        text-white hover:bg-gray-700
        transition-colors
      "
    >
      <FontAwesomeIcon
        icon={icon}
        className="w-5 h-5 transition-all duration-300 ml-0 group-hover:ml-0 "
      />
      <span
        className="
          ml-0                  /* no margin when collapsed */
          group-hover:ml-3      /* 0.75rem when expanded */
          font-medium
          opacity-0
          group-hover:opacity-100
          transition-all duration-300 delay-100
          whitespace-nowrap
        "
      >
        {label}
      </span>
    </Link>
  );
}
