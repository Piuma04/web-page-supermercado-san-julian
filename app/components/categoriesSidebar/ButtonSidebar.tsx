'use client'

import { useSidebar } from "@/components/ui/sidebar";
import Link from "next/link";
import React from "react";

interface ButtonSidebarProps {
  categoryId: number;
  categoryName: string;

}




export default function ButtonSidebar({
  categoryId,
  categoryName,
}: ButtonSidebarProps) {

    const {toggleSidebar} = useSidebar()

  return (
    <Link 
      href={`/categories/${categoryId}`}
      className="block w-full"
      onClick={() => {
        // Toggle sidebar after the navigation starts
        toggleSidebar();
      }}
    >
      <div className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors duration-200 focus:outline-none">
        {categoryName}
      </div>
    </Link>
  );
}