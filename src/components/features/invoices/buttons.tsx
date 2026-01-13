"use client";

import { Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { deleteInvoice } from "@/actions";
import { useActionState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CreateInvoice() {
  return (
    <Link
      href="/dashboard/invoices/create"
      className={cn(buttonVariants({ variant: "default" }))}
    >
      <span className="hidden md:block">Create Invoice</span>{" "}
      <Plus className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/invoices/${id}/edit`}
      className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
    >
      <Pencil className="w-5" />
    </Link>
  );
}

export function DeleteInvoice({ id }: { id: string }) {
  const deleteInvoiceWithId = deleteInvoice.bind(null, id);
  const [state, dispatch] = useActionState(deleteInvoiceWithId, undefined);

  return (
    <form action={dispatch}>
      <Button variant="outline" size="icon" type="submit">
        <span className="sr-only">Delete</span>
        <Trash2 className="w-5" />
      </Button>
    </form>
  );
}
