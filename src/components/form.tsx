"use client";

import { useForm } from "react-hook-form";

interface PersonFormValues {
  firstName: string;
  phoneNumber: string;
}

export function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<PersonFormValues>({
    mode: "onChange",
    defaultValues: { firstName: "", phoneNumber: "" },
  });

  function onSubmit(data: PersonFormValues) {
    if (typeof window === "undefined") return;
    try {
      // Get existing data from localStorage
      const existing = JSON.parse(
        window.localStorage.getItem("people") || "[]"
      );
      // Add new data to existing data
      const next = {
        ...data,
      };
      // Set new data to localStorage
      window.localStorage.setItem(
        "people",
        JSON.stringify([next, ...existing])
      );
      reset();
    } catch {}
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md space-y-3"
    >
      <input
        placeholder="First Name"
        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
        // Register first name input
        {...register("firstName", {
          required: "First name is required",
          validate: (v) =>
            v.trim().length >= 2 || "First name must be at least 2 characters",
        })}
      />
      {/* Error message */}
      {errors.firstName?.message && (
        <p className="text-xs text-red-600">{errors.firstName.message}</p>
      )}

      <input
        inputMode="numeric"
        placeholder="1234567890"
        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
        // Register phone number input
        {...register("phoneNumber", {
          required: "Phone number is required",
          setValueAs: (v) =>
            String(v ?? "")
              .replace(/\D/g, "")
              .slice(0, 10),
          validate: (v) =>
            /^\d{10}$/.test(v) || "Phone number must be 10 digits",
        })}
      />
      {/* Error message */}
      {errors.phoneNumber?.message && (
        <p className="text-xs text-red-600">{errors.phoneNumber.message}</p>
      )}

      <button
        type="submit"
        disabled={!isValid}
        className="inline-flex w-full cursor-pointer items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-300"
      >
        Save
      </button>
    </form>
  );
}
