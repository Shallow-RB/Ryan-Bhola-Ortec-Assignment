import { UserPlus2 } from "lucide-react";
import { Form } from "./form";

export function AddUserCard() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
        <div className="mb-4 flex items-center gap-3 flex-shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-300 to-emerald-700">
            <UserPlus2 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Add User</h3>
            <p className="text-sm text-gray-600">Create a new entry</p>
          </div>
        </div>
        <div className="flex-1 min-h-0">
          <Form />
        </div>
      </div>
    </div>
  );
}
