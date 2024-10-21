"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SoinSchema, SoinShecmaType } from "../schema/soinSchema";
import BainSelector from "./BainSelector";
import { useMutation } from "@tanstack/react-query";
import { createSoin } from "../actions/createSoin";
import { getUsername } from "@/lib/getUserClient";

const AddSoin = () => {
  const [isTaxiPaid, setIsTaxiPaid] = useState(false);
  const [user, setUser] = useState("");

  const fetchUsername = async () => {
    const name = await getUsername();
    setUser(name);
    form.setValue("user", name);
  };
  fetchUsername();
  const [bain, setBain] = useState({
    salam: 0,
    istanbul: 0,
    orient: 0,
  });
  const form = useForm<SoinShecmaType>({
    resolver: zodResolver(SoinSchema),
    defaultValues: {
      user,
      name: "",
      hotel: "",
      reception: "",
      price: 0,
      paidBy: "",
      taxi: false,
      istanbul: bain.istanbul,
      salam: bain.salam,
      orient: bain.orient,
    },
  });

  const handleBain = (name: any, operation: any) => {
    setBain((prev) => {
      return {
        ...prev,
        [name]:
          //@ts-ignore
          operation === "i" ? bain[name] + 1 : Math.max(bain[name] - 1, 0),
      };
    });
  };

  useEffect(() => {
    form.setValue("salam", bain.salam);
    form.setValue("istanbul", bain.istanbul);
    form.setValue("orient", bain.orient);
    form.setValue("taxi", isTaxiPaid);
  }, [bain, isTaxiPaid, form]);

  const { mutate } = useMutation({
    mutationKey: ["create_Soin"],
    mutationFn: createSoin,
  });

  const onSubmit = async (values: SoinShecmaType) => {
    mutate(values);
  };

  const handleTaxiPaye = () => {
    setIsTaxiPaid(!isTaxiPaid);
  };
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="bg-white px-5 lg:h-[73px] rounded-[25px] grid grid-cols-2 lg:grid-cols-7 lg:gap-4 gap-2 py-3 lg:py-0 shadoww border border-gray-300"
    >
      <div className="flex items-center justify-center ">
        <Input
          className="bg-gray-300"
          placeholder="Package..."
          {...form.register("name")}
        />
      </div>
      <div className="flex items-center justify-center ">
        <Input
          className="bg-gray-300"
          placeholder="Hotel..."
          {...form.register("hotel")}
        />
      </div>
      <div className="flex items-center justify-center ">
        <Input
          className="bg-gray-300"
          placeholder="Reception..."
          {...form.register("reception")}
        />
      </div>
      <div className="flex items-center justify-center ">
        {/* Bain */}
        <BainSelector bain={bain} handleBain={handleBain} setBain={setBain} />
      </div>
      <div className="flex items-center justify-center ">
        <Input
          className="bg-gray-300"
          placeholder="Package..."
          {...form.register("price", { valueAsNumber: true })}
        />
      </div>
      <div className="flex items-center justify-center gap-x-4 ">
        <Checkbox checked={isTaxiPaid} id="terms" onClick={handleTaxiPaye} />
        <Label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
        >
          Taxi Payé ?
        </Label>
      </div>
      <div className="flex items-center justify-center col-span-2 lg:col-span-1 ">
        <Button
          type="submit"
          className="w-full bg-green-800 hover:bg-green-900"
        >
          Ajouter
        </Button>
      </div>
    </form>
  );
};

export default AddSoin;
