import { Trash2, AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { PersonInfo } from "./person-info";
import { type DeleteDialogProps } from "@/types";

export function DeleteDialog({
  person,
  onConfirm,
  isOpen,
  onOpenChange,
}: DeleteDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          variant="destructive"
          size="icon-sm"
          aria-label={`Delete ${person.firstName}`}
          className="h-8 w-8 flex-shrink-0 cursor-pointer"
          data-cy={`delete-button-${person.firstName
            .toLowerCase()
            .replace(/\s+/g, "-")}`}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <AlertDialogTitle className="text-xl text-center font-semibold">
            Delete Person
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base text-center">
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Person Info Card */}
        <div className="my-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <PersonInfo person={person} showJoke={true} />
        </div>

        <AlertDialogFooter className="gap-3 sm:gap-2">
          <AlertDialogCancel className="flex items-center gap-2">
            <X className="h-4 w-4" />
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
            data-cy="confirm-delete-button"
          >
            <Trash2 className="h-4 w-4" />
            Delete Person
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
