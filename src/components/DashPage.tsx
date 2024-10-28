"use client";

import { format } from "date-fns";
import { DashSoinShecmaType } from "../schema/soinSchema";
import { Switch } from "./ui/switch";
import { deleteSoin, handlePaye, handleTaxi } from "../actions/handleSoin";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { CircleXIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useMediaQuery } from "@/hooks/use-media-query";
import MobileDash from "./MobileDash";
import Paye from "./confirmDelete/Paye";

type Props = {
  soins: DashSoinShecmaType[];

};

const handleTaxiChange = (id: string) => {
  handleTaxi(id);
};
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
  try {
    const response = await deleteSoin(id);

    if (!response?.success) {
      toast.error(response?.message ?? "Erreur inconnue");
      return;
    }

    toast.success("Annulé avec succès!");
  } catch (error) {
    toast.error("Erreur inconnue");
  }
};
const DashPage = ({ soins }: Props) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const filterNonEmirates = soins.filter((row) => row.hotel !== "Emirates");
  const filterEmirates = soins.filter((row) => row.hotel == "Emirates");

  const calcSalam = soins
    .filter((row) => row.price)
    .map((soin) => soin.salam)
    .reduce((acc, curr) => acc + curr * 50, 0);
  const calcIstanbul = soins
    .filter((row) => row.price)
    .map((soin) => soin.istanbul)
    .reduce((acc, curr) => acc + curr * 50, 0);
  const calcOrient = soins
    .filter((row) => row.price)
    .map((soin) => soin.orient)
    .reduce((acc, curr) => acc + curr * 50, 0);

  if (isDesktop) {
    return (
      <div className="py-9">
        <div className="bg-white min-h-[500px] rounded-[37px] shadoww border border-gray-300 relative pb-[4rem]">
          <div className="grid grid-cols-12 border-b h-14 px-4 text-[15px]">
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
            <div className="flex items-center justify-center">Heure</div>
            <div className="flex items-center justify-center">Taxi</div>
            <div className="flex items-center justify-center">Payé par</div>
            <div className="flex items-center justify-center">Payé à</div>
            <div className="flex items-center justify-center">Action</div>
            <div className="flex items-center justify-center">Annuler</div>
          </div>
          {filterNonEmirates.map((soin) => {
            return (
              <div
                className="grid grid-cols-12 px-4 border-b py-3 text-sm hover:bg-gray-100"
                key={soin.id}
              >
                <div className={`flex items-center justify-center capitalize `}>
                  {soin.user.charAt(0)}
                </div>
                <div className="flex items-center justify-center capitalize">
                  {soin.name}
                </div>
                <div className="flex items-center justify-center capitalize">
                  {soin.hotel}
                </div>
                <div className="flex items-center justify-center capitalize">
                  {soin.reception}
                </div>
                <div className="flex items-center justify-between px-2">
                  <span className="text-[13px] font-mono bg-blue-300 h-5 w-5 border border-black font-semibold text-blue-800 flex items-center justify-center rounded-full">
                    {soin.salam}
                  </span>
                  <span className="text-[13px] font-mono bg-green-300 h-5 w-5 border border-black font-semibold text-green-800 flex items-center justify-center rounded-full">
                    {soin.istanbul}
                  </span>
                  <span className="text-[13px] font-mono bg-red-300 h-5 w-5 border border-black font-semibold text-rose-800 flex items-center justify-center rounded-full">
                    {soin.orient}
                  </span>
                </div>
                <div className="flex items-center justify-center">
                  {soin.price} DH
                </div>
                <div className="flex items-center justify-center">
                  {format(new Date(soin.created_at), "HH:mm")}
                </div>
                <div className="flex items-center justify-center">
                  {soin.taxi ? (
                    <span className="bg-yellow-400 px-3 py-0.5  border border-black">
                      Taxi
                    </span>
                  ) : (
                    <div className="flex items-center justify-center h-full w-full">
                      <Switch onClick={() => handleTaxiChange(soin.id)} id="" />
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-center">
                  {soin.paidBy ? (
                    <div className="bg-rose-300 px-3  py-0.5 border border-black capitalize">
                      {soin.paidBy}
                    </div>
                  ) : (
                    <div className="">NonPayé</div>
                  )}
                </div>
                <div className="flex items-center justify-center">
                  {soin.paidBy && (
                    <div>{format(new Date(soin.updated_at), "dd/MM/yyyy")}</div>
                  )}
                </div>
                <div className="flex items-center justify-center">
                  <Paye handlePay={handlePay} soin={soin} />
                </div>
                <div className="flex items-center justify-center">
                  <Button
                    onClick={() => handleDelete(soin.id)}
                    size="icon"
                    variant="cancel"
                  >
                    <CircleXIcon />
                  </Button>
                </div>
              </div>
            );
          })}
          <div className="absolute bottom-[1.2rem] left-0 border-t w-full pl-14 pt-5">
            <div className="flex gap-x-9 font-realce text-xl">
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
              {filterEmirates && filterEmirates.length > 0 && (
                <div>
                  Emirates :{" "}
                  <span className="text-red-500 ml-2">{filterEmirates.length}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="px-1">
        {soins.map((soin) => (
          <MobileDash
            key={soin.id}
            soin={soin}
            handleTaxiChange={handleTaxiChange}
            handlePay={handlePay}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    );
  }
};

export default DashPage;
