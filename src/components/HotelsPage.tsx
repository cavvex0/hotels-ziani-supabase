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
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const HotelsPage = ({ hotels }: { hotels: ReceptionSchemaType[] }) => {
  const [selectedHotel, setSelectedHotel] = useState("");
  const [receptionist, setReceptionist] = useState("");
  const router = useRouter();

  const formHotel = useForm({
    resolver: zodResolver(HotelSchema),
    defaultValues: {
      name: "",
      receptions: "",
    },
  });

  const formReceptionist = useForm({
    resolver: zodResolver(HotelSchema),
    defaultValues: {
      name: "",
      receptions: "",
    },
  });

  const { mutate: mutateHotel } = useMutation({
    mutationKey: ["create_hotel"],
    mutationFn: createHotel,
    onSuccess: () => {
      formHotel.reset();
      setSelectedHotel("");
      router.push("/dashboard");
    },
  });

  const { mutate: mutateReceptionist } = useMutation({
    mutationKey: ["create_reception"],
    mutationFn: createHotel,
    onSuccess: () => {
      formReceptionist.reset();
      setSelectedHotel("");
      router.push("/dashboard");
    },
  });

  const onSubmitHotel = async (values: HotelSchemaType) => {
    if (!values.name || !values.receptions) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }
    mutateHotel(values);
    toast.success("Ajouté avec succès");
  };

  const onSubmitReceptionist = async (values: HotelSchemaType) => {
    if (!selectedHotel || !values.receptions) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }
    const receptionistData = { ...values, name: selectedHotel }; // include the selected hotel with receptionist data
    mutateReceptionist(receptionistData);
    toast.success("Ajouté avec succès");
  };

  useEffect(() => {
    if (selectedHotel) {
      formReceptionist.setValue("receptions", receptionist);
    }
  }, [selectedHotel, receptionist, formReceptionist]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 lg:gap-20 w-full">
      <div className="bg-white shadow rounded-[35px] lg:h-[500px] p-9 border border-gray-300">
        <form
          onSubmit={formHotel.handleSubmit(onSubmitHotel)}
          className="flex flex-col items-center justify-center h-full gap-4"
        >
          <h1 className="font-realce text-2xl lg:text-4xl text-left w-full mb-8 uppercase">
            Créer un nouvel <span className="text-orange-500">Hôtel</span>
          </h1>
          <Input
            className="bg-gray-300"
            placeholder="Hotels..."
            {...formHotel.register("name")}
          />
          <Input
            className="bg-gray-300"
            placeholder="Receptionist..."
            {...formHotel.register("receptions")}
          />
          <Button type="submit" className="w-full">
            Ajouter
          </Button>
        </form>
      </div>

      <div className="bg-white shadow rounded-[35px] lg:h-[500px] p-9 border border-gray-300">
        <form
          onSubmit={formReceptionist.handleSubmit(onSubmitReceptionist)}
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
            {...formReceptionist.register("receptions")}
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
