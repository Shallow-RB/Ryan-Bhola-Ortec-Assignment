"use client";
import { useEffect, useState } from "react";

interface PersonFormValues {
  firstName: string;
  phoneNumber: string;
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
    <div>
      {peopleList.map((person: PersonFormValues) => (
        <div key={person.firstName}>
          {person.firstName} - {person.phoneNumber}
        </div>
      ))}
    </div>
  );
}
