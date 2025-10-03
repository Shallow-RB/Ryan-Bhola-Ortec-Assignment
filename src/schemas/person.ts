import { z } from "zod";

// Phone number validation helpers
const cleanPhoneNumber = (val: string) => val.replace(/\D/g, "");

const isValidPhoneLength = (val: string) => {
  const clean = cleanPhoneNumber(val);
  return clean.length >= 10 && clean.length <= 11 && /^\d+$/.test(clean);
};

const isValidDutchPhone = (val: string) => {
  const clean = cleanPhoneNumber(val);
  const isNational = /^0\d{9}$/.test(clean);
  const isIntl = /^31\d{9}$/.test(clean);
  return isNational || isIntl;
};

export const personSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(25, "First name must be less than 50 characters")
    .trim(),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .refine(isValidPhoneLength, {
      message: "Enter a valid phone number (10-11 digits only)",
    })
    .transform(cleanPhoneNumber)
    .refine(isValidDutchPhone, {
      message: "Enter a valid Dutch phone number format",
    }),
  joke: z.string().optional(),
});

export type PersonFormValues = z.infer<typeof personSchema>;

// Additional validation schemas for different contexts
export const personCreateSchema = personSchema.omit({ joke: true });
export const personUpdateSchema = personSchema.partial();

// Utility types
export type PersonCreateInput = z.infer<typeof personCreateSchema>;
export type PersonUpdateInput = z.infer<typeof personUpdateSchema>;
