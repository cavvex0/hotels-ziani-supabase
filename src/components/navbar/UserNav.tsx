"use client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import GirlImg from "@/assets/user-female.png";
import BoyImg from "@/assets/user.png";
import { signOutAction } from "../../actions/signOut";
import { getRole, getUsername } from "@/lib/getUserClient";
import { useUserStore } from "@/stores/useUserStore";

type Nav = {
  label: string;
  href: string;
}[];

export default function UserNav({ navLink }: { navLink: Nav }) {
  const [open, setOpen] = useState(false);

  const { username, loading, role } = useUserStore();
  console.log(username);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       setLoading(true);
  //       const fetchedUsername = await getUsername();
  //       const fetchedRole = await getRole();
  //       setUsername(fetchedUsername);
  //       setRole(fetchedRole?.role);
  //     } catch (error) {
  //       console.error("Failed to fetch user data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUserData();
  // }, []);

  // if (loading) {
  //   return (
  //     <div className="fixed inset-0 h-screen w-screen bg-prime text-white z-50 flex items-center justify-center">
  //       Loading...
  //     </div>
  //   );
  // }

  return (
    <div className="flex gap-x-2 lg:gap-x-4 items-center">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-10 w-10 rounded-full">
            <Avatar className="h-[45px] w-[45px] lg:h-[47px] lg:w-[47px] rounded-full text-black border-2 border-orange-600">
              <AvatarImage
                src={username === "hannan" ? GirlImg.src : BoyImg.src}
              />
              <AvatarFallback>CMX</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[150px] mt-2"
          align="start"
          forceMount
        >
          <DropdownMenuLabel>
            <div className="capitalize">{username}</div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="lg:hidden">
            {navLink.map((link, i) => {
              return (
                <DropdownMenuItem
                  onClick={() => setOpen(false)}
                  className="w-full flex flex-col"
                  key={i}
                >
                  <Link href={link.href} className="w-full py-1">
                    {link.label}
                  </Link>
                </DropdownMenuItem>
              );
            })}
            <DropdownMenuSeparator />
          </div>
          <DropdownMenuItem className="w-full" asChild>
            <div>
              <Button
                onClick={() => signOutAction()}
                className="w-full h-7"
                variant="ghost"
              >
                Se déconnecter
              </Button>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex leading-4 flex-col">
        <span className="text-[14px] lg:text-[16px] capitalize">
          {username}
        </span>
        <span className="text-[9px] lg:text-[11px] tracking-wide text-gray-400 capitalize">
          {role}
        </span>
      </div>
    </div>
  );
}
