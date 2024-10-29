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

  const { data: history } = await supabase
    .from("history")
    .select()
    .eq("hotel", matchedUser.data.hotel)
    .eq("reception", matchedUser.data.reception)
    .single();

  const people =
    history?.people -
    matchedUser.data.salam -
    matchedUser.data.orient -
    matchedUser.data.istanbul;

  await supabase
    .from("history")
    .update({ people })
    .eq("hotel", matchedUser.data.hotel)
    .eq("reception", matchedUser.data.reception);

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
    .update({ paidBy: username, paid: true })
    .eq("id", id)
    .select();
  revalidatePath("/dashboard");
  return {
    success: true,
  };
};

export const adminCanDelete = async (id: string) => {
  const supabase = createClient();
  await supabase.from("soins").delete().eq("id", id);
  revalidatePath("/dashboard");
};
