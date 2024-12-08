'use client';

import Link from "next/link";
import { usePathname } from "next/navigation"; 

interface NavLinkProps {
  text: string;
  href: string;
}

export function NavLink({ text, href }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} passHref className={`relative px-3 py-2 font-semibold rounded-lg transition-colors duration-300 group
      ${isActive ? "text-white bg-customBg" : "text-slate-700 hover:text-white hover:bg-customBg"}`}>
        <span>{text}</span>

    </Link>
  );
}
