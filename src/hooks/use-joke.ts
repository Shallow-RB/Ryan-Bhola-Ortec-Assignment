"use client";

import { useState } from "react";

const API_URL = "https://api.chucknorris.io/jokes/random";

export function useJoke() {
  const [isLoading, setIsLoading] = useState(false);

  const fetchJoke = async (): Promise<string> => {
    setIsLoading(true);
    try {
      const res = await fetch(API_URL);
      const jokeJson = await res.json();
      return jokeJson.value;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fetchJoke,
    isLoading,
  };
}
