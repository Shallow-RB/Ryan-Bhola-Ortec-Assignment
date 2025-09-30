"use client";

import { useForm } from "react-hook-form";

interface PersonFormValues {
  firstName: string;
  phoneNumber: string;
  joke: string;
}

const API_URL = "https://api.chucknorris.io/jokes/random";

export function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<PersonFormValues>({
    mode: "onChange",
    defaultValues: { firstName: "", phoneNumber: "", joke: "" },
  });

  async function onSubmit(data: PersonFormValues) {
    if (typeof window === "undefined") return;
    try {
      const res = await fetch(API_URL);
      const jokeJson = await res.json();
      const joke = jokeJson.value;
      // Get existing data from localStorage
      const existing = JSON.parse(
        window.localStorage.getItem("people") || "[]"
      );
      // Add new data to existing data
      const next = {
        ...data,
        joke,
      };
      // Set new data to localStorage
      window.localStorage.setItem(
        "people",
        JSON.stringify([next, ...existing])
      );
      // Notify listeners that people changed
      window.dispatchEvent(new Event("people:update"));
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
        className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors motion-reduce:transition-none"
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
        className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors motion-reduce:transition-none"
        // Register phone number input
        {...register("phoneNumber", {
          required: "Phone number is required",
          setValueAs: (v) => String(v ?? "").replace(/\D/g, ""),
          //Validate phone number
          validate: (v) => {
            const s = String(v);
            const isNational = /^0\d{9}$/.test(s);
            const isIntl = /^31\d{9}$/.test(s);
            return isNational || isIntl || "Enter a valid phone number";
          },
        })}
      />
      {/* Error message */}
      {errors.phoneNumber?.message && (
        <p className="text-xs text-red-600">{errors.phoneNumber.message}</p>
      )}

      <button
        type="submit"
        disabled={!isValid}
        className="inline-flex w-full cursor-pointer items-center justify-center rounded-md bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 px-4 py-2 text-sm font-medium text-white transition-colors motion-reduce:transition-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-300"
      >
        Save
      </button>
    </form>
  );
}
