import Image from "next/image";
import { UpdateNews, DeleteNews } from "@/components/features/news/buttons";
import NewsStatus from "@/components/features/news/status";
import { formatDateToLocal } from "@/lib/utils";
import { fetchFilteredNews } from "@/services/news";

export default async function NewsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const news = await fetchFilteredNews(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {news?.map((post) => (
              <div
                key={post.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{post.title}</p>
                    </div>
                    <p className="text-sm text-gray-500">{post.author_name}</p>
                  </div>
                  <NewsStatus status={post.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatDateToLocal(post.created_at)}
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateNews id={post.id} />
                    <DeleteNews id={post.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Title
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Author
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-3 pr-6">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {news?.map((post) => (
                <tr
                  key={post.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{post.title}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {post.author_name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(post.created_at)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <NewsStatus status={post.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-3 pr-6">
                    <div className="flex justify-end gap-3">
                      <UpdateNews id={post.id} />
                      <DeleteNews id={post.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
