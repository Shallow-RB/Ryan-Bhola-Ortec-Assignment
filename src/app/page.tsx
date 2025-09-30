import { Form } from "@/components/form";
import { InfoList } from "@/components/info-list";

export default function Home() {
  return (
    <div className="flex flex-row gap-4 mx-auto max-w-9/12 p-4 mt-24">
      <div className="w-1/2 border border-gray-200 rounded-xl p-5 bg-[var(--panel)] shadow-sm">
        <Form />
      </div>
      <div className="w-1/2 border border-gray-200 rounded-xl p-5 bg-[var(--panel)] shadow-sm">
        <InfoList />
      </div>
    </div>
  );
}
