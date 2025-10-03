import { UserSearch } from "lucide-react";
import { PeopleTable } from "./people-table";

export function UserDirectoryCard() {
  return (
    <div className="flex flex-col">
      <div className="flex max-h-[700px] flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
        <div className="mb-4 flex items-center gap-3 flex-shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600">
            <UserSearch className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              User Directory
            </h3>
            <p className="text-sm text-gray-600">View and manage all users</p>
          </div>
        </div>
        <div className="flex-1 min-h-0 flex">
          <PeopleTable />
        </div>
      </div>
    </div>
  );
}
