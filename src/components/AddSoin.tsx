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
import { HotelsComboBox } from "./HotelsComboBox";
import { ReceptionSchemaType } from "../schema/hotelSchema";
import { ReceptionsComboBox } from "./ReceptionsComboBox";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type Props = {
  hotelsData: ReceptionSchemaType[];
};

const AddSoin = ({ hotelsData }: Props) => {
  const [selectedHotel, setSelectedHotel] = useState("");
  const [receptionist, setReceptionist] = useState("");
  const [isTaxiPaid, setIsTaxiPaid] = useState(false);
  const [price, setPrice] = useState<number>(0);
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
    form.setValue("price", price);
  }, [bain, isTaxiPaid, form, price]);

  const { mutate } = useMutation({
    mutationKey: ["create_Soin"],
    mutationFn: createSoin,

    onSuccess: () => {
      setBain({
        salam: 0,
        istanbul: 0,
        orient: 0,
      });
      setIsTaxiPaid(false);
    },
  });

  const handlePriceChange = (e: any) => {
    if (e) {
      setPrice(Number(e));
    }
  };

  const onSubmit = async (values: SoinShecmaType) => {
    if (!values.name) {
      toast.error("Veuillez entrer le nom du soin");
      return;
    } else if (!values.hotel) {
      toast.error("Veuillez sélectionner un hôtel");
      return;
    } else if (!values.reception) {
      toast.error("Veuillez sélectionner une réception");
      return;
    }
    if (
      bain.istanbul * 50 + bain.orient * 50 + bain.salam * 50 !== price &&
      price !== 0
    ) {
      toast.error("Appelle Adam pour expliquer l'erreur!");
      return;
    }
    mutate(values);
    toast.success("Soin ajouté avec succès");
  };

  const handleTaxiPaye = () => {
    setIsTaxiPaid(!isTaxiPaid);
  };
  useEffect(() => {
    form.setValue("hotel", selectedHotel);
    form.setValue("reception", receptionist);
  }, [form, selectedHotel, receptionist]);
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
        <HotelsComboBox
          type="add"
          hotelsData={hotelsData}
          selectedHotel={selectedHotel}
          setSelectedHotel={setSelectedHotel}
          setReceptionist={setReceptionist}
        />
      </div>
      <div className="flex items-center justify-center ">
        <ReceptionsComboBox
          type="add"
          selectedHotel={selectedHotel}
          hotelsData={hotelsData}
          receptionist={receptionist}
          setReceptionist={setReceptionist}
        />
      </div>
      <div className="flex items-center justify-center ">
        {/* Bain */}
        <BainSelector bain={bain} handleBain={handleBain} setBain={setBain} />
      </div>
      <div className="flex items-center justify-center ">
        {/* Price */}
        <Select onValueChange={handlePriceChange}>
          <SelectTrigger className="w-full bg-gray-300 text-gray-500">
            <SelectValue placeholder="Prix..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">0 DH</SelectItem>
            <SelectItem value="50">50 DH</SelectItem>
            <SelectItem value="100">100 DH</SelectItem>
            <SelectItem value="150">150 DH</SelectItem>
            <SelectItem value="200">200 DH</SelectItem>
            <SelectItem value="250">250 DH</SelectItem>
            <SelectItem value="300">300 DH</SelectItem>
            <SelectItem value="350">350 DH</SelectItem>
            <SelectItem value="400">400 DH</SelectItem>
            <SelectItem value="450">450 DH</SelectItem>
            <SelectItem value="500">500 DH</SelectItem>
            <SelectItem value="550">550 DH</SelectItem>
            <SelectItem value="600">600 DH</SelectItem>
          </SelectContent>
        </Select>
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
