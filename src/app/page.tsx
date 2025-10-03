import { Form } from "@/components/form";
import { PeopleTable } from "@/components/people-table";
import { Users, UserPlus2, UserSearch } from "lucide-react";

export default function Home() {
  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col overflow-hidden">
      {/* Header */}
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

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6 min-h-0 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Manage Your Users
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Add users with their contact information and enjoy a random joke
              for each entry.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 max-h-[900px]">
            {/* Add Person Card */}
            <div className="flex flex-col">
              <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
                <div className="mb-4 flex items-center gap-3 flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-300 to-emerald-700">
                    <UserPlus2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Add User
                    </h3>
                    <p className="text-sm text-gray-600">Create a new entry</p>
                  </div>
                </div>
                <div className="flex-1 min-h-0">
                  <Form />
                </div>
              </div>
            </div>

            {/* People List Card */}
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
                    <p className="text-sm text-gray-600">
                      View and manage all users
                    </p>
                  </div>
                </div>
                <div className="flex-1 min-h-0 flex">
                  <PeopleTable />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
