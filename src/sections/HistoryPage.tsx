"use client";

import { HistoryType } from "../schema/historySchema";
import ComboHistoryHotels from "../components/comboHistory/ComboHistoryHotels";
import ComboHistoryRecep from "../components/comboHistory/ComboHistoryRecep";
import { ReceptionSchemaType } from "../schema/hotelSchema";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { format } from "date-fns";

type Props = {
  history: HistoryType[];
  hotels: ReceptionSchemaType[];
};
const HistoryPage = ({ history, hotels }: Props) => {
  const [selectedHotel, setSelectedHotel] = useState("");
  const [receptionist, setReceptionist] = useState("");
  const [showFilteredData, setShowFilteredData] = useState(false); // State to manage visibility of filtered data

  // filter history based on selected hotel and receptionist
  const filteredHistory = history.filter((row) => {
    return (
      (!selectedHotel || row.hotel === selectedHotel) &&
      (!receptionist || row.reception === receptionist)
    );
  });

  console.log(filteredHistory);

  const handleSubmit = () => {
    if (!selectedHotel || !receptionist) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }
    setShowFilteredData(true); // Show filtered data when button is clicked
  };
  return (
    <div className="bg-white shadoww rounded-[37px] h-[600px] mb-9 overflow-hidden">
      <div className="p-5 border-b font-realce text-3xl">Histoire</div>
      <div className="flex h-full items-center justify-between">
        <div className="flex-1 h-full border-r p-8 flex flex-col gap-y-4">
          <ComboHistoryHotels
            hotelsData={hotels}
            selectedHotel={selectedHotel}
            setSelectedHotel={setSelectedHotel}
            setReceptionist={setReceptionist}
            setShowFilteredData={setShowFilteredData}
          />
          <ComboHistoryRecep
            hotelsData={hotels}
            receptionist={receptionist}
            setReceptionist={setReceptionist}
            selectedHotel={selectedHotel}
            setShowFilteredData={setShowFilteredData}
          />
          <Button onClick={handleSubmit}>Filter</Button>
        </div>
        <div className="flex-1 h-full p-4">
          {
            showFilteredData && filteredHistory.length > 0
              ? filteredHistory.map((row) => (
                  <div
                    key={row.id}
                    className="flex flex-col gap-3 font-realce text-2xl"
                  >
                    <div>
                      Hotel:
                      <span className="ml-3 text-orange-600">{row.hotel}</span>
                    </div>
                    <div>
                      Reception:
                      <span className="ml-3 text-orange-600">
                        {row.reception}
                      </span>
                    </div>
                    <div>
                    Commencez à travailler avec nous sur :
                      <span className="ml-3 text-orange-600">
                        {format(row.created_at, "dd/MM/yyyy")}
                      </span>
                    </div>
                    <div>
                      Personnes:
                      <span className="ml-3 text-orange-600">{row.people}</span>
                    </div>
                  </div>
                ))
              : showFilteredData && (
                  <div className="font-realce text-2xl">
                    Aucun résultat trouvé !
                  </div>
                ) // Message when no results are found
          }
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
