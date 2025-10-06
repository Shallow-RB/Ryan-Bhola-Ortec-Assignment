import { User, Phone, Quote } from "lucide-react";

interface PersonInfoProps {
  person: {
    firstName: string;
    phoneNumber: string;
    joke?: string;
  };
  showJoke?: boolean;
  variant?: "default" | "compact";
}

export function PersonInfo({
  person,
  showJoke = true,
  variant = "default",
}: PersonInfoProps) {
  const isCompact = variant === "compact";

  return (
    <div className={`flex items-center gap-3 ${isCompact ? "min-w-0" : ""}`}>
      <div
        className={`flex items-center justify-center rounded-full bg-blue-100 ${
          isCompact ? "h-8 w-8" : "h-10 w-10"
        }`}
      >
        <User
          className={`text-blue-600 ${isCompact ? "h-4 w-4" : "h-5 w-5"}`}
        />
      </div>
      <div className={`flex-1 ${isCompact ? "min-w-0" : ""}`}>
        <h3
          className={`font-medium text-gray-900 ${isCompact ? "truncate" : ""}`}
        >
          {person.firstName}
        </h3>
        <div
          className={`flex items-center gap-2 text-gray-600 ${
            isCompact ? "text-sm" : "text-sm"
          }`}
        >
          <Phone
            className={`text-orange-600 flex-shrink-0 ${
              isCompact ? "h-3 w-3" : "h-4 w-4"
            }`}
          />
          <span className={`font-mono ${isCompact ? "truncate" : ""}`}>
            {person.phoneNumber}
          </span>
        </div>
        {showJoke && person.joke && (
          <div
            className={`mt-3 pt-3 border-t border-gray-200 ${
              isCompact ? "hidden" : ""
            }`}
          >
            <div className="flex items-start gap-2">
              <Quote className="mt-0.5 h-4 w-4 text-gray-400 flex-shrink-0" />
              <p className="text-sm text-gray-600 italic leading-relaxed line-clamp-2">
                &ldquo;{person.joke}&rdquo;
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

