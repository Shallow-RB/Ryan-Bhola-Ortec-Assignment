import { User, Phone, Quote, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PersonInfo } from "./person-info";
import { DeleteDialog } from "./delete-dialog";
import { isFibonacci } from "@/lib/utils";
import { type PersonCardProps } from "@/types";

export function PersonCard({ person, index, onDelete }: PersonCardProps) {
  const isFib = isFibonacci(index);

  return (
    <Card
      className={`transition-all hover:shadow-md ${
        isFib
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
                {isFib && (
                  <span className="inline-flex items-center rounded-full border border-green-300 bg-green-100 px-2 py-1 text-xs font-medium text-green-700 flex-shrink-0">
                    <Sparkles className="mr-1 h-3 w-3" /> Fibonacci
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-orange-600 flex-shrink-0" />
                <span className="font-mono truncate">{person.phoneNumber}</span>
              </div>
            </div>
          </div>
          <DeleteDialog person={person} onConfirm={() => onDelete(person)} />
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
  );
}

