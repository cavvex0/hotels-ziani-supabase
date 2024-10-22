"use client";

import * as React from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";

import { cn } from "@/lib/utils";
import { HotelSchemaType, ReceptionSchemaType } from "../schema/hotelSchema";

export function ReceptionsComboBox({
  hotelsData,
  selectedHotel,
  receptionist,
  setReceptionist,
  type,
}: {
  hotelsData: ReceptionSchemaType[];
  selectedHotel: any;
  setReceptionist: any;
  receptionist: any;
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
            {receptionist ? <>{receptionist}</> : <>Receptionist...</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={cn("p-0", type === "allData" ? "w-[400px]" : "w-[200px]")}
          align="start"
        >
          <ReceptionistsList
            setOpen={setOpen}
            setReceptionist={setReceptionist}
            hotelsData={hotelsData}
            selectedHotel={selectedHotel}
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
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function ReceptionistsList({
  setOpen,
  setReceptionist,
  selectedHotel,
  hotelsData,
}: {
  selectedHotel: any;
  hotelsData: ReceptionSchemaType[];
  setOpen: (open: boolean) => void;
  setReceptionist: (hotel: any) => void;
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
