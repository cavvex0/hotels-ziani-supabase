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
import { deleteAllPaye } from "@/src/actions/deleteAll";
import toast from "react-hot-toast";

const ConfirmDeleteAllPaye = ({ setOpen }: { setOpen: any }) => {
  const handleDeletePaye = async () => {
    await deleteAllPaye();
    toast.success("Toutes les données payées ont été supprimées avec succès !");
    setOpen(false);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="" variant={"destructive"}>
          Supprimer payé
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
            onClick={handleDeletePaye}
            className="bg-red-500 hover:bg-red-600"
          >
            Continuer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDeleteAllPaye;
