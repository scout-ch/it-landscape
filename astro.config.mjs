import { defineConfig } from 'astro/config';
import yaml from '@rollup/plugin-yaml';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  vite: {
    plugins: [yaml()]
  }
});
