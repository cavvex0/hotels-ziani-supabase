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
  hotelsData: ReceptionSchemaType[];
  selectedHotel: any;
  setReceptionist: any;
  receptionist: any;
  setShowFilteredData: (show: boolean) => void;

};

const ComboHistoryRecep = ({
  hotelsData,
  selectedHotel,
  setReceptionist,
  receptionist,
  setShowFilteredData
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
            {receptionist ? <>{receptionist}</> : <>Receptionist...</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn("p-0 w-[400px]")} align="start">
          <ReceptionistsList
            setOpen={setOpen}
            setReceptionist={setReceptionist}
            hotelsData={hotelsData}
            selectedHotel={selectedHotel}
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
          {receptionist ? <>{receptionist}</> : <>Receptionist...</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <ReceptionistsList
            setOpen={setOpen}
            setReceptionist={setReceptionist}
            hotelsData={hotelsData}
            selectedHotel={selectedHotel}
            setShowFilteredData={setShowFilteredData}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ComboHistoryRecep;

function ReceptionistsList({
  setOpen,
  setReceptionist,
  selectedHotel,
  hotelsData,
  setShowFilteredData
}: {
  selectedHotel: any;
  hotelsData: ReceptionSchemaType[];
  setOpen: (open: boolean) => void;
  setReceptionist: (hotel: any) => void;
  setShowFilteredData: (show: boolean) => void;

}) {
  return (
    <Command>
      <CommandInput placeholder="Recherche..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {selectedHotel && (
            <>
              {hotelsData
                .find((hotel) => hotel.name === selectedHotel)
                ?.receptions.map((user) => {
                  return (
                    <CommandItem
                      key={user}
                      value={user}
                      onSelect={(value) => {
                        setShowFilteredData(false);
                        setReceptionist(value);
                        setOpen(false);
                      }}
                    >
                      {user}
                    </CommandItem>
                  );
                })}
            </>
          )}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
