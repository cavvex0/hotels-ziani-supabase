"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const deleteSoin = async (id: string) => {
  const supabase = createClient();
  await supabase.from("soins").delete().eq("id", id);

  revalidatePath("/dashboard");
};
export const handleTaxi = async (id: string) => {
  const supabase = createClient();
  await supabase.from("soins").update({ taxi: true }).eq("id", id).select();
  revalidatePath("/dashboard");
};
export const handlePaye = async (id: string) => {
  const supabase = createClient();
  const { data: user } = await supabase.auth.getUser();
  await supabase
    .from("soins")
    .update({ paidBy: user.user?.user_metadata?.username })
    .eq("id", id)
    .select();
  revalidatePath("/dashboard");
};
