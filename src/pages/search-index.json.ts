import { getSearchIndex } from '../lib/search-index';
export async function GET() {
  return new Response(JSON.stringify(await getSearchIndex()), { headers: { 'Content-Type':'application/json; charset=utf-8' } });
}
