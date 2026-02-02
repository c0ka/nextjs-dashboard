import type { MDXComponents } from "mdx/types";
import { lusitana } from "@/styles/fonts";
import { CodeBlock } from "./code-block";

export { CodeBlock };
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";

export const components: MDXComponents = {
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
  p: (props) => (
    <p className="mb-4 text-gray-700 leading-relaxed text-lg" {...props} />
  ),
  ul: (props) => (
    <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700" {...props} />
  ),
  ol: (props) => (
    <ol className="list-decimal pl-6 mb-6 space-y-2 text-gray-700" {...props} />
  ),
  li: (props) => <li className="pl-1" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="border-l-4 border-primary bg-blue-50/50 p-6 italic my-8 rounded-r-lg text-gray-700 shadow-sm"
      {...props}
    />
  ),
  code: (props: any) => {
    const { children, className } = props;
    const match = /language-(\w+)/.exec(className || "");
    if (match) {
      return <CodeBlock code={String(children).trim()} lang={match[1]} />;
    }
    return (
      <code
        className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-pink-600"
        {...props}
      />
    );
  },
  // Table support
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
  td: (props) => <td className="border border-gray-200 px-4 py-2" {...props} />,
  // Custom Components
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
};
