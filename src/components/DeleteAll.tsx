import { MoveRightIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { deleteAllPaye, deleteNonPaye } from "../actions/deleteAll";

function DeleteAll() {
  const handleDeleteNonHotel = async () => {
    await deleteNonPaye();
  };

  const handleDeletePaye = async () => {
    await deleteAllPaye();
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full" variant="destructive">
          Attention!
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription asChild>
            <div className="mt-9 flex flex-col gap-y-7">
              <div className=" flex items-center justify-between">
                <h1 className="lg:text-[18px] text-black">
                  Supprimer Non hotel
                </h1>
                <MoveRightIcon />
                <Button
                  onClick={() => handleDeleteNonHotel()}
                  variant="destructive"
                >
                  Supprimer tout !
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <h1 className="lg:text-[18px] text-black">Supprimer payé</h1>
                <MoveRightIcon />
                <Button
                  onClick={() => handleDeletePaye()}
                  variant="destructive"
                >
                  Supprimer tout !
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
export default DeleteAll;
