"use client";

import { useMemo, useState } from "react";
import { isFibonacci } from "@/lib/utils";
import { type PersonFormValues } from "@/schemas/person";
import { type Filters } from "@/types";

export function useFilters(people: PersonFormValues[]) {
  const [filters, setFilters] = useState<Filters>({
    query: "",
    showFibonacciOnly: false,
  });

  const filtered = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    const byQuery = q
      ? people.filter((p) =>
          [p.firstName, p.phoneNumber, p.joke]
            .filter(Boolean)
            .some((v) => String(v).toLowerCase().includes(q))
        )
      : people;
    const byFib = filters.showFibonacciOnly
      ? byQuery.filter((_, i) => isFibonacci(i))
      : byQuery;
    return byFib;
  }, [people, filters]);

  return {
    filters,
    setFilters,
    filtered,
  };
}
