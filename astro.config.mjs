// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Where the site is published. GitHub Pages serves this repo from a sub-folder
  // (https://sspandit14.github.io/blogborne/), so every internal link needs the
  // "/blogborne" prefix — see url() in src/site.ts.
  // On a custom domain later: set site to the domain and base to "/".
  site: 'https://sspandit14.github.io',
  base: '/blogborne',
});
