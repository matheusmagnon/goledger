import Link from "next/link";

interface NavLinkProps {
  text: string;
  href: string;
}

export function NavLink({ text, href }: NavLinkProps) {
  return (
    <Link href={href} className="lg:text-2xl text-xl font-bold cursor-pointer relative inline-block group">
      <span className="relative z-10 group-hover:text-slate-950">{text}</span>
      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-customBg opacity-40 
         scale-x-0 group-hover:scale-x-100 transition-transform duration-300 transform translate-y-2"> 
      </span>
    </Link>
  );
}
