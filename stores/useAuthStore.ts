"use client";

import { create } from "zustand";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

type AuthState = {
  user: User | null;
  loading: boolean;
  fetchUser: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  fetchUser: async () => {
    const supabase = createClient();
    const {
      data: { user: fetchedUser },
    } = await supabase.auth.getUser();

    set({ user: fetchedUser, loading: false });
  },
}));
