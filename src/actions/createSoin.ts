"use server";

import { createClient } from "@/utils/supabase/server";
import { SoinShecmaType } from "@/src/schema/soinSchema";
import { revalidatePath } from "next/cache";

export const createSoin = async (soin: SoinShecmaType) => {
  const supabase = createClient();

  const { data, error } = await supabase.from("soin").insert(soin);
  console.log('FormData', soin)
  if (error) {
    console.error(error.message);
    return;
  }
  revalidatePath("/dashboard");
  return data;
};

