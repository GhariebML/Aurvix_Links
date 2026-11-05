import { defineConfig } from 'astro/config';

export default defineConfig({
  // Used for the canonical URL and the social preview image. Change it if the domain changes.
  site: 'https://aurvix-links.vercel.app',
  output: 'static',
  devToolbar: { enabled: false },
});
