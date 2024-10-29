import { useMediaQuery } from "@/hooks/use-media-query";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { cn } from "@/utils/cn";
import { ReceptionSchemaType } from "@/src/schema/hotelSchema";

type Props = {
  hotelsData: any;
  setSelectedHotel: any;
  selectedHotel: any;
  setReceptionist: any;
  setShowFilteredData: (show: boolean) => void;
};

const ComboHistoryHotels = ({
  hotelsData,
  selectedHotel,
  setReceptionist,
  setSelectedHotel,
  setShowFilteredData,
}: Props) => {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full bg-gray-300 text-gray-500 hover:text-gray-500 justify-start font-normal"
          >
            {selectedHotel ? <>{selectedHotel}</> : <>Hotels/Guide...</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn("p-0 w-[500px]")} align="start">
          <HotelsList
            setOpen={setOpen}
            setSelectedHotel={setSelectedHotel}
            hotelsData={hotelsData}
            setReceptionist={setReceptionist}
            setShowFilteredData={setShowFilteredData}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="w-full bg-gray-300 text-gray-500 hover:text-gray-500 justify-start font-normal"
        >
          {selectedHotel ? <>{selectedHotel}</> : <>Hotels/Guide...</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <HotelsList
            setOpen={setOpen}
            setSelectedHotel={setSelectedHotel}
            hotelsData={hotelsData}
            setReceptionist={setReceptionist}
            setShowFilteredData={setShowFilteredData}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ComboHistoryHotels;

function HotelsList({
  setOpen,
  setSelectedHotel,
  hotelsData,
  setReceptionist,
  setShowFilteredData,
}: {
  hotelsData: ReceptionSchemaType[];
  setOpen: (open: boolean) => void;
  setSelectedHotel: (hotel: any) => void;
  setReceptionist: (receptions: any) => void;
  setShowFilteredData: (show: boolean) => void;
}) {
  return (
    <Command>
      <CommandInput placeholder="Recherche..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {hotelsData.map((hotel) => (
            <CommandItem
              key={hotel.name}
              value={hotel.name}
              onSelect={(value) => {
                setShowFilteredData(false);
                const selected = hotelsData.find((h) => h.name === value);
                setSelectedHotel(selected?.name);
                setReceptionist("");
                setOpen(false);
              }}
            >
              {hotel.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
