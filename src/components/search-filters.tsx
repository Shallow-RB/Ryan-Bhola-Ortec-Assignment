import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { type SearchFiltersProps } from "@/types";

export function SearchFilters({
  filters,
  onFiltersChange,
}: SearchFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
      <div className="relative flex-1 min-w-0">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={filters.query}
          onChange={(e) =>
            onFiltersChange({ ...filters, query: e.target.value })
          }
          placeholder="Search name, phone or joke..."
          className="w-full pl-9"
          data-cy="search-input"
        />
      </div>
    </div>
  );
}
