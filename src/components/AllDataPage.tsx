"use client";

import { useState } from "react";
import { ReceptionSchemaType } from "../schema/hotelSchema";
import { DashSoinShecmaType } from "../schema/soinSchema";
import AllDataHeader from "./AllDataHeader";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Button } from "./ui/button";
import AllDataTable from "./AllDataTable";
import MobileAllData from "./MobileAllData";

type Props = {
  soins: DashSoinShecmaType[];
  hotels: ReceptionSchemaType[];
  role: string;
};

const AllDataPage = ({ hotels, soins, role }: Props) => {
  const [selectedHotel, setSelectedHotel] = useState("");
  const [receptionist, setReceptionist] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [showpaidCheck, setShowpaidCheck] = useState(false);

  const filteredRows = soins.filter((row) => {
    const isDateMatch =
      !selectedDate ||
      format(new Date(row.created_at), "dd/MM/yyyy") ===
        format(new Date(selectedDate), "dd/MM/yyyy");

    const isHotelMatch =
      (!selectedHotel && row.hotel !== "Emirates") ||
      (selectedHotel && row.hotel === selectedHotel);

    const isReceptionistMatch = !receptionist || row.reception === receptionist;
    const isPaidMatch = !showpaidCheck || row.paidBy;

    return isDateMatch && isHotelMatch && isReceptionistMatch && isPaidMatch;
  });

  const totalPayé = filteredRows
    .filter((row) => row.paidBy)
    .reduce((acc, curr) => acc + curr.price, 0);
  const totalNonPayé = filteredRows
    .filter((row) => !row.paidBy)
    .reduce((acc, curr) => acc + curr.price, 0);

  const calcSalam = filteredRows
    .filter((row) => row.price)
    .map((soin) => soin.salam)
    .reduce((acc, curr) => acc + curr * 50, 0);
  const calcIstanbul = filteredRows
    .filter((row) => row.price)
    .map((soin) => soin.istanbul)
    .reduce((acc, curr) => acc + curr * 50, 0);
  const calcOrient = filteredRows
    .filter((row) => row.price)
    .map((soin) => soin.orient)
    .reduce((acc, curr) => acc + curr * 50, 0);

  return (
    <div className="flex flex-col gap-y-4">
      <div>
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

      {isDesktop ? (
        <div className="py-9 hidden lg:block">
          <div
            className={cn(
              "bg-white min-h-[500px] rounded-[37px] shadoww border border-gray-300 relative pb-[4rem]"
            )}
          >
            <div
              className={cn(
                "grid border-b h-14 px-4 text-[15px]",
                role === "admin" ? "grid-cols-12" : "grid-cols-11"
              )}
            >
              <div className="flex items-center justify-center ">@</div>
              <div className="flex items-center justify-center ">Soin</div>
              <div className="flex items-center justify-center">Hotel</div>
              <div className="flex items-center justify-center">Reception</div>
              <div className="flex items-center justify-between px-2">
                <span>SAL</span>
                <span>IST</span>
                <span>ORI</span>
              </div>
              <div className="flex items-center justify-center">Prix</div>
              <div className="flex items-center justify-center">Date</div>
              <div className="flex items-center justify-center">Taxi</div>
              <div className="flex items-center justify-center">Payé par</div>
              <div className="flex items-center justify-center">Payé à</div>
              <div className="flex items-center justify-center">Action</div>
              {role === "admin" && (
                <div className="flex items-center justify-center">Annuler</div>
              )}
            </div>
            {filteredRows.map((soin) => (
              <AllDataTable soin={soin} key={soin.id} role={role} />
            ))}
            <div className="absolute bottom-[1.2rem] left-0 border-t w-full px-14 pt-5 flex justify-between gap-x-4">
              <div className="flex items-center gap-x-2">
                <p className=" uppercase font-realce text-sm lg:text-xl ">
                  Total Payéé :{" "}
                  <span className="text-red-500">{totalPayé}</span> DHs
                </p>
                <div className=" w-[2px] h-6 lg:w-1 lg:h-7 bg-orange-500 rounded-full" />
                <p className=" uppercase font-realce text-sm lg:text-xl ">
                  Total Non Payéé :{" "}
                  <span className="text-green-500">{totalNonPayé}</span> DHs
                </p>
              </div>
              <div className="flex items-center gap-x-9 font-realce text-xl">
                <p className="text-blue-500">
                  <span className="mr-2 text-black">{calcSalam / 50}</span>
                  SAL : <span className="text-black">{calcSalam}</span> DH
                </p>
                <p className="text-green-500">
                  <span className="mr-2 text-black">{calcIstanbul / 50}</span>
                  IST : <span className="text-black">{calcIstanbul}</span> DH
                </p>
                <p className="text-rose-500">
                  <span className="mr-2 text-black">{calcOrient / 50}</span>
                  ORI : <span className="text-black">{calcOrient}</span> DH
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {/* mobile */}
          {filteredRows.map((soin) => (
            <MobileAllData key={soin.id} soin={soin} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllDataPage;
