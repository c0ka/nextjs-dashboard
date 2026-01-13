import Image from 'next/image';
import { UpdateInvoice, DeleteInvoice } from '@/components/features/invoices/buttons';
import InvoiceStatus from '@/components/features/invoices/status';
import { formatDateToLocal, formatCurrency } from '@/lib/utils';
import { fetchFilteredInvoices } from '@/services/data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const invoices = await fetchFilteredInvoices(query, currentPage);

  return (
    <div className="mt-6">
      <div className="md:hidden">
        {invoices?.map((invoice) => (
          <Card key={invoice.id} className="mb-4">
            <CardContent className="p-4">
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-3">
                  <Image
                    src={invoice.image_url}
                    className="rounded-full"
                    width={32}
                    height={32}
                    alt={`${invoice.name}'s profile picture`}
                  />
                  <div>
                    <p className="font-medium">{invoice.name}</p>
                    <p className="text-sm text-muted-foreground">{invoice.email}</p>
                  </div>
                </div>
                <InvoiceStatus status={invoice.status} />
              </div>
              <div className="flex w-full items-center justify-between pt-4">
                <div>
                  <p className="text-xl font-medium">
                    {formatCurrency(invoice.amount)}
                  </p>
                  <p className="text-sm text-muted-foreground">{formatDateToLocal(invoice.date)}</p>
                </div>
                <div className="flex justify-end gap-2">
                  <UpdateInvoice id={invoice.id} />
                  <DeleteInvoice id={invoice.id} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="hidden md:block overflow-hidden rounded-lg border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-6">Customer</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right pr-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices?.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="pl-6 py-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src={invoice.image_url}
                      className="rounded-full"
                      width={28}
                      height={28}
                      alt={`${invoice.name}'s profile picture`}
                    />
                    <p>{invoice.name}</p>
                  </div>
                </TableCell>
                <TableCell>{invoice.email}</TableCell>
                <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                <TableCell>{formatDateToLocal(invoice.date)}</TableCell>
                <TableCell>
                  <InvoiceStatus status={invoice.status} />
                </TableCell>
                <TableCell className="text-right pr-6">
                  <div className="flex justify-end gap-2">
                    <UpdateInvoice id={invoice.id} />
                    <DeleteInvoice id={invoice.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
