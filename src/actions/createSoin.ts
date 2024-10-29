"use server";

import { createClient } from "@/utils/supabase/server";
import { SoinShecmaType } from "@/src/schema/soinSchema";
import { revalidatePath } from "next/cache";

export const createSoin = async (soin: SoinShecmaType) => {
  const { hotel, reception, istanbul, orient, salam } = soin;
  const supabase = createClient();

  // Insert the new soin record
  const { data: soinData, error: soinError } = await supabase.from("soins").insert(soin);
  
  if (soinError) {
    console.error(soinError.message);
    return;
  }

  // Check if the hotel and reception already exist in the history table
  const { data: historyData, error: historyError } = await supabase
    .from("history")
    .select("*")
    .eq("hotel", hotel)
    .eq("reception", reception);

  if (historyError) {
    console.error(historyError.message);
    return;
  }

  // Check if any records were found
  if (historyData && historyData.length > 0) {
    // Update the existing record (assumes historyData[0] is the correct one to update)
    const existingRecord = historyData[0];
    const { error: updateError } = await supabase
      .from("history")
      .update({
        people: existingRecord.people + (istanbul + orient + salam), // Update the people count
      })
      .eq("id", existingRecord.id); // Assuming there is an 'id' field

    if (updateError) {
      console.error(updateError.message);
      return;
    }
  } else {
    // If no record exists, insert a new one
    const { error: insertError } = await supabase.from("history").insert({
      hotel,
      reception,
      people: istanbul + orient + salam,
    });

    if (insertError) {
      console.error(insertError.message);
      return;
    }
  }

  // Revalidate the path to refresh the data
  revalidatePath("/dashboard");
  return soinData; // Return the newly created soin data
};
