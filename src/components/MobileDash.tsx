import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DashSoinShecmaType } from "../schema/soinSchema";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Switch } from "./ui/switch";
import Paye from "./confirmDelete/Paye";
import Cancel from "./confirmDelete/Cancel";

type Props = {
  soin: DashSoinShecmaType;
  handleTaxiChange: (id: string) => void;
  handlePay: (id: string) => void;
  handleDelete: (id: string) => void;
};

const MobileDash = ({
  soin,
  handleTaxiChange,
  handlePay,
  handleDelete,
}: Props) => {
  return (
    <Accordion type="single" collapsible className="border-b border-black">
      <AccordionItem value="item-1" className={cn("bg-white")}>
        <AccordionTrigger>
          <div className="flex items-center justify-between w-full px-3 ">
            <span className="flex-1 text-left text-[15px]">{soin.hotel}</span>
            <span className="flex-1 text-center text-[15px] ">
              {soin.reception}
            </span>
            <span
              className={cn(
                "flex-1 text-right text-[15px]",
                soin.paidBy ? "text-red-500" : "text-green-500"
              )}
            >
              {soin.price} DH
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex items-center justify-between px-3">
            <div className="">
              <span>{soin.name}</span>
            </div>
            <div className="flex items-center gap-x-3">
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
            <span>{format(new Date(soin.created_at), "HH:mm")}</span>
            {soin.taxi ? (
              <span className="bg-yellow-400 px-3 border border-black">
                Taxi
              </span>
            ) : (
              <div className="">
                <Switch onClick={() => handleTaxiChange(soin.id)} id="" />
              </div>
            )}
          </div>
          <div className="px-3 mt-3 flex items-center justify-between">
            {soin.paidBy ? (
              <p>
                Payé avec{" "}
                <span className="bg-rose-300 px-2 border border-black ml-2 capitalize">
                  {soin.paidBy}
                </span>
              </p>
            ) : (
              <span>Pas encore payé</span>
            )}
            <div className="flex items-center gap-x-2">
              <span>le</span>
              {soin.paidBy && (
                <div>{format(new Date(soin.updated_at), "dd/MM/yyyy")}</div>
              )}
            </div>
            <div>
              <Paye handlePay={handlePay} soin={soin} />
            </div>
            <div>
              <Cancel handleDelete={handleDelete} soin={soin} />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default MobileDash;
