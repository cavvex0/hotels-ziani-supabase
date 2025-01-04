"use client";
import { useAuth } from "@/context/authContext";
import { redirect } from "next/navigation";

export default function Index() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="fixed inset-0 h-screen w-screen bg-prime text-white z-50 flex items-center justify-center">
        Loading...
      </div>
    );
  }
  if (!user) {
    return redirect("/login");
  }

  return redirect("/dashboard");
}
