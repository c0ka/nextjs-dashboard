import { Markdown, CodeBlock } from "@/components/ui/markdown";
import { MDXRemote } from "next-mdx-remote/rsc";
import fs from "fs";
import path from "path";
import { lusitana } from "@/styles/fonts";
import Link from "next/link";
import AcmeLogo from "@/components/ui/acme-logo";
import { getDocsNav, type DocNavItem } from "@/lib/docs-nav";

function NavList({
  items,
  isRoot = false,
}: {
  items: DocNavItem[];
  isRoot?: boolean;
}) {
  return (
    <ul className={isRoot ? "space-y-6" : "mt-2 space-y-1"}>
      {items.map((item) => (
        <li key={item.title + (item.href || "")}>
          {item.type === "folder" ? (
            <div className="mt-4 first:mt-0">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">
                {item.title}
              </h3>
              <div className="border-l border-gray-100 ml-2 pl-2">
                {item.items && <NavList items={item.items} />}
              </div>
            </div>
          ) : (
            <Link
              href={item.href!}
              className="text-sm text-gray-600 hover:text-primary transition-colors block py-1 px-2 rounded-md hover:bg-gray-50"
            >
              {item.title}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const slug = params.slug?.join("/") || "getting-started";
  const filePath = path.join(process.cwd(), "src/content/docs", `${slug}.mdx`);
  const rawNav = getDocsNav();

  // Wrap root files in an "Introduction" group if they aren't already grouped
  const rootFiles = rawNav.filter((n) => n.type === "file");
  const folders = rawNav.filter((n) => n.type === "folder");

  const navItems: DocNavItem[] = [];
  if (rootFiles.length > 0) {
    navItems.push({
      title: "Introduction",
      type: "folder",
      items: rootFiles,
    });
  }
  navItems.push(...folders);

  if (!fs.existsSync(filePath)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-gray-900">
          Documentation segment "{slug}" not found
        </h1>
        <Link
          href="/docs"
          className="mt-4 text-primary hover:underline font-medium"
        >
          Go back to docs
        </Link>
      </div>
    );
  }

  const content = fs.readFileSync(filePath, "utf-8");

  return (
    <main className="flex min-h-screen flex-row">
      {/* Sidebar */}
      <aside className="w-64 flex-none border-r bg-gray-50/50 p-6 hidden md:block overflow-y-auto">
        <Link href="/" className="flex items-center gap-2 mb-10">
          <AcmeLogo />
        </Link>
        <nav>
          <NavList items={navItems} isRoot={true} />
        </nav>
      </aside>

      {/* Content */}
      <div className="flex-grow p-10 max-w-4xl mx-auto">
        <div className="md:hidden mb-6">
          <Link href="/">
            <AcmeLogo />
          </Link>
        </div>

        <article className="markdown-container">
          <MDXRemote
            source={content}
            components={{
              h1: (props) => (
                <h1
                  className={`${lusitana.className} text-4xl font-bold mb-6 text-gray-900 border-b pb-4`}
                  {...props}
                />
              ),
              h2: (props) => (
                <h2
                  className={`${lusitana.className} text-2xl font-semibold mt-12 mb-4 text-gray-800 flex items-center gap-2`}
                  {...props}
                />
              ),
              code: (props: any) => {
                const { children, className } = props;
                const match = /language-(\w+)/.exec(className || "");
                if (match) {
                  return (
                    <div className="my-6">
                      <CodeBlock
                        code={String(children).trim()}
                        lang={match[1]}
                      />
                    </div>
                  );
                }
                return (
                  <code
                    className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-pink-600"
                    {...props}
                  />
                );
              },
              p: (props) => (
                <p
                  className="mb-4 text-gray-700 leading-relaxed text-lg"
                  {...props}
                />
              ),
              ul: (props) => (
                <ul
                  className="list-disc pl-6 mb-6 space-y-2 text-gray-700"
                  {...props}
                />
              ),
              ol: (props) => (
                <ol
                  className="list-decimal pl-6 mb-6 space-y-2 text-gray-700"
                  {...props}
                />
              ),
              li: (props) => <li className="pl-1" {...props} />,
              blockquote: (props) => (
                <blockquote
                  className="border-l-4 border-primary bg-blue-50/50 p-6 italic my-8 rounded-r-lg text-gray-700 shadow-sm"
                  {...props}
                />
              ),
              table: (props) => (
                <div className="overflow-x-auto my-8">
                  <table
                    className="min-w-full border-collapse border border-gray-200"
                    {...props}
                  />
                </div>
              ),
              th: (props) => (
                <th
                  className="border border-gray-200 bg-gray-50 px-4 py-2 text-left font-bold"
                  {...props}
                />
              ),
              td: (props) => (
                <td className="border border-gray-200 px-4 py-2" {...props} />
              ),
            }}
          />
        </article>
      </div>
    </main>
  );
}
