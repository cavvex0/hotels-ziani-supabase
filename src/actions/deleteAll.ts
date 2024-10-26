"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const deleteNonPaye = async () => {
  const supabase = createClient();

  await supabase.from("soins").delete().eq("hotel", "Non hotel");

  revalidatePath("/dashboard");
};
export const deleteAllPaye = async () => {
  const supabase = createClient();

  await supabase.from("soins").delete().eq("paid", true);

  revalidatePath("/dashboard");
};
