import { Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { deleteNewsPost } from "@/actions/news";

export function CreateNews() {
  return (
    <Link
      href="/dashboard/news/create"
      className="flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create News</span>{" "}
      <Plus className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateNews({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/news/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <Pencil className="w-5" />
    </Link>
  );
}

export function DeleteNews({ id }: { id: string }) {
  const deleteNewsWithId = deleteNewsPost.bind(null, id);

  return (
    <form action={deleteNewsWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <Trash2 className="w-5" />
      </button>
    </form>
  );
}
