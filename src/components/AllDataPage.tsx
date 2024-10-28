"use client";

import { useState } from "react";
import { ReceptionSchemaType } from "../schema/hotelSchema";
import { DashSoinShecmaType } from "../schema/soinSchema";
import AllDataHeader from "./AllDataHeader";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import AllDataTable from "./AllDataTable";
import MobileAllData from "./MobileAllData";
import { adminCanDelete, handlePaye } from "../actions/handleSoin";
import toast from "react-hot-toast";
import { Checkbox } from "./ui/checkbox";

type Props = {
  soins: DashSoinShecmaType[];
  hotels: ReceptionSchemaType[];
  role: string;
};

const AllDataPage = ({ hotels, soins, role }: Props) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [selectedHotel, setSelectedHotel] = useState("");
  const [receptionist, setReceptionist] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [showpaidCheck, setShowpaidCheck] = useState(false);

  const filterEmirates = soins.filter((row) =>
    row.hotel === "Emirates" && selectedDate
      ? format(new Date(row.created_at), "dd/MM/yyyy") ===
        format(new Date(selectedDate), "dd/MM/yyyy")
      : null
  );

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

  const handlePay = async (id: string) => {
    try {
      const response = await handlePaye(id);

      if (!response?.success) {
        toast.error(response?.message ?? "Erreur inconnue");
        return;
      }

      toast.success("Payé avec succès");
    } catch (error) {
      toast.error("Erreur inconnue");
    }
  };
  const handleDelete = async (id: string) => {
    adminCanDelete(id);
    toast.success("supprimer avec succès.");
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div>
        <AllDataHeader
          role={role}
          receptionist={receptionist}
          setReceptionist={setReceptionist}
          selectedHotel={selectedHotel}
          setSelectedHotel={setSelectedHotel}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          hotels={hotels}
        />
      </div>
      <div className="flex items-center justify-end space-x-2">
        <Checkbox
          id="terms2"
          checked={showpaidCheck}
          onCheckedChange={() => {
            setShowpaidCheck(!showpaidCheck);
            showpaidCheck
              ? setSelectedDate(new Date())
              : setSelectedDate(null);
          }}
        />
        <label
          htmlFor="terms2"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
        >
          Afficher tout Payant
        </label>
      </div>
      {isDesktop ? (
        <div className="pb-9 hidden lg:block">
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
              <AllDataTable
                soin={soin}
                key={soin.id}
                role={role}
                handlePay={handlePay}
                handleDelete={handleDelete}
              />
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
                {filterEmirates && filterEmirates.length > 0 && (
                  <div>
                    Emirates :{" "}
                    <span className="text-red-500 ml-2">
                      {filterEmirates.length}
                    </span>
                  </div>
                )}
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
            <MobileAllData
              key={soin.id}
              soin={soin}
              role={role}
              handlePay={handlePay}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllDataPage;
