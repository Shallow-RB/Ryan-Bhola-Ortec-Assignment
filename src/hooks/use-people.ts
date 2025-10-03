"use client";

import { useEffect, useState } from "react";
import { type PersonFormValues } from "@/schemas/person";

export function usePeople() {
  const [people, setPeople] = useState<PersonFormValues[]>([]);

  useEffect(() => {
    function load() {
      const next = JSON.parse(window.localStorage.getItem("people") || "[]");
      setPeople(next);
    }

    load();
    window.addEventListener("people:update", load);
    window.addEventListener("storage", load);

    return () => {
      window.removeEventListener("people:update", load);
      window.removeEventListener("storage", load);
    };
  }, []);

  const addPerson = (person: PersonFormValues) => {
    const existing = JSON.parse(window.localStorage.getItem("people") || "[]");
    const next = [person, ...existing];
    window.localStorage.setItem("people", JSON.stringify(next));
    setPeople(next);
    window.dispatchEvent(new Event("people:update"));
  };

  const deletePerson = (personToDelete: PersonFormValues) => {
    const next = people.filter((p) => p !== personToDelete);
    window.localStorage.setItem("people", JSON.stringify(next));
    setPeople(next);
    window.dispatchEvent(new Event("people:update"));
  };

  return {
    people,
    addPerson,
    deletePerson,
  };
}
