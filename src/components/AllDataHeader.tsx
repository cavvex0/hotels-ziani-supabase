import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { CalendarIcon, Trash2Icon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import React from "react";
import { HotelsComboBox } from "./HotelsComboBox";
import { ReceptionSchemaType } from "../schema/hotelSchema";
import { ReceptionsComboBox } from "./ReceptionsComboBox";
import { format } from "date-fns";
import DeleteAll from "./confirmDelete/DeleteAll";
type Props = {
  role: string;
  hotels: ReceptionSchemaType[];
  selectedHotel: any;
  setSelectedHotel: any;
  selectedDate: Date | null;
  setSelectedDate: any;
  receptionist: string;
  setReceptionist: any;
};
const AllDataHeader = ({
  role,
  hotels,
  selectedHotel,
  setSelectedHotel,
  selectedDate,
  setSelectedDate,
  receptionist,
  setReceptionist,
}: Props) => {
  return (
    <div
      className={cn(
        "h-full py-4 lg:py-0 lg:h-[4.5rem] bg-white rounded-[30px] grid gap-2 lg:gap-4 px-6 grid-cols-1 lg:grid-cols-3 shadoww border border-gray-300",
        role === "admin" ? "lg:grid-cols-4" : "lg:grid-cols-3"
      )}
    >
      <div className="flex items-center justify-center relative">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal text-muted-foreground bg-gray-300"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? (
                format(selectedDate, "dd/MM/yyyy")
              ) : (
                <span>Choisis une date...</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              initialFocus
              selected={selectedDate || new Date()}
              onSelect={(date) => {
                if (date?.toDateString() === selectedDate?.toDateString()) {
                  setSelectedDate(new Date());
                } else {
                  setSelectedDate(date);
                }
              }}
            />
          </PopoverContent>
        </Popover>
        <Button
          onClick={() => setSelectedDate(null)}
          variant="outline"
          className="absolute right-0 z-20 cursor-pointer bg-gray-300 outline-none border-none"
        >
          <Trash2Icon />
        </Button>
      </div>
      <div className="flex items-center justify-center relative">
        <HotelsComboBox
          type="allData"
          hotelsData={hotels}
          selectedHotel={selectedHotel}
          setSelectedHotel={setSelectedHotel}
          setReceptionist={setReceptionist}
        />
        <Button
          onClick={() => setSelectedHotel("")}
          variant="outline"
          className="absolute right-0 z-20 cursor-pointer bg-gray-300 outline-none border-none"
        >
          <Trash2Icon />
        </Button>
      </div>
      <div className="flex items-center justify-center relative">
        <div className="w-full">
          <ReceptionsComboBox
            type="allData"
            hotelsData={hotels}
            receptionist={receptionist}
            setReceptionist={setReceptionist}
            selectedHotel={selectedHotel}
          />
          <Button
            onClick={() => setReceptionist("")}
            variant="outline"
            className="absolute right-0 z-20 cursor-pointer bg-gray-300 outline-none border-none"
          >
            <Trash2Icon />
          </Button>
        </div>
      </div>
      {role === "admin" && (
        <div className="flex items-center justify-center">
          <DeleteAll />
        </div>
      )}
    </div>
  );
};

export default AllDataHeader;
