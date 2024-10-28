"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { AdminSchemaType } from "../schema/adminSchema";

export const createUser = async (values: AdminSchemaType) => {
  const { name, password, role } = values;

  const supabase = createClient();

  if (!name || !password) {
    return { error: "Email and password are required" };
  }

  const { data: existingUser } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", name)
    .single();

  if (existingUser) {
    return {
      success: false,
      message: "user already exists!",
    };
  }

  // Sign up the user only, without logging in
  const { error, data } = await supabase.auth.signUp({
    email: `${name}@example.com`,
    password: password + "00",
    options: {
      data: {
        username: name,
      },
    },
  });

  if (error) {
    console.error("Error signing up:", error.message);
    return { error: error.message };
  } else if (data.user) {
    const userId = data.user.id;

    // Insert user profile into the "profiles" table
    const { error: profileError } = await supabase
      .from("profiles")
      .insert([
        { id: userId, username: name, password: password + "00", role },
      ]);

    if (profileError) {
      console.error("Error inserting profile:", profileError.message);
      return { error: profileError.message };
    }

    revalidatePath("/dashboard/admin");

    // Return success message only
    return {
      success: true,
      message:
        "User created successfully. Please verify email before logging in.",
    };
  }
};
