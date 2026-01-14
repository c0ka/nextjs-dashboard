"use client";

import { CustomerField } from "@/types";
import Link from "next/link";
import {
  Check,
  Clock,
  DollarSign,
  CircleUser,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { createInvoice, State } from "@/actions";
import { useActionState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function Form({ customers }: { customers: CustomerField[] }) {
  const initialState: State = {
    message: null,
    errors: {},
  };
  const [state, formAction] = useActionState(createInvoice, initialState);

  return (
    <form action={formAction}>
      <Card>
        <CardContent className="pt-6">
          {/* Customer Name */}
          <div className="mb-4">
            <Label htmlFor="customer" className="mb-2 block">
              Choose customer
            </Label>
            <div className="relative">
              <select
                id="customer"
                name="customerId"
                className="peer block w-full cursor-pointer rounded-md border border-input bg-background py-2 pl-10 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all"
                defaultValue=""
                aria-describedby="customer-error"
              >
                <option value="" disabled>
                  Select a customer
                </option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
              <CircleUser className="pointer-events-none absolute left-3 top-1/2 size-4.5 -translate-y-1/2 text-muted-foreground" />
            </div>
            <div id="customer-error" aria-live="polite" aria-atomic="true">
              {state.errors?.customerId &&
                state.errors.customerId.map((error) => (
                  <p className="mt-1 text-xs text-destructive" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>

          {/* Invoice Amount */}
          <div className="mb-4">
            <Label htmlFor="amount" className="mb-2 block">
              Choose an amount
            </Label>
            <div className="relative">
              <Input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                placeholder="Enter USD amount"
                className="pl-10"
                aria-describedby="amount-error"
              />
              <DollarSign className="pointer-events-none absolute left-3 top-1/2 size-4.5 -translate-y-1/2 text-muted-foreground peer-focus:text-foreground" />
            </div>
            <div id="amount-error" aria-live="polite" aria-atomic="true">
              {state.errors?.amount &&
                state.errors.amount.map((error) => (
                  <p className="mt-1 text-xs text-destructive" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>

          {/* Invoice Status */}
          <fieldset>
            <legend className="mb-2 block text-sm font-medium">
              Set the invoice status
            </legend>
            <div className="flex gap-4 rounded-md border border-input bg-background p-3">
              <div className="flex items-center space-x-2">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  className="h-4 w-4 cursor-pointer border-input text-primary focus:ring-primary"
                  aria-describedby="status-error"
                />
                <Label
                  htmlFor="pending"
                  className="flex cursor-pointer items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/80 peer-checked:bg-primary peer-checked:text-primary-foreground"
                >
                  Pending <Clock className="h-4 w-4" />
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  id="paid"
                  name="status"
                  type="radio"
                  value="paid"
                  className="h-4 w-4 cursor-pointer border-input text-primary focus:ring-primary"
                  aria-describedby="status-error"
                />
                <Label
                  htmlFor="paid"
                  className="flex cursor-pointer items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/80 peer-checked:bg-green-500 peer-checked:text-white"
                >
                  Paid <Check className="h-4 w-4" />
                </Label>
              </div>
            </div>
            <div id="status-error" aria-live="polite" aria-atomic="true">
              {state.errors?.status &&
                state.errors.status.map((error) => (
                  <p className="mt-1 text-xs text-destructive" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </fieldset>
        </CardContent>
      </Card>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className={cn(buttonVariants({ variant: "ghost" }))}
        >
          Cancel
        </Link>
        <Button type="submit">Create Invoice</Button>
      </div>
    </form>
  );
}
