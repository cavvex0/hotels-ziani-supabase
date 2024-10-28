"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const deleteUser = async (id: string) => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.admin.deleteUser(id);
  if (error) {
    console.error(error);
  }
  revalidatePath("/dashboard/admin");
};
