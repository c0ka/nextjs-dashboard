import Pagination from "@/components/ui/pagination";
import Search from "@/components/ui/search";
import NewsTable from "@/components/features/news/table";
import { CreateNews } from "@/components/features/news/buttons";
import { lusitana } from "@/styles/fonts";
import { InvoicesTableSkeleton } from "@/components/ui/skeletons";
import { Suspense } from "react";
import { fetchNewsPages } from "@/services/news";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "News",
};

export default async function Page(prop: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await prop.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchNewsPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Company News</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search news..." />
        <CreateNews />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <NewsTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
