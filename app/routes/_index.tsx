import type { MetaFunction } from "@remix-run/node";
import { ObjectBuilder } from "~/components/ObjectBuilder";
import PageBuilder from "~/components/pageBuilder";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="data-red-500">
      <ObjectBuilder />
    </div>
  );
}
