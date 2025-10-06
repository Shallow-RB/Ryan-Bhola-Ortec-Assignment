"use client";

import { toast } from "sonner";
import { usePeople } from "@/hooks/use-people";
import { useFilters } from "@/hooks/use-filters";
import { SearchFilters } from "./search-filters";
import { PersonList } from "./person-list";

export function PeopleTable() {
  const { people, deletePerson } = usePeople();
  const { filters, setFilters, filtered } = useFilters(people);

  function handleDelete(personToDelete: (typeof people)[0]) {
    deletePerson(personToDelete);
    toast.success(`${personToDelete.firstName} removed`, {
      description: "The person has been deleted",
    });
  }

  return (
    <div className="flex h-full w-full flex-col gap-3 min-h-0">
      <SearchFilters filters={filters} onFiltersChange={setFilters} />
      <PersonList people={filtered} filters={filters} onDelete={handleDelete} />
    </div>
  );
}
