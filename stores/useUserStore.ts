"use client";

import { create } from "zustand";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

type UserState = {
  username: string | null;
  role: string | null;
  loading: boolean;
  error: string | null;
  fetchUsername: () => Promise<void>;
  fetchRole: () => Promise<void>;
};

export const useUserStore = create<UserState>((set) => ({
  username: null,
  role: null,
  loading: true,
  error: null,

  // Fetch username
  fetchUsername: async () => {
    set({ loading: true, error: null });
    try {
      const supabaseClient = createClient();
      const {
        data: { user },
        error,
      } = await supabaseClient.auth.getUser();

      if (error) {
        console.error("Error fetching user:", error.message);
        set({ error: error.message, loading: false });
        return;
      }

      if (!user) {
        redirect("/");
      }

      const username = user?.user_metadata?.username || null;
      set({ username, loading: false });
    } catch (err) {
      set({ error: "Failed to fetch username", loading: false });
      console.error(err);
    }
  },

  // Fetch role
  fetchRole: async () => {
    set({ loading: true, error: null });
    try {
      const supabaseClient = createClient();
      const {
        data: { user },
        error,
      } = await supabaseClient.auth.getUser();

      if (error || !user) {
        console.error("Error fetching user:", error?.message);
        set({ error: error?.message || "User not found", loading: false });
        redirect("/");
        return;
      }

      const { data: roleData, error: roleError } = await supabaseClient
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (roleError) {
        console.error("Error fetching role:", roleError.message);
        set({ error: roleError.message, loading: false });
        return;
      }

      set({ role: roleData?.role || null, loading: false });
    } catch (err) {
      set({ error: "Failed to fetch role", loading: false });
      console.error(err);
    }
  },
}));
