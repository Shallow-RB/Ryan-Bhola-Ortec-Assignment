"use client";
import { useEffect, useState } from "react";

interface PersonFormValues {
  firstName: string;
  phoneNumber: string;
}

export function InfoList() {
  const [peopleList, setPeopleList] = useState([]);

  useEffect(() => {
    const people = JSON.parse(window.localStorage.getItem("people") || "[]");
    if (people) {
      setPeopleList(people);
    }
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
