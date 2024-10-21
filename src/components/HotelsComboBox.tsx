"use client";

import * as React from "react";

import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { HotelSchemaType } from "../schema/hotelSchema";

export function HotelsComboBox({
  hotelsData,
  setSelectedHotel,
  selectedHotel,
  type,
}: {
  hotelsData: HotelSchemaType[];
  selectedHotel: any;
  setSelectedHotel: any;
  type: string;
}) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

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
        <PopoverContent
          className={cn(
            "p-0",
            type === "allData"
              ? "w-[400px]"
              : type === "addHotel"
                ? "w-[510px]"
                : "w-[200px]"
          )}
          align="start"
        >
          <HotelsList
            setOpen={setOpen}
            setSelectedHotel={setSelectedHotel}
            hotelsData={hotelsData}
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
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function HotelsList({
  setOpen,
  setSelectedHotel,
  hotelsData,
}: {
  hotelsData: HotelSchemaType[];
  setOpen: (open: boolean) => void;
  setSelectedHotel: (hotel: any) => void;
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
                const selected = hotelsData.find((h) => h.name === value);
                setSelectedHotel(selected?.name);
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
