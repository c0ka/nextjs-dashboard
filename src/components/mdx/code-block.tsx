import { codeToHtml } from "shiki";

export async function CodeBlock({
  code,
  lang = "javascript",
}: {
  code: string;
  lang?: string;
}) {
  const html = await codeToHtml(code, {
    lang,
    theme: "github-dark",
  });

  return (
    <div
      className="not-prose my-6 overflow-hidden rounded-lg border border-gray-800 bg-[#24292e] text-sm"
      dangerouslySetInnerHTML={{ __html: html }}
      style={{
        padding: "1rem",
      }}
    />
  );
}
