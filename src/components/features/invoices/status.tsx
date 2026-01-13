import { Check, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function InvoiceStatus({ status }: { status: string }) {
  return (
    <>
      {status === 'pending' && (
        <Badge variant="outline" className="bg-muted/50 text-muted-foreground border-transparent">
          Pending
          <Clock className="ml-1 w-4" />
        </Badge>
      )}
      {status === 'paid' && (
        <Badge variant="success">
          Paid
          <Check className="ml-1 w-4" />
        </Badge>
      )}
    </>
  );
}
