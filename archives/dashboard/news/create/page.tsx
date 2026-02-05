import Form from "@/components/features/news/create-form";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create News",
};

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "News", href: "/dashboard/news" },
          {
            label: "Create News",
            href: "/dashboard/news/create",
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
