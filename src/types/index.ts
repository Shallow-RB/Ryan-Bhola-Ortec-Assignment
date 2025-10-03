import { type PersonFormValues } from "@/schemas/person";

export interface Filters {
  query: string;
  showFibonacciOnly: boolean;
}

export interface PersonCardProps {
  person: PersonFormValues;
  index: number;
  onDelete: (person: PersonFormValues) => void;
}

export interface SearchFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

export interface PersonListProps {
  people: PersonFormValues[];
  filters: Filters;
  onDelete: (person: PersonFormValues) => void;
}

export interface EmptyStateProps {
  message?: string;
  description?: string;
}

export interface PersonInfoProps {
  person: PersonFormValues;
  showJoke?: boolean;
}

export interface DeleteDialogProps {
  person: PersonFormValues;
  onConfirm: () => void;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}
