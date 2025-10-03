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
    .transform((val) => String(val).replace(/\D/g, ""))
    .refine(
      (val) => {
        const isNational = /^0\d{9}$/.test(val);
        const isIntl = /^31\d{9}$/.test(val);
        return isNational || isIntl;
      },
      {
        message: "Enter a valid phone number (10 characters)",
      }
    ),
  joke: z.string().optional(),
});

export type PersonFormValues = z.infer<typeof personSchema>;
