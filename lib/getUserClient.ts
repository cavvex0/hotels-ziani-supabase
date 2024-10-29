"use client";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

export const getUsername = async () => {
  const supabaseClient = createClient();
  const {
    data: { user },
    error,
  } = await supabaseClient.auth.getUser();

  if (error) {
    console.error("Error fetching user:", error.message);
    return null;
  }

  if (!user) {
    return redirect("/");
  }

  return user?.user_metadata?.username || redirect("/");
};
export const getRole = async () => {
  const supabaseClient = createClient();
  const {
    data: { user },
    error,
  } = await supabaseClient.auth.getUser();
  const { data: role, error: roleError } = await supabaseClient
    .from("profiles")
    .select("role")
    .eq("id", user?.id)
    .single();

  if (error || roleError) {
    console.error("Error fetching user:");
    return null;
  }

  return role || redirect("/");
};
