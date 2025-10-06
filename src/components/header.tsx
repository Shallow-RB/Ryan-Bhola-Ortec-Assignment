import { Users } from "lucide-react";

export function Header() {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm flex-shrink-0">
      <div className="mx-auto max-w-6xl px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-blue-600">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Ortec</h1>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

