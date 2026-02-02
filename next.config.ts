import type { NextConfig } from "next";
import createMdx from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  typescript: {
    ignoreBuildErrors: true,
  },
};

const withMdx = createMdx({
  options: {
    remarkPlugins: ["remark-gfm"],
  },
});

export default withMdx(nextConfig);
