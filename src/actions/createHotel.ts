"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { HotelSchemaType } from "../schema/hotelSchema";

export const createHotel = async (formData: HotelSchemaType) => {
  const { name, reception } = formData;
  const supabase = createClient();
  const { data: existingHotel, error } = await supabase
    .from("hotels")
    .select("*")
    .eq("name", name)
    .single();

  if (error && error.code !== "PGRST116") {
    throw new Error("Error fetching hotel");
  }
  if (existingHotel) {
    // Update the existing hotel's receptions array
    const updatedReceptions = [...existingHotel.receptions, reception];

    const { error: updateError } = await supabase
      .from("hotels")
      .update({ receptions: updatedReceptions })
      .eq("name", name);

    if (updateError) {
      throw new Error("Error updating receptions");
    }
  } else {
    // Create a new hotel with the provided reception
    const { error: insertError } = await supabase
      .from("hotels")
      .insert([{ name, receptions: [reception] }]);

    if (insertError) {
      throw new Error("Error creating hotel");
    }
  }

  revalidatePath("/dashboard/hotels");
};
