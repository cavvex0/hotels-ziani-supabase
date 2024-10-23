"use client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getRole, getUsername } from "@/lib/getUserClient";
import GirlImg from "@/assets/user-female.png";
import BoyImg from "@/assets/user.png";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { signOutAction } from "../actions/signOut";
import { set } from "date-fns";

type Nav = {
  label: string;
  href: string;
}[];

export default function UserNav({ navLink }: { navLink: Nav }) {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [open, setOpen] = useState(false);
  const [isReady, setIsReady] = useState(true);
  const supabase = createClient();
  const router = useRouter();

  const fetchUsername = async () => {
    const name = await getUsername();
    const role = await getRole();
    setUsername(name);
    setRole(role?.role);
  };
  useEffect(() => {
    fetchUsername();
    if (username) setIsReady(false);
  }, [username]);

  if (isReady) {
    return (
      <div className="absolute inset-0 h-screen w-screen bg-prime text-white z-50 flex items-center justify-center">
        Loading...
      </div>
    );
  }

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
