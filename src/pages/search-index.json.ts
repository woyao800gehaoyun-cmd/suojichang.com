import { getCollection } from 'astro:content';
import { topicGroups, topicArticle } from '../data/site';
export async function GET() {
  const articles = await getCollection('articles');
  const topicTerms = topicGroups.flatMap(g => g.terms.map(term => ({ term, article: topicArticle(term,g.article) })));
  return new Response(JSON.stringify(articles.map(a => ({ id:a.id, text:[a.data.title, a.data.description, ...a.data.keywords, a.body || '', ...topicTerms.filter(t => t.article === a.id).map(t => t.term)].join(' ') }))), { headers: { 'Content-Type':'application/json; charset=utf-8' } });
}
