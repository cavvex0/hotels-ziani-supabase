"use client";

import { useUserStore } from "@/stores/useUserStore";
import { useEffect } from "react";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const fetchUsername = useUserStore((state) => state.fetchUsername);
  const fetchRole = useUserStore((state) => state.fetchRole);
  const loading = useUserStore((state) => state.loading);

  useEffect(() => {
    fetchUsername();
    fetchRole();
  }, [fetchUsername, fetchRole]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};
