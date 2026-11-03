import { readdir, readFile, access } from 'node:fs/promises';
import { resolve, relative, sep } from 'node:path';
import { topicGroups, siteName } from '../src/data/site.ts';
import { providers } from '../src/data/providers.ts';
import { aiTools, clients, scenarios, questions, guideIds } from '../src/data/hubs.ts';
import { primaryNavigation } from '../src/data/navigation.ts';
import { aiCategories, directoryTools } from '../src/data/ai-directory.ts';

const root = resolve('dist');
const errors = [];
const check = (condition, message) => { if (!condition) errors.push(message); };
const files = [];
async function walk(dir) { for (const entry of await readdir(dir,{withFileTypes:true})) { const path = resolve(dir,entry.name); if(entry.isDirectory()) await walk(path); else files.push(path); } }
await walk(root);
const htmlFiles = files.filter(f => f.endsWith('.html'));
const source = new Map(await Promise.all(htmlFiles.map(async f => [f,await readFile(f,'utf8')])));
const texts = new Map();
const titles = new Set();
const descriptions = new Set();
const existing = new Set(files);
let internalLinks = 0;
let articleCount = 0;
let origin = '';
for (const [file, html] of source) {
  const route = '/' + relative(root,file).split(sep).join('/').replace(/index\.html$/,'');
  const text = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,'').replace(/<[^>]*>/g,' ');
  texts.set(file,text);
  check(/<style(?:\s[^>]*)?>[\s\S]{1000,}?<\/style>/.test(html),`${route}: 缺少不依赖 JavaScript 的内联站点样式`);
  check(html.includes('class="brand-mark"'),`${route}: 缺少内嵌品牌图标`);
  check((html.match(/<h1\b/g) || []).length === 1,`${route}: 必须恰好有一个 H1`);
  for(const oldBrand of ['二猫云','宇宙云','光速云','暮光网络','星岛梦']) check(!text.includes(oldBrand),`${route}: 仍包含已撤下的推荐 ${oldBrand}`);
  const title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1];
  const description = html.match(/<meta\s+name="description"\s+content="([^"]*)"/)?.[1];
  const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/)?.[1];
  check(Boolean(title),`${route}: 缺少 title`);
  check(title?.includes(siteName),`${route}: 标题未使用当前站名`);
  check(Boolean(description),`${route}: 缺少 description`);
  check(!titles.has(title),`${route}: 标题重复`);
  check(!descriptions.has(description),`${route}: 描述重复`);
  titles.add(title); descriptions.add(description);
  if(canonical) { const url = new URL(canonical); origin ||= url.origin; check(url.origin === origin,`${route}: canonical 域名不一致`); check(url.pathname === route || route === '/404.html',`${route}: canonical 路径错误 ${url.pathname}`); } else errors.push(`${route}: 缺少 canonical`);
  const schemas = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(match => {try{return JSON.parse(match[1]);}catch{errors.push(`${route}: 结构化数据不是有效 JSON`);return {};}});
  if(/^\/articles\/.+\/$/.test(route)) {
    articleCount++;
    const schema = schemas.find(s=>s['@type']==='BlogPosting');
    check(Boolean(schema),`${route}: 缺少 BlogPosting`);
    check(Boolean(schemas.find(s=>s['@type']==='BreadcrumbList')),`${route}: 缺少 BreadcrumbList`);
    if(schema) {check(!Number.isNaN(Date.parse(schema.datePublished)),`${route}: 发布日期无效`);check(Date.parse(schema.dateModified)>=Date.parse(schema.datePublished),`${route}: 修订日期早于发布`);check(schema.url===canonical,`${route}: 结构化数据 URL 不一致`);}
  }
  for (const match of html.matchAll(/\b(href|src)="([^"]*)"/g)) {
    const value = match[2].replaceAll('&amp;','&');
    if(!value || /^(https?:|data:|mailto:|tel:|javascript:)/.test(value)) continue;
    const url = new URL(value,`https://local.test${route}`);
    if(url.origin !== 'https://local.test') continue;
    const path = decodeURIComponent(url.pathname);
    let target = resolve(root,'.' + path);
    check(target === root || target.startsWith(root+sep),`${route}: 资源路径越界`);
    if(path.endsWith('/')) target=resolve(target,'index.html');
    else if(!existing.has(target) && existing.has(resolve(target,'index.html'))) target=resolve(target,'index.html');
    internalLinks++;
    check(existing.has(target),`${route}: 链接或资源不存在 ${value}`);
    if(url.hash && source.has(target)) {
      const id = decodeURIComponent(url.hash.slice(1));
      const ids = [...source.get(target).matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
      check(ids.includes(id),`${route}: 锚点不存在 ${value}`);
    }
  }
}
const topicHtml = source.get(resolve(root,'topics/index.html')) || '';
const homepage = source.get(resolve(root,'index.html')) || '';
const brandPage = source.get(resolve(root,'brands/index.html')) || '';
check(providers.map(p=>p.id).join(',')==='guangnianti,shunyun,jilianyun,yuntu,edge-nodes,bianjieyun,kunpeng' && providers[0].id==='guangnianti' && providers[0].featured,'推荐区必须按七家指定顺序展示且光年梯为首位主推');
for(const provider of providers) {
  const review = source.get(resolve(root,`articles/${provider.article}/index.html`)) || '';
  for(const [label,page] of [['首页',homepage],['品牌页',brandPage],['测评页',review]]) {
    check(page.includes(`href="${provider.entry}"`),`${label}: ${provider.name}推广地址不完整`);
    check(page.includes(provider.coupon || ('couponStatus' in provider ? provider.couponStatus : '暂无')),`${label}: ${provider.name}优惠码缺失`);
  }
  check(review.includes('sponsored noopener noreferrer'),`${provider.name}: 推广入口缺少关系标记`);
}
for(const oldSlug of ['ermaoyun-guide','yuzhouyun-guide','guangsu-guide','muguang-guide','xingdaomeng-guide']) check(!sourcemapHas(oldSlug),`旧推荐文章仍在产物中 ${oldSlug}`);
function sourcemapHas(slug) { return source.has(resolve(root,`articles/${slug}/index.html`)); }
for(const id of ['popular-questions','recommendations','scenarios','ai-tools','beginner-guides','client-tutorials','troubleshooting','latest','deep-guides']) check(homepage.includes(`id="${id}"`),`首页板块缺失 ${id}`);
for(const item of [...providers,...aiTools,...clients,...scenarios,...questions]) check(source.has(resolve(root,`articles/${item.article}/index.html`)),`板块详情页缺失 ${item.article}`);
for(const id of guideIds) check(source.has(resolve(root,`articles/${id}/index.html`)),`新手指南缺失 ${id}`);
for(const hub of ['brands','ai','clients','guides','scenarios','questions']) check(source.has(resolve(root,`${hub}/index.html`)),`内容中心缺失 ${hub}`);
for(const [file,html] of source) {
  for(const name of ['desktop-nav','移动端导航']) {
    const nav = name==='desktop-nav' ? html.match(/<nav class="desktop-nav"[^>]*>([\s\S]*?)<\/nav>/)?.[1] : html.match(/<nav aria-label="移动端导航"[^>]*>([\s\S]*?)<\/nav>/)?.[1];
    check(Boolean(nav),`${relative(root,file)} 缺少${name}`);
    for(const item of primaryNavigation) {
      const expected = file===resolve(root,'index.html') && item.href.startsWith('/#') ? item.href.slice(1) : item.href;
      check(nav?.includes(`href="${expected}"`),`${relative(root,file)}: ${name}缺少${item.label}入口`);
    }
  }
}
const aiPage = source.get(resolve(root,'ai-tools/index.html')) || '';
check(new Set(directoryTools.map(t=>t.url)).size===directoryTools.length,'AI工具出现重复官网入口');
for(const category of aiCategories) {
  check(aiPage.includes(`id="${category.id}"`),`AI工具分类缺失 ${category.name}`);
  check(directoryTools.some(t=>t.category===category.id),`AI工具分类为空 ${category.name}`);
}
for(const tool of directoryTools) check(aiPage.includes(`href="${tool.url}" target="_blank" rel="noopener noreferrer"`),`AI工具缺少直达官网链接 ${tool.name}`);
for(const client of clients) check(source.get(resolve(root,'clients/index.html'))?.includes(`href="${client.source}"`),`客户端缺少官方获取入口 ${client.name}`);
const topicText = texts.get(resolve(root,'topics/index.html')) || '';
const keywords = topicGroups.flatMap(g => [...g.terms]);
for(const keyword of keywords) check(topicText.includes(keyword),`主题索引缺少关键词: ${keyword}`);
check(topicHtml.includes('href="/articles/'), '主题索引没有文章入口');
const search = JSON.parse(await readFile(resolve(root,'search-index.json'),'utf8'));
check(search.length === articleCount,`搜索索引数量 ${search.length} 与文章数量 ${articleCount} 不一致`);
for(const item of search) check(item.text.length>200,`搜索索引缺少正文 ${item.id}`);
const sitemap = await readFile(resolve(root,'sitemap-0.xml'),'utf8');
check(!sitemap.includes(`${origin}/search/`),'站点地图不应包含 noindex 搜索页');
check(!sitemap.includes('404'),'站点地图不应包含 404');
for(const item of search) check(sitemap.includes(`${origin}/articles/${item.id}/`),`站点地图缺少文章 ${item.id}`);
const rss = await readFile(resolve(root,'rss.xml'),'utf8');
check((rss.match(/<item>/g)||[]).length === articleCount, 'RSS 文章数量不一致');
check((await readFile(resolve(root,'robots.txt'),'utf8')).includes(`${origin}/sitemap-index.xml`),'robots 域名或站点地图不一致');
check((await readFile(resolve(root,'llms.txt'),'utf8')).includes(`${origin}/articles/`),'llms.txt 缺少文章链接');
await access(resolve(root,'images/social-card.png'));
const preview = await readFile(resolve('预览.html'),'utf8');
check(!preview.includes('<base '),'独立预览仍依赖远程或本地服务基准地址');
const previewPages = JSON.parse(preview.match(/<script[^>]*id="preview-pages"[^>]*>([\s\S]*?)<\/script>/)?.[1] || '{}');
check(Object.keys(previewPages).length===htmlFiles.length,'单文件预览没有包含全部页面');
check(Boolean(previewPages['/guides/']),'单文件预览缺少新手指南');
check(Boolean(previewPages['/ai-tools/']),'单文件预览缺少AI工具');
check(!/<img\b/.test(preview),'独立首页预览仍依赖外部图片');
if(errors.length) { console.error(`\n验证失败（${errors.length} 项）:\n`+errors.map(e=>'- '+e).join('\n')); process.exit(1); }
console.log(`\n验证通过：${htmlFiles.length} 个 HTML 页面、${articleCount} 篇文章、${keywords.length} 个主题词、${internalLinks} 个内部链接/资源。`);
console.log('标题、摘要、H1、canonical、结构化数据、锚点、关键词、RSS、站点地图与搜索索引均通过检查。');
