import { z } from "zod";

export const personSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters")
    .trim(),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .refine(
      (val) => {
        // Check if input contains only digits, spaces, dashes, and parentheses
        const cleanVal = val.replace(/\D/g, "");
        return (
          cleanVal.length >= 10 &&
          cleanVal.length <= 11 &&
          /^\d+$/.test(cleanVal)
        );
      },
      {
        message: "Enter a valid phone number (10-11 digits only)",
      }
    )
    .transform((val) => val.replace(/\D/g, ""))
    .refine(
      (val) => {
        const isNational = /^0\d{9}$/.test(val);
        const isIntl = /^31\d{9}$/.test(val);
        return isNational || isIntl;
      },
      {
        message: "Enter a valid Dutch phone number format",
      }
    ),
  joke: z.string().optional(),
});

export type PersonFormValues = z.infer<typeof personSchema>;
