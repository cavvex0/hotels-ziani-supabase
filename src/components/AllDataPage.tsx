"use client";

import { useState } from "react";
import { HotelSchemaType, ReceptionSchemaType } from "../schema/hotelSchema";
import { SoinShecmaType } from "../schema/soinSchema";
import AllDataHeader from "./AllDataHeader";
import { useMediaQuery } from "@/hooks/use-media-query";

type Props = {
  soins: SoinShecmaType[];
  hotels: ReceptionSchemaType[];
};

const AllDataPage = ({ hotels, soins }: Props) => {
  const [selectedHotel, setSelectedHotel] = useState("");
  const [receptionist, setReceptionist] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <div className="">
      <AllDataHeader
        role="admins"
        receptionist={receptionist}
        setReceptionist={setReceptionist}
        selectedHotel={selectedHotel}
        setSelectedHotel={setSelectedHotel}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        hotels={hotels}
        soins={soins}
      />
    </div>
  );
};

export default AllDataPage;
