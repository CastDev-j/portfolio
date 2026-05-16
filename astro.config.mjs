// @ts-check
import { defineConfig, fontProviders, passthroughImageService } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()],

  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Roboto',
      cssVariable: '--font-main',
      styles: ["normal"]
    }
  ],

  i18n: {
    locales: ["es", "en"],
    defaultLocale: "es",
  },

  adapter: cloudflare()
});