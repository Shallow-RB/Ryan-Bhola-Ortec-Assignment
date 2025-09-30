"use client";
import { useEffect, useState } from "react";

interface PersonFormValues {
  firstName: string;
  phoneNumber: string;
  joke: string;
}

export function InfoList() {
  const [peopleList, setPeopleList] = useState([]);

  // UseEffect to fetch LocalStorage items on load.
  useEffect(() => {
    function load() {
      const people = JSON.parse(window.localStorage.getItem("people") || "[]");
      setPeopleList(people);
    }
    load();
    window.addEventListener("people:update", load);
    window.addEventListener("storage", load);
    return () => {
      window.removeEventListener("people:update", load);
      window.removeEventListener("storage", load);
    };
  }, []);

  return (
    <div className="w-full max-w-md space-y-2">
      {peopleList.map((person: PersonFormValues, index: number) => (
        <div
          key={`${person.firstName}-${person.phoneNumber}-${index}`}
          className="flex items-center justify-between rounded-md border border-gray-200 px-3 py-2 text-sm"
        >
          <div className="flex flex-col">
            <span>
              {person.firstName} - {person.phoneNumber}
            </span>
            <span className="text-xs text-gray-600 mt-1">{person.joke}</span>
          </div>
          <button
            type="button"
            onClick={() => {
              const next = [...peopleList];
              next.splice(index, 1);
              window.localStorage.setItem("people", JSON.stringify(next));
              setPeopleList(next);
              window.dispatchEvent(new Event("people:update"));
            }}
            className="rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600 cursor-pointer"
          >
            Delete
          </button>
        </div>
      ))}
      {peopleList.length === 0 && (
        <div className="text-sm text-gray-500">No entries yet.</div>
      )}
    </div>
  );
}
