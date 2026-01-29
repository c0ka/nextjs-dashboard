import Link from "next/link";
import { fetchLatestNews } from "@/services/news";
import { formatDateToLocal } from "@/lib/utils";
import { lusitana } from "@/styles/fonts";
import AcmeLogo from "@/components/ui/acme-logo";

export default async function Page() {
  const latestNews = await fetchLatestNews(10);

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-primary p-4 md:h-52">
        <Link href="/">
          <div className="w-32 text-white md:w-40">
            <AcmeLogo />
          </div>
        </Link>
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-full md:px-20">
          <h1
            className={`${lusitana.className} text-4xl text-gray-800 md:text-6xl md:leading-normal`}
          >
            Company News
          </h1>
          <p className="text-xl text-gray-600 md:text-2xl md:leading-normal">
            Stay updated with the latest announcements and features from Acme
            Corp.
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {latestNews.map((post) => (
          <Link
            key={post.id}
            href={`/news/${post.slug}`}
            className="flex flex-col rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-md"
          >
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>
                {formatDateToLocal(post.published_at || post.created_at)}
              </span>
              <span>•</span>
              <span>{post.author_name}</span>
            </div>
            <h2
              className={`${lusitana.className} mt-4 text-2xl font-semibold text-gray-800`}
            >
              {post.title}
            </h2>
            <p className="mt-4 flex-grow text-gray-600">
              {post.excerpt ||
                (post.content.length > 150
                  ? post.content.substring(0, 150) + "..."
                  : post.content)}
            </p>
            <div className="mt-6 flex items-center text-primary font-medium hover:underline">
              Read more →
            </div>
          </Link>
        ))}
      </div>

      {latestNews.length === 0 && (
        <div className="mt-20 text-center">
          <p className="text-gray-500 text-xl">
            No news stories published yet. Check back soon!
          </p>
        </div>
      )}

      <footer className="mt-20 border-t py-10 text-center text-gray-500">
        <p>&copy; 2026 Acme Corp. All rights reserved.</p>
      </footer>
    </main>
  );
}
