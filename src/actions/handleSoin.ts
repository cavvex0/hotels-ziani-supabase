"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const deleteSoin = async (id: string) => {
  const supabase = createClient();
  const { data: user } = await supabase.auth.getUser();
  const username = user.user?.user_metadata?.username;

  const matchedUser = await supabase
    .from("soins")
    .select()
    .eq("user", username)
    .eq("id", id)
    .single();
  if (!matchedUser.data) {
    return {
      success: false,
      message: "Tu n'as pas le droit de supprimer ceci!",
    };
  }

  await supabase.from("soins").delete().eq("id", id);

  revalidatePath("/dashboard");
  return {
    success: true,
  };
};
export const handleTaxi = async (id: string) => {
  const supabase = createClient();
  await supabase.from("soins").update({ taxi: true }).eq("id", id).select();
  revalidatePath("/dashboard");
};
export const handlePaye = async (id: string) => {
  const supabase = createClient();
  const { data: user } = await supabase.auth.getUser();
  const username = user.user?.user_metadata?.username;
  const { data: alreadyPaid } = await supabase
    .from("soins")
    .select("paidBy")
    .eq("id", id)
    .single();
  if (alreadyPaid?.paidBy !== "") {
    return {
      success: false,
      message: "Déjà payé!",
    };
  }

  await supabase
    .from("soins")
    .update({ paidBy: username })
    .eq("id", id)
    .select();
  revalidatePath("/dashboard");
  return {
    success: true,
  };
};
