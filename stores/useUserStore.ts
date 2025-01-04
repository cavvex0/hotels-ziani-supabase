"use client";

import { create } from "zustand";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

type UserState = {
  username: string | null;
  role: string | null;
  loading: boolean;
  error: string | null;
  fetchUserData: () => Promise<void>;
  initializeAuth: () => void;
};

export const useUserStore = create<UserState>((set) => {
  const supabaseClient = createClient();

  const fetchUserData = async () => {
    set({ loading: true, error: null });
    try {
      const {
        data: { user },
        error: userError,
      } = await supabaseClient.auth.getUser();

      if (userError || !user) {
        redirect("/");
        throw new Error(userError?.message || "User not found");
      }

      const { data: roleData, error: roleError } = await supabaseClient
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (roleError) throw new Error(roleError.message);

      set({
        username: user.user_metadata?.username || null,
        role: roleData?.role || null,
        loading: false,
      });
    } catch (err) {
      set({ error: (err as Error).message, loading: false });
      console.error(err);
    }
  };

  return {
    username: null,
    role: null,
    loading: true,
    error: null,
    fetchUserData,
    initializeAuth: () => {
      supabaseClient.auth.onAuthStateChange((event) => {
        if (event === "SIGNED_IN") {
          fetchUserData();
        } else if (event === "SIGNED_OUT") {
          set({ username: null, role: null, error: null });
        }
      });
    },
  };
});
