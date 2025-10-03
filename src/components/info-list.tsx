"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { isFibonacci } from "@/lib/utils";
import { type PersonFormValues } from "@/schemas/person";

export function InfoList() {
  const [peopleList, setPeopleList] = useState<PersonFormValues[]>([]);

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
    <div className="w-full max-w-md">
      <div className="max-h-80 overflow-y-auto pr-1 space-y-2 [scrollbar-width:auto] [scrollbar-color:theme(colors.gray.300)_transparent]">
        {peopleList.map((person: PersonFormValues, index: number) => (
          <div
            key={`${person.firstName}-${person.phoneNumber}-${index}`}
            className={`flex items-center justify-between rounded-md px-3 py-2 text-sm border transition-colors motion-reduce:transition-none ${
              isFibonacci(index)
                ? "border-green-300 bg-green-50/70"
                : "border-1 border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <div className="flex flex-col">
              <span>
                {person.firstName} - {person.phoneNumber}
              </span>
              {person.joke && (
                <span className="text-xs text-gray-600 mt-1">
                  {person.joke}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={() => {
                const next = [...peopleList];
                const deletedPerson = next.splice(index, 1)[0];
                window.localStorage.setItem("people", JSON.stringify(next));
                setPeopleList(next);
                window.dispatchEvent(new Event("people:update"));
                toast.success(`${deletedPerson.firstName} has been deleted`);
              }}
              className="rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-200 cursor-pointer"
            >
              Delete
            </button>
          </div>
        ))}
        {peopleList.length === 0 && (
          <div className="text-sm text-gray-500">No entries yet.</div>
        )}
      </div>
    </div>
  );
}
