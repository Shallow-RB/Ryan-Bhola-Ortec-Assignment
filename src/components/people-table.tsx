"use client";

import { useEffect, useMemo, useState } from "react";
import { type PersonFormValues } from "@/schemas/person";
import { isFibonacci } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Phone,
  Search,
  Sparkles,
  Trash2,
  User,
  Quote,
  AlertTriangle,
  X,
} from "lucide-react";

interface Filters {
  query: string;
  showFibonacciOnly: boolean;
}

export function PeopleTable() {
  const [people, setPeople] = useState<PersonFormValues[]>([]);
  const [filters, setFilters] = useState<Filters>({
    query: "",
    showFibonacciOnly: false,
  });

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

  function handleDelete(personToDelete: PersonFormValues) {
    const next = people.filter((p) => p !== personToDelete);
    window.localStorage.setItem("people", JSON.stringify(next));
    setPeople(next);
    window.dispatchEvent(new Event("people:update"));
    toast.success(`${personToDelete.firstName} removed`, {
      description: "The person has been deleted",
    });
  }

  return (
    <div className="flex h-full w-full flex-col gap-3 min-h-0">
      {/* filters */}
      <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
        <div className="relative flex-1 min-w-0">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={filters.query}
            onChange={(e) =>
              setFilters((f) => ({ ...f, query: e.target.value }))
            }
            placeholder="Search name, phone or joke..."
            className="w-full pl-9"
          />
        </div>
      </div>

      {/* list items */}
      <div className="flex-1 min-h-0">
        <ScrollArea className="h-full">
          <div className="space-y-3 pr-2">
            {filtered.map((person, i) => (
              <Card
                key={`${person.firstName}-${person.phoneNumber}-${i}`}
                className={`transition-all hover:shadow-md ${
                  isFibonacci(i)
                    ? "border-green-200 bg-gradient-to-br from-green-50 to-emerald-100"
                    : "hover:border-muted-foreground/20"
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 flex-shrink-0">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-foreground truncate">
                            {person.firstName}
                          </h3>
                          {isFibonacci(i) && (
                            <span className="inline-flex items-center rounded-full border border-green-300 bg-green-100 px-2 py-1 text-xs font-medium text-green-700 flex-shrink-0">
                              <Sparkles className="mr-1 h-3 w-3" /> Fibonacci
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="h-4 w-4 text-orange-600 flex-shrink-0" />
                          <span className="font-mono truncate">
                            {person.phoneNumber}
                          </span>
                        </div>
                      </div>
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon-sm"
                          aria-label={`Delete ${person.firstName}`}
                          className="h-8 w-8 flex-shrink-0 cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="sm:max-w-md">
                        <AlertDialogHeader className="text-center">
                          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                            <AlertTriangle className="h-6 w-6 text-red-600" />
                          </div>
                          <AlertDialogTitle className="text-xl text-center font-semibold">
                            Delete Person
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-base text-center">
                            This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>

                        {/* Person Info Card */}
                        <div className="my-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                              <User className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-gray-900 truncate">
                                {person.firstName}
                              </h3>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Phone className="h-4 w-4 text-orange-600 flex-shrink-0" />
                                <span className="font-mono">
                                  {person.phoneNumber}
                                </span>
                              </div>
                            </div>
                          </div>
                          {person.joke && (
                            <div className="mt-3 pt-3 border-t border-gray-200">
                              <div className="flex items-start gap-2">
                                <Quote className="mt-0.5 h-4 w-4 text-gray-400 flex-shrink-0" />
                                <p className="text-sm text-gray-600 italic leading-relaxed line-clamp-2">
                                  &ldquo;{person.joke}&rdquo;
                                </p>
                              </div>
                            </div>
                          )}
                        </div>

                        <AlertDialogFooter className="gap-3 sm:gap-2">
                          <AlertDialogCancel className="flex items-center gap-2">
                            <X className="h-4 w-4" />
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(person)}
                            className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete Person
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardHeader>
                {person.joke && (
                  <CardContent className="pt-0">
                    <div className="flex items-start gap-2 rounded-lg bg-gray-100/50 p-3">
                      <Quote className="mt-0.5 h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <p className="text-sm italic text-muted-foreground leading-relaxed break-words">
                        &ldquo;{person.joke}&rdquo;
                      </p>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}

            {filtered.length === 0 && (
              <Card className="border-dashed w-full">
                <CardContent className="flex flex-col w-full items-center justify-center py-12">
                  <User className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground">No people found</p>
                  <p className="text-sm text-muted-foreground/70">
                    Try adjusting your search or add someone new
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
