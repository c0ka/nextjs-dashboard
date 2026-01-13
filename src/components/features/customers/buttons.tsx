"use client";

import { Plus, Pencil, Trash2 } from "lucide-react"
import Link from "next/link";
import { deleteCustomer } from "@/actions";
import { useActionState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CreateCustomer() {
  return (
    <Link
      href="/dashboard/customers/create"
      className={cn(buttonVariants({ variant: "default" }))}
    >
      <span className="hidden md:block">Create Customer</span>{" "}
      <Plus />
    </Link>
  );
}

export function UpdateCustomer({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/customers/${id}/edit`}
      className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
    >
      <Pencil />
    </Link>
  );
}

export function DeleteCustomer({ id }: { id: string }) {
  const deleteCustomerWithId = deleteCustomer.bind(null, id);
  const [state, dispatch] = useActionState(deleteCustomerWithId, { message: "" });

  return (
    <form action={dispatch}>
      <Button variant="outline" size="icon" type="submit">
        <span className="sr-only">Delete</span>
        <Trash2 />
      </Button>
    </form>
  );
}

