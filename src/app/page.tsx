import { Form } from "@/components/form";
import { InfoList } from "@/components/info-list";

export default function Home() {
  return (
    <div className="flex flex-row gap-4 mx-auto max-w-9/12 p-4 mt-24">
      <Form />
      <InfoList />
    </div>
  );
}
