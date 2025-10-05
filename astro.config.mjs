// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  vite: {
    define: {
      global: "window",
    },
  },
  integrations: [react()],
});
