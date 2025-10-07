import { User, Phone, Smile } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type UseFormReturn } from "react-hook-form";
import { type PersonFormValues } from "@/schemas/person";

interface FormFieldsProps {
  form: UseFormReturn<PersonFormValues>;
}

export function FormFields({ form }: FormFieldsProps) {
  return (
    <>
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
                <Input
                  {...field}
                  placeholder="Chuck Norris"
                  data-cy="first-name-input"
                />
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
                  data-cy="phone-number-input"
                  onChange={(e) => {
                    // Allow only digits, spaces, dashes, and parentheses
                    const value = e.target.value.replace(/[^\d\s\-\(\)]/g, "");
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
    </>
  );
}
