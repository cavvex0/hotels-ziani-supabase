"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signInAction, signUpAction } from "../actions/authActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthSchema, AuthSchemaType } from "../schema/authScherma";
import { useMutation } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";

const LoginPage = ({ username }: { username: any }) => {
  const [error, setError] = useState("");

  const form = useForm({
    resolver: zodResolver(AuthSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["sign_UP"],
    mutationFn: signInAction,
    onSuccess: () => {
      form.reset();
    },
  });

  const onSubmit = async (values: AuthSchemaType) => {
    setError("");
    const supabase = createClient();
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("username", values.username)
      .single();
    if (error) {
      console.error(error.message);
      return;
    }
    if (data.password !== values.password + "00") {
      setError("Password is incorrect");
    }
    if (!values.password) {
      setError("Password is required");
    }
    mutate(values);
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex items-center justify-center h-full"
    >
      <Card className="w-[400px] h-[380px] flex justify-center flex-col gap-y-4">
        <CardHeader>
          <CardTitle className="text-center">Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select onValueChange={(value) => form.setValue("username", value)}>
            <SelectTrigger className="w-full bg-gray-300">
              <SelectValue placeholder="Users" />
            </SelectTrigger>
            <SelectContent>
              {username.map((user: any, idx: number) => {
                return (
                  <SelectItem
                    key={idx}
                    value={user.username}
                    className="capitalize"
                  >
                    {user.username}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          {/* <Input
            className="bg-gray-300"
            placeholder="Username"
            type="text"
            {...form.register("username")}
          /> */}
          <Input
            className="bg-gray-300"
            placeholder="Password"
            type="password"
            {...form.register("password")}
          />
        </CardContent>
        <CardFooter className="flex flex-col gap-y-2">
          <Button disabled={isPending} type="submit">
            {isPending ? "Proccessing..." : "Login"}
          </Button>
          {error && (
            <span className="text-sm text-red-500 font-semibold">{error}</span>
          )}
        </CardFooter>
      </Card>
    </form>
  );
};

export default LoginPage;
