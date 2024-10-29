import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { deleteNonPaye } from "@/src/actions/deleteAll";
import toast from "react-hot-toast";
import { CircleXIcon } from "lucide-react";
import { DashSoinShecmaType } from "@/src/schema/soinSchema";

type Props = {
  soin: DashSoinShecmaType;
  handleDelete: (id: string) => void;
};
const Cancel = ({ handleDelete, soin }: Props) => {
  const handleDeleteNonHotel = async () => {
    await deleteNonPaye();
    toast.success(
      "Toutes les données de non-hôtel ont été supprimées avec succès. 🎉"
    );
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="icon" variant="cancel">
          <CircleXIcon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Etes-vous absolument sûr?</AlertDialogTitle>
          <AlertDialogDescription>
            Si vous cliquez sur continuer, {soin.hotel} sera supprimé!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDelete(soin.id)}
            className="bg-red-500 hover:bg-red-600"
          >
            Continuer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Cancel;
