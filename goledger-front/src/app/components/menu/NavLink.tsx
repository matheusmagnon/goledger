'use client';

import Link from "next/link";
import { usePathname } from "next/navigation"; // Usando usePathname do Next.js 13

interface NavLinkProps {
  text: string;
  href: string;
}

export function NavLink({ text, href }: NavLinkProps) {
  const pathname = usePathname(); 
  const isActive = pathname === href;

  return (
    <Link href={href} passHref className="lg:text2xl text-xl font-bold cursor-pointer relative inline-block group p-1">
      <span 
        className={`relative z-10 ${isActive ? "text-slate-950 border-2 border-customBg p-1 rounded-lg" : "text-customBg"} `}
      >
        {text}
      </span>
      <span 
        className={`absolute inset-0 border-2 border-transparent transition-all duration-300 transform p-2
          ${isActive ? "border-customBg" : "group-hover:border-customBg"} 
          rounded-lg`} 
      />
    </Link>
  );
}
