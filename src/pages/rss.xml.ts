import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { siteName, tagline } from '../data/site';
import type { APIContext } from 'astro';
export async function GET(context: APIContext) {
  const articles = (await getCollection('articles')).sort((a,b) => +b.data.published - +a.data.published);
  return rss({ title: siteName, description: tagline, site: context.site!, items: articles.map(a => ({ title: a.data.title, description: a.data.description, pubDate: a.data.published, link:`/articles/${a.id}/` })), customData:'<language>zh-CN</language>' });
}
