"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { User, Phone, Loader2, Save, Smile } from "lucide-react";
import { personSchema, type PersonFormValues } from "@/schemas/person";
import {
  Form as FormProvider,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const API_URL = "https://api.chucknorris.io/jokes/random";

export function Form() {
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
      const res = await fetch(API_URL);
      const jokeJson = await res.json();
      const joke = jokeJson.value;

      const existing = JSON.parse(
        window.localStorage.getItem("people") || "[]"
      );

      const next = { ...data, joke };

      window.localStorage.setItem(
        "people",
        JSON.stringify([next, ...existing])
      );
      window.dispatchEvent(new Event("people:update"));

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
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-blue-600" />
                First name
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input {...field} placeholder="Chuck Norris" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-orange-600" />
                Phone
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    type="tel"
                    inputMode="numeric"
                    placeholder="06 - 12345678"
                    onChange={(e) => {
                      // Allow only digits, spaces, dashes, and parentheses
                      const value = e.target.value.replace(
                        /[^\d\s\-\(\)]/g,
                        ""
                      );
                      field.onChange(value);
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Smile className="h-3.5 w-3.5 text-orange-500" />A random joke will be
          fetched automatically.
        </div>

        <Button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="w-full cursor-pointer"
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
      </form>
    </FormProvider>
  );
}
