"use client";

import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  HotelSchema,
  HotelSchemaType,
  ReceptionSchemaType,
} from "../schema/hotelSchema";
import { useMutation } from "@tanstack/react-query";
import { createHotel } from "../actions/createHotel";
import { HotelsComboBox } from "./HotelsComboBox";
import { useEffect, useState } from "react";

const HotelsPage = ({ hotels }: { hotels: ReceptionSchemaType[] }) => {
  const [selectedHotel, setSelectedHotel] = useState("");
  const [receptionist, setReceptionist] = useState("");

  const form = useForm({
    resolver: zodResolver(HotelSchema),
    defaultValues: {
      name: "",
      receptions: "",
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["create_hotel"],
    mutationFn: createHotel,
  });
  const { mutate: mutate2 } = useMutation({
    mutationKey: ["create_reception"],
    mutationFn: createHotel,
  });

  const onSubmit = async (values: HotelSchemaType) => {
    mutate(values);
  };
  const onSubmit2 = async (values: HotelSchemaType) => {
    mutate2(values);
  };
  useEffect(() => {
    if (selectedHotel) {
      form.setValue("name", selectedHotel);
    }
  }, [selectedHotel]);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 lg:gap-20 pb-14  ">
      <div className="bg-white shadoww rounded-[35px] lg:h-[500px] p-9 border border-gray-300">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center h-full gap-4"
        >
          <h1 className="font-realce text-2xl lg:text-4xl text-left w-full mb-8 uppercase">
            Créer un nouvel <span className="text-orange-500">Hôtel</span>
          </h1>
          <Input
            className="bg-gray-300"
            placeholder="Hotels..."
            {...form.register("name")}
          />
          <Input
            className="bg-gray-300"
            placeholder="Receptionist..."
            {...form.register("receptions")}
          />
          <Button type="submit" className="w-full">
            Ajouter
          </Button>
        </form>
      </div>
      <div className="bg-white shadoww rounded-[35px] lg:h-[500px] p-9  border border-gray-300">
        <form
          onSubmit={form.handleSubmit(onSubmit2)}
          className="flex flex-col items-center justify-center h-full gap-4"
        >
          <h1 className="font-realce text-2xl lg:text-4xl text-left w-full mb-8 uppercase">
            Créer un nouvel{" "}
            <span className="text-orange-500">Réceptionniste</span>
          </h1>
          <HotelsComboBox
            setReceptionist={setReceptionist}
            hotelsData={hotels}
            selectedHotel={selectedHotel}
            setSelectedHotel={setSelectedHotel}
            type="addHotel"
          />
          <Input
            className="bg-gray-300"
            placeholder="Receptionist..."
            {...form.register("receptions")}
          />
          <Button type="submit" className="w-full">
            Ajouter
          </Button>
        </form>
      </div>
    </div>
  );
};

export default HotelsPage;
