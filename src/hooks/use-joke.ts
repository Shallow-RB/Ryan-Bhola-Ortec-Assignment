"use client";

import { useState } from "react";
import { toast } from "sonner";

const API_URL = "https://api.chucknorris.io/jokes/random";

export function useJoke() {
  const [isLoading, setIsLoading] = useState(false);

  const fetchJoke = async (): Promise<string> => {
    setIsLoading(true);
    try {
      const res = await fetch(API_URL);
      // Treat non-2xx responses as errors so callers can handle them
      if (!res.ok) {
        const errText = await res.text().catch(() => res.statusText || "");
        const error = new Error(
          "Failed to fetch joke"
        );
        // Optionally log for debugging
        console.error(error);
        throw error;
      }

      const jokeJson = await res.json();
      return jokeJson.value;
    } catch (error) {
      toast.error("Failed to fetch joke");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fetchJoke,
    isLoading,
  };
}
