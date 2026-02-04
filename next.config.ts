import type { NextConfig } from "next";
import createMdx from "@next/mdx";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  typescript: {
    // ignoreBuildErrors: true,
  },
};

const withMdx = createMdx({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: ["remark-gfm"],
  },
});

export default withPayload(withMdx(nextConfig));
