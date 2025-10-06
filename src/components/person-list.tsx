import { ScrollArea } from "@/components/ui/scroll-area";
import { PersonCard } from "./person-card";
import { EmptyState } from "./empty-state";
import { type PersonListProps } from "@/types";

export function PersonList({ people, filters, onDelete }: PersonListProps) {
  return (
    <div className="flex-1 min-h-0">
      <ScrollArea className="h-full">
        <div className="space-y-3 pr-2">
          {people.map((person, i) => (
            <PersonCard
              key={`${person.firstName}-${person.phoneNumber}-${i}`}
              person={person}
              index={i}
              onDelete={onDelete}
            />
          ))}

          {people.length === 0 && <EmptyState />}
        </div>
      </ScrollArea>
    </div>
  );
}

