import Table from "@/components/features/customers/table";
import { InvoicesTableSkeleton } from "@/components/ui/skeletons";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="w-full">
      <Suspense fallback={<InvoicesTableSkeleton />}>
        {/* <Table /> */}
      </Suspense>
    </div>
  );
}
