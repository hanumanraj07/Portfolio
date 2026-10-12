import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import { netlifyPlugin } from "@netlify/remix-adapter/plugin";
import jsconfigPaths from "vite-jsconfig-paths";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import rehypeImgSize from "rehype-img-size";
import rehypeSlug from "rehype-slug";
import rehypePrism from "@mapbox/rehype-prism";

export default defineConfig({
  assetsInclude: ["**/*.glb", "**/*.hdr", "**/*.glsl"],
  build: {
    assetsInlineLimit: 1024,
  },
  server: {
    port: 7777,
  },
  plugins: [
    mdx({
      rehypePlugins: [[rehypeImgSize, { dir: "public" }], rehypeSlug, rehypePrism],
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
      providerImportSource: "@mdx-js/react",
    }),
    remix({
      routes(defineRoutes) {
        return defineRoutes((route) => {
          route("/", "routes/home/route.js", { index: true });
          route("/details", "routes/details/route.js");
          route("/skills", "routes/skills/route.js");
          route("/projects", "routes/projects/route.js");
          route("/hackathons", "routes/hackathons/route.js");
          route("/certificates", "routes/certificates/route.js");
          route("/contact", "routes/contact/route.js");
        });
      },
    }),
    netlifyPlugin(),
    jsconfigPaths(),
  ],
});
