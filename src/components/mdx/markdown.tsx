import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CodeBlock } from "./code-block";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Markdown({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "prose prose-blue max-w-none prose-headings:font-bold prose-a:text-primary prose-pre:bg-transparent prose-pre:p-0",
        className,
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || "");
            const code = String(children).replace(/\n$/, "");

            if (!inline && match) {
              return <CodeBlock code={code} lang={match[1]} />;
            }

            return (
              <code
                className={cn(
                  "rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-pink-600",
                  className,
                )}
                {...props}
              >
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
