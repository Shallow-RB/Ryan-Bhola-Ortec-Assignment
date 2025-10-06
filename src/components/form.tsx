"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { personSchema, type PersonFormValues } from "@/schemas/person";
import { Form as FormProvider } from "@/components/ui/form";
import { usePeople } from "@/hooks/use-people";
import { useJoke } from "@/hooks/use-joke";
import { FormFields } from "./form-fields";
import { FormSubmitButton } from "./form-submit-button";

export function Form() {
  const { addPerson } = usePeople();
  const { fetchJoke, isLoading } = useJoke();

  const form = useForm<PersonFormValues>({
    resolver: zodResolver(personSchema),
    mode: "onBlur",
    defaultValues: { firstName: "", phoneNumber: "", joke: "" },
  });

  const {
    formState: { isSubmitting, isValid },
  } = form;

  async function onSubmit(data: PersonFormValues) {
    if (typeof window === "undefined") return;

    try {
      const joke = await fetchJoke();
      const personWithJoke = { ...data, joke };

      addPerson(personWithJoke);

      toast.success(`${data.firstName} added`, {
        description: "Saved with a random joke",
      });

      form.reset();
    } catch (error) {
      toast.error("Failed to fetch joke", {
        description: "Please try again",
      });
      console.error("Error:", error);
    }
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormFields form={form} />
        <FormSubmitButton
          isSubmitting={isSubmitting || isLoading}
          isValid={isValid}
        />
      </form>
    </FormProvider>
  );
}
