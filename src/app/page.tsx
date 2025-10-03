import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { AddUserCard } from "@/components/add-user-card";
import { UserDirectoryCard } from "@/components/user-directory-card";

export default function Home() {
  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col overflow-hidden">
      <Header />

      <main className="flex-1 flex items-center justify-center p-6 min-h-0 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto">
          <HeroSection />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 max-h-[900px]">
            <AddUserCard />
            <UserDirectoryCard />
          </div>
        </div>
      </main>
    </div>
  );
}
