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
import ConfirmDeleteAllPaye from "./confirmDelete/DeleteAllPaye";
import ConfirmDeleteNonHotel from "./confirmDelete/DeleteNonHotel";
import { useState } from "react";

function DeleteAll() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" variant="destructive">
          Attention!
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription asChild>
            <div className="flex items-center justify-between pt-4">
              <ConfirmDeleteAllPaye setOpen={setOpen} />
              <MoveRightIcon />
              <ConfirmDeleteNonHotel setOpen={setOpen} />
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
export default DeleteAll;
