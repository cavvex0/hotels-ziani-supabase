import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { CircleXIcon } from "lucide-react";
import { DashSoinShecmaType } from "../schema/soinSchema";
import { format } from "date-fns";
import Paye from "./confirmDelete/Paye";

type Props = {
  soin: DashSoinShecmaType;
  handlePay: (id: string) => void;
  handleDelete: (id: string) => void;
  role: string;
};
function MobileAllData({ soin, handlePay, role, handleDelete }: Props) {
  return (
    <Accordion type="single" collapsible className="border-b border-black">
      <AccordionItem value="item-1" className={cn("bg-white")}>
        <AccordionTrigger>
          <div className="flex items-center justify-between w-full px-3 ">
            <span className="flex-1 text-left text-[15px]">{soin.hotel}</span>
            <span className="flex-1 text-center text-[15px]">
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
            <span>{soin.name}</span>
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
            <span>
              {format(new Date(soin.created_at), "dd/MM/yyyy  HH:mm")}
            </span>
            {soin.taxi && (
              <span className="bg-yellow-400 px-3 border border-black">
                Taxi
              </span>
            )}
          </div>
        </AccordionContent>
        <AccordionContent className="px-3 flex items-center justify-between">
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
          {soin.paidBy && (
            <div className="flex items-center gap-x-2">
              <span>le</span>
              <div>{format(new Date(soin.updated_at), "dd/MM/yyyy")}</div>
            </div>
          )}
          <div>
            <Paye soin={soin} handlePay={handlePay} />
          </div>
          {role === "admin" && (
            <div>
              <Button
                onClick={() => handleDelete(soin.id)}
                size="icon"
                variant="cancel"
              >
                <CircleXIcon />
              </Button>
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
export default MobileAllData;
