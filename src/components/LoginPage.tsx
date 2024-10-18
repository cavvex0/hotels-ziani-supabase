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

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  return (
    <form
      //   onSubmit={handleSubmit}
      className="flex items-center justify-center h-full"
    >
      <Card className="w-[400px] h-[380px] flex justify-center flex-col gap-y-4">
        <CardHeader>
          <CardTitle className="text-center">Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select>
            <SelectTrigger className="w-full bg-gray-300">
              <SelectValue placeholder="Users" />
            </SelectTrigger>
            <SelectContent>
              {/* {Users.map((user) => {
                return (
                  <SelectItem
                    key={user.id}
                    value={user.name}
                    className="capitalize"
                  >
                    {user.name}
                  </SelectItem>
                );
              })} */}
            </SelectContent>
          </Select>
          <Input
            className="bg-gray-300"
            placeholder="Password"
            name="password"
            type="password"
            // onChange={(e) => setPassword(e.target.value.toLocaleLowerCase())}
          />
        </CardContent>
        <CardFooter className="flex flex-col gap-y-2">
          <Button type="submit" className="w-full">
            <svg
              className={`mr-3 h-5 w-5 animate-spin text-white ${
                isLoading ? "inline-block" : "hidden"
              } `}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {isLoading ? "Proccessing..." : "Login"}
          </Button>

          <Button>sign UP</Button>
          {error && (
            <span className="text-sm text-red-500 font-semibold">{error}</span>
          )}
        </CardFooter>
      </Card>
    </form>
  );
};

export default LoginPage;
