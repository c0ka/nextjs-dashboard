import Form from "@/components/features/customers/create-form";
import Breadcrumbs from "@/components/ui/breadcrumbs";

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Customers", href: "/dashboard/customers" },
          {
            label: "Create Customer",
            href: "/dashboard/customers/create",
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
