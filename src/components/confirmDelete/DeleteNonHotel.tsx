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

const ConfirmDeleteNonHotel = ({ setOpen }: { setOpen: any }) => {
  const handleDeleteNonHotel = async () => {
    await deleteNonPaye();
    toast.success(
      "Toutes les données de non-hôtel ont été supprimées avec succès. 🎉"
    );
    setOpen(false);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="" variant={"destructive"}>
          Supprimer Non hotel
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Etes-vous absolument sûr?</AlertDialogTitle>
          <AlertDialogDescription>
            Si vous cliquez sur continuer, toutes les réservations seront
            supprimées!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteNonHotel}
            className="bg-red-500 hover:bg-red-600"
          >
            Continuer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDeleteNonHotel;
