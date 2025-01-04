"use client";

import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect } from "react";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const fetchUser = useAuthStore((state) => state.fetchUser);
  const loading = useAuthStore((state) => state.loading);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (loading) {
    return (
      <div className="fixed inset-0 h-screen w-screen bg-prime text-white z-50 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
};
