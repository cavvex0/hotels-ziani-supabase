"use client";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserNav from "./UserNav";

const Navbar = () => {
  const path = usePathname();
  const navLink = [
    {
      label: "Tableau de bord",
      href: "/dashboard",
    },
    {
      label: "Toutes les données",
      href: "/dashboard/all-data",
    },
    {
      label: "Ajouter un hôtel",
      href: "/dashboard/hotels",
    },
    {
      label: "Admin",
      href: "/dashboard/admin",
    },
  ];
  
  return (
    <div className="bg-prime h-[6rem]">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-full text-white px-6 lg:p-0">
        <Link href={"/"} className="font-realce text-4xl ">
          <span className="text-orange-600">Z</span>IANI
        </Link>
        <div className="hidden lg:flex gap-x-9 text-[17px]">
          {navLink.map((link, idx) => {
            return (
              <Link
                href={link.href}
                key={idx}
                className={cn(
                  path === link.href &&
                    "underline underline-offset-8 decoration-2 decoration-orange-500"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
        <div><UserNav navLink={navLink} /></div>
      </div>
    </div>
  );
};

export default Navbar;
