import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import yaml from "@rollup/plugin-yaml";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://scout-ch.github.io",
  base: "/it-landscape",
  integrations: [react()],
  vite: {
    plugins: [tailwindcss(), yaml()],
  },
});
