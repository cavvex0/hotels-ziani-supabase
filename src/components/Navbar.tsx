"use client";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserNav from "./UserNav";
import { getRole } from "@/lib/getUserClient";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [role, setRole] = useState("");
  const path = usePathname();
  const getUserRole = async () => {
    const role = await getRole();
    setRole(role?.role);
  };
  useEffect(() => {
    getUserRole();
  }, [role]);

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
  if (role !== "admin") {
    navLink.pop();
  }
  return (
    <div className="bg-prime h-[6rem]">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-full text-white px-6 xl:p-0 w-full ">
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
        <UserNav navLink={navLink} />
      </div>
    </div>
  );
};

export default Navbar;
