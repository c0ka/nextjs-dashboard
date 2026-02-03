import fs from "fs";
import path from "path";

export interface DocNavItem {
  title: string;
  href?: string;
  items?: DocNavItem[];
  type: "file" | "folder";
}

function titleCase(str: string) {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function getDocsNav(
  dir: string = "src/content/docs",
  baseRoute: string = "/docs",
): DocNavItem[] {
  const rootDocsDir = path.join(process.cwd(), "src/content/docs");
  const currentFullDir = path.join(process.cwd(), dir);

  if (!fs.existsSync(currentFullDir)) {
    console.error(`Directory not found: ${currentFullDir}`);
    return [];
  }

  const entries = fs.readdirSync(currentFullDir, { withFileTypes: true });

  const nav: DocNavItem[] = entries.flatMap((entry): DocNavItem[] => {
    const entryPath = path.join(dir, entry.name).replace(/\\/g, "/");

    if (entry.isDirectory()) {
      const items = getDocsNav(entryPath, baseRoute);
      if (items.length === 0) return [];
      return [
        {
          title: titleCase(entry.name),
          type: "folder" as const,
          items,
        },
      ];
    }

    if (entry.isFile() && entry.name.endsWith(".mdx")) {
      const fullEntryPath = path.join(process.cwd(), entryPath);
      const relativePath = path
        .relative(rootDocsDir, fullEntryPath)
        .replace(/\\/g, "/");
      const slug = relativePath.replace(/\.mdx$/, "");

      // Special case for root-level "getting-started" to be just "/docs"
      const href =
        slug === "getting-started" ? baseRoute : `${baseRoute}/${slug}`;

      return [
        {
          title: titleCase(entry.name.replace(/\.mdx$/, "")),
          type: "file" as const,
          href,
        },
      ];
    }

    return [];
  });

  // Sorting: files first, then folders. Alphabetical within each.
  return nav.sort((a, b) => {
    if (a.type !== b.type) {
      return a.type === "file" ? -1 : 1;
    }
    return a.title.localeCompare(b.title);
  });
}
