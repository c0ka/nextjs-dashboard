import { fetchNewsBySlug } from "@/services/news";
import { notFound } from "next/navigation";
import { formatDateToLocal } from "@/lib/utils";
import { lusitana } from "@/styles/fonts";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { components } from "@/components/mdx";

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const post = await fetchNewsBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="mt-10 mx-auto max-w-3xl w-full">
        <Link
          href="/news"
          className="text-primary hover:underline mb-8 inline-block"
        >
          ← Back to News
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <span>
              {formatDateToLocal(post.published_at || post.created_at)}
            </span>
            <span>•</span>
            <span>{post.author_name}</span>
          </div>
          <h1
            className={`${lusitana.className} text-4xl font-bold text-gray-900 md:text-5xl`}
          >
            {post.title}
          </h1>
        </header>

        <div className="mt-10">
          <MDXRemote source={post.content} components={components} />
        </div>

        <footer className="mt-20 border-t pt-10 mb-20">
          <div className="bg-gray-50 rounded-lg p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold">
              {post.author_name.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-gray-900">{post.author_name}</p>
              <p className="text-gray-500 text-sm">
                Author, Acme Corp Newsroom
              </p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
