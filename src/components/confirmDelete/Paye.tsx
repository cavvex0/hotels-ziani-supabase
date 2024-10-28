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
import { cn } from "@/lib/utils";
import { DashSoinShecmaType } from "@/src/schema/soinSchema";
import { useMediaQuery } from "@/hooks/use-media-query";

type Props = {
  soin: DashSoinShecmaType;
  handlePay: (id: string) => void;
};

const Paye = ({ handlePay, soin }: Props) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className={cn(
            " bg-green-700 hover:bg-green-800 border border-black rounded-none",
            isDesktop ? "h-8 w-20" : "h-7 w-16"
          )}
        >
          Payer
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Etes-vous absolument sûr?</AlertDialogTitle>
          <AlertDialogDescription>
            Si vous cliquez sur continuer, {soin.hotel} sera payé!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handlePay(soin.id)}
            className="bg-green-600 hover:bg-green-700"
          >
            Continuer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Paye;
