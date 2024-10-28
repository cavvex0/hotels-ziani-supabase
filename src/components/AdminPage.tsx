"use client";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdminSchema, AdminSchemaType } from "../schema/adminSchema";
import { createUser } from "../actions/createUser";
import { EyeIcon, EyeOff, XIcon } from "lucide-react";
import { deleteUser } from "../actions/deleteUser";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import toast from "react-hot-toast";

const roles = ["admin", "receptionist"];

type Props = {
  users: any;
};
const AdminPage = ({ users }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm({
    resolver: zodResolver(AdminSchema),
    defaultValues: {
      name: "",
      password: "",
      role: "",
    },
  });

  const onSubmit = async (values: AdminSchemaType) => {
    const response = await createUser(values);

    if (!response?.success) {
      toast.error(response?.message ?? "user already exists!");
      return;
    }
  };

  const deleteUSer = async (id: string) => {
    deleteUser(id);
  };

  return (
    <div className="bg-white shadoww min-h-[600px] rounded-[25px]">
      <div className="grid grid-cols-2 place-items-center min-h-[600px] relative">
        <div className="absolute top-12 left-9 flex items-center gap-x-3">
          <h1 className="text-4xl font-realce uppercase">create</h1>
          <h1 className="text-4xl font-realce uppercase text-orange-600">or</h1>
          <h1 className="text-4xl font-realce uppercase">delete</h1>
          <h1 className="text-4xl font-realce uppercase">user</h1>
        </div>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-1 h-full w-full flex flex-col items-center justify-center p-8 gap-y-4 "
        >
          <Input
            placeholder="Name..."
            {...form.register("name")}
            className="bg-gray-300"
          />
          <div className="w-full relative">
            <Input
              placeholder="Password..."
              {...form.register("password")}
              type={showPassword ? "text" : "password"}
              className="bg-gray-300"
            />
            {showPassword ? (
              <EyeIcon
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-700"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <EyeOff
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-700"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>
          <Select onValueChange={(value) => form.setValue("role", value)}>
            <SelectTrigger className="w-full bg-gray-300">
              <SelectValue placeholder="Users" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((user: any, idx: number) => {
                return (
                  <SelectItem key={idx} value={user} className="capitalize">
                    {user}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <Button className="w-full">Add</Button>
        </form>
        <div className="flex-1 h-full w-full">
          <div className="flex justify-center flex-col h-full px-8 gap-3">
            {users?.map((user: any) => (
              <div
                key={user.id}
                className="border p-2.5 rounded flex items-center justify-between"
              >
                <h1 className="capitalize text-[15px] flex-1">
                  {user.username}
                </h1>
                <div className="flex-1">
                  <p className="text-center text-[15px]">{user.role}</p>
                </div>
                <div className="flex-1 flex justify-end">
                  <Button
                    className="size-6 "
                    size={"icon"}
                    variant={"destructive"}
                    onClick={() => deleteUSer(user.id)}
                  >
                    <XIcon />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
