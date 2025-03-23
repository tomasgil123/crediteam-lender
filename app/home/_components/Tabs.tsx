"use client";

import { type FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface TabsProps {
  tabs: {
    href: string;
    label: string;
  }[];
}

export const Tabs: FC<TabsProps> = ({ tabs }) => {
  const pathname = usePathname();

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-center space-x-8 min-w-max px-4 pt-10">
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`px-1 py-2 text-lg transition-colors duration-200 whitespace-nowrap
                ${
                  (tab.href === "/home" && pathname === "/home") ||
                  (tab.href === "/home/my-loans" &&
                    pathname === "/home/my-loans")
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </div>
  );
};
