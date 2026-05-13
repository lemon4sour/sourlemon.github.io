// @ts-check
import { defineConfig } from "astro/config";
import remarkMedia from "./remark-media";

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  site: "https://lemon4sour.github.io",
  integrations: [preact()],
  markdown: {
    remarkPlugins: [remarkMedia],
  },
});
