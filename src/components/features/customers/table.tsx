import Image from 'next/image';
import { lusitana } from '@/styles/fonts';
import { fetchFilteredCustomers } from '@/services/data';
import { UpdateCustomer, DeleteCustomer } from '@/components/features/customers/buttons';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';

export default async function CustomersTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const customers = await fetchFilteredCustomers(query, currentPage);

  return (
    <div className="mt-6">
      <div className="md:hidden">
        {customers?.map((customer) => (
          <Card key={customer.id} className="mb-4">
            <CardContent className="p-4">
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-3">
                  <Image
                    src={customer.image_url}
                    className="rounded-full"
                    alt={`${customer.name}'s profile picture`}
                    width={32}
                    height={32}
                  />
                  <div>
                    <p className="font-medium">{customer.name}</p>
                    <p className="text-sm text-muted-foreground">{customer.email}</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 py-4 border-b">
                <div>
                  <p className="text-xs text-muted-foreground">Pending</p>
                  <p className="font-medium">{customer.total_pending}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Paid</p>
                  <p className="font-medium">{customer.total_paid}</p>
                </div>
              </div>
              <div className="pt-4 flex items-center justify-between">
                <p className="text-sm">{customer.total_invoices} invoices</p>
                <div className="flex justify-end gap-2">
                  <UpdateCustomer id={customer.id} />
                  <DeleteCustomer id={customer.id} />
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
              <TableHead className="pl-6">Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Total Invoices</TableHead>
              <TableHead>Total Pending</TableHead>
              <TableHead>Total Paid</TableHead>
              <TableHead className="text-right pr-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="pl-6 py-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src={customer.image_url}
                      className="rounded-full"
                      alt={`${customer.name}'s profile picture`}
                      width={28}
                      height={28}
                    />
                    <p>{customer.name}</p>
                  </div>
                </TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.total_invoices}</TableCell>
                <TableCell>{customer.total_pending}</TableCell>
                <TableCell>{customer.total_paid}</TableCell>
                <TableCell className="text-right pr-6">
                  <div className="flex justify-end gap-2">
                    <UpdateCustomer id={customer.id} />
                    <DeleteCustomer id={customer.id} />
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
