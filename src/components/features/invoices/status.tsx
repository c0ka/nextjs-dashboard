import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import { Badge } from '@/components/ui/badge';

export default function InvoiceStatus({ status }: { status: string }) {
  return (
    <>
      {status === 'pending' && (
        <Badge variant="outline" className="bg-muted/50 text-muted-foreground border-transparent">
          Pending
          <ClockIcon className="ml-1 w-4" />
        </Badge>
      )}
      {status === 'paid' && (
        <Badge variant="success">
          Paid
          <CheckIcon className="ml-1 w-4" />
        </Badge>
      )}
    </>
  );
}
