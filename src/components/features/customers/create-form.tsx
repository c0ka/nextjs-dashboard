"use client";

import Link from "next/link";
import {
  CircleUser,
  AtSign,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { createCustomer, State } from "@/actions";
import { useActionState } from "react";

export default function Form() {
  const initialState: State = {
    message: "",
    errors: {},
  };
  const [state, formAction] = useActionState(createCustomer, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <div className="relative">
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter name"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="name-error"
            />
            <CircleUser className="pointer-events-none absolute left-3 top-1/2 size-4.5 -translate-y-1/2 text-gray-500" />
          </div>
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Customer Email */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <div className="relative">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter email"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="email-error"
            />
            <AtSign className="pointer-events-none absolute left-3 top-1/2 size-4.5 -translate-y-1/2 text-gray-500" />
          </div>
          <div id="email-error" aria-live="polite" aria-atomic="true">
            {state.errors?.email &&
              state.errors.email.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Image URL */}
        <div className="mb-4">
          <label htmlFor="imageUrl" className="mb-2 block text-sm font-medium">
            Image URL
          </label>
          <div className="relative">
            <input
              id="imageUrl"
              name="imageUrl"
              type="text"
              placeholder="Enter image URL"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="imageUrl-error"
            />
            <ImageIcon className="pointer-events-none absolute left-3 top-1/2 size-4.5 -translate-y-1/2 text-gray-500" />
          </div>
          <div id="imageUrl-error" aria-live="polite" aria-atomic="true">
            {state.errors?.imageUrl &&
              state.errors.imageUrl.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/customers"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Customer</Button>
      </div>
    </form>
  );
}
