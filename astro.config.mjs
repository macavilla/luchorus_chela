// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://macavilla.github.io",
  base: "/luchorus_chela/",
  vite: {
    define: {
      global: "window",
    },
  },
  integrations: [react()],
});
