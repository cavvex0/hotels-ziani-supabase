import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Trash2Icon } from "lucide-react";

type Props = {
  bain: {
    salam: number;
    istanbul: number;
    orient: number;
  };
  setBain: (bain: any) => void;
  handleBain: (type: string, val: string) => void;
};
const BainSelector = ({ bain, handleBain, setBain }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="bg-gray-300 hover:bg-gray-300 text-gray-500 w-full"
        >
          Bain...
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52" align="center" forceMount>
        <div className="h-[170px] flex flex-col justify-center p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="w-1/2 text-sm  uppercase text-blue-500">
              Salam
            </span>
            <div className="flex items-center justify-end border border-black rounded-sm p-1 gap-3 w-1/2">
              <Button
                className="flex-1 "
                onClick={() => handleBain("salam", "d")}
                variant="outline"
                size="icon"
              >
                -
              </Button>
              <span className="flex-1 text-center">{bain.salam}</span>
              <Button
                className="flex-1 "
                onClick={() => handleBain("salam", "i")}
                variant="outline"
                size="icon"
              >
                +
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="w-1/2 text-sm  uppercase text-green-500">
              Istanbul
            </span>
            <div className="flex items-center justify-end border border-black rounded-sm p-1 gap-3 w-1/2">
              <Button
                className="flex-1 "
                onClick={() => handleBain("istanbul", "d")}
                variant="outline"
                size="icon"
              >
                -
              </Button>
              <span className="flex-1 text-center">{bain.istanbul}</span>
              <Button
                className="flex-1 "
                onClick={() => handleBain("istanbul", "i")}
                variant="outline"
                size="icon"
              >
                +
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="w-1/2 text-sm  uppercase text-rose-500">
              Orient
            </span>
            <div className="flex items-center justify-end border border-black rounded-sm p-1 gap-3 w-1/2">
              <Button
                className="flex-1 "
                onClick={() => handleBain("orient", "d")}
                variant="outline"
                size="icon"
              >
                -
              </Button>
              <span className="flex-1 text-center">{bain.orient}</span>
              <Button
                className="flex-1  "
                onClick={() => handleBain("orient", "i")}
                variant="outline"
                size="icon"
              >
                +
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <Button
              onClick={() => setBain({ salam: 0, istanbul: 0, orient: 0 })}
              className="p-[2px]"
              size="icon"
              variant="outline"
            >
              <Trash2Icon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BainSelector;
