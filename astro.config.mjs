import { defineConfig } from 'astro/config';
import yaml from '@rollup/plugin-yaml';
import react from "@astrojs/react";
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://scout-ch.github.io',
  base: '/it-landscape',
  integrations: [react()],
  vite: {
    plugins: [yaml(), tailwindcss()],
  }
});
