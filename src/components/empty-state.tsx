import { User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { type EmptyStateProps } from "@/types";

export function EmptyState({
  message = "No people found",
  description = "Try adjusting your search or add someone new",
}: EmptyStateProps) {
  return (
    <Card className="border-dashed w-full">
      <CardContent className="flex flex-col w-full items-center justify-center py-12">
        <User className="h-12 w-12 text-muted-foreground/50 mb-4" />
        <p className="text-muted-foreground">{message}</p>
        <p className="text-sm text-muted-foreground/70">{description}</p>
      </CardContent>
    </Card>
  );
}

