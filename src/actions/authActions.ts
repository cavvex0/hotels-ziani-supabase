"use server";

import { createClient } from "@/utils/supabase/server";
import { encodedRedirect } from "@/utils/utils";
import { redirect } from "next/navigation";
import { AuthSchemaType } from "../schema/authScherma";

export const signInAction = async (values: AuthSchemaType) => {
  const { username, password } = values;

  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: `${username}@example.com`,
    password: password + "00",
  });

  if (error) {
    return console.error(error.message);
  }

  return redirect("/dashboard");
};

export const signUpAction = async (values: AuthSchemaType) => {
  const { username, password } = values;

  const supabase = createClient();

  if (!username || !password) {
    return { error: "Email and password are required" };
  }

  // Sign up the user only, without inserting into profiles
  const { error, data } = await supabase.auth.signUp({
    email: `${username}@example.com`,
    password: password + "00",
    options: {
      data: {
        username,
      },
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/login", error.message);
  } else {
    if (!data.user) {
      return null;
    }
    const userId = data.user.id;
    await supabase
      .from("profiles")
      .insert([{ id: userId, username: username, password: password + "00" }]);
    return encodedRedirect(
      "success",
      "/login",
      "Thanks for signing up! Please check your email for a verification link."
    );
  }
};
