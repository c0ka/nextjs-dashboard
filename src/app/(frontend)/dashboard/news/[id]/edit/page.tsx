import Form from "@/components/features/news/edit-form";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { fetchNewsById } from "@/services/news";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit News",
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const post = await fetchNewsById(id);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "News", href: "/dashboard/news" },
          {
            label: "Edit News",
            href: `/dashboard/news/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form post={post} />
    </main>
  );
}
