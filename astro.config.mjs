import { defineConfig } from 'astro/config';
import yaml from '@rollup/plugin-yaml';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: 'https://scout-ch.github.io',
  base: '/it-landscape',
  integrations: [tailwind(), react()],
  vite: {
    plugins: [yaml()]
  }
});
