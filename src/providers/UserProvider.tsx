"use client";

import { useUserStore } from "@/stores/useUserStore";
import { useEffect } from "react";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const initializeAuth = useUserStore((state) => state.initializeAuth);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return <>{children}</>;
};
