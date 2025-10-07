import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FormSubmitButtonProps {
  isSubmitting: boolean;
  isValid: boolean;
}

export function FormSubmitButton({
  isSubmitting,
  isValid,
}: FormSubmitButtonProps) {
  return (
    <Button
      type="submit"
      disabled={!isValid || isSubmitting}
      className="w-full cursor-pointer"
      data-cy="submit-button"
    >
      {isSubmitting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Saving...
        </>
      ) : (
        <>
          <Save className="h-4 w-4" />
          Save
        </>
      )}
    </Button>
  );
}
