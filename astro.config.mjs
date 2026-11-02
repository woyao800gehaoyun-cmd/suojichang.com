import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: process.env.SITE_URL || 'https://soujichang.com',
  integrations: [sitemap({ filter: page => !/\/(search|404)(\/|\.html|$)/.test(new URL(page).pathname) })],
  trailingSlash: 'always'
});
