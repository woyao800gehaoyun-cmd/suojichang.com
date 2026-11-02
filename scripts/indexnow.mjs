import { readFile } from 'node:fs/promises';
import { setTimeout as delay } from 'node:timers/promises';

const config = JSON.parse(await readFile(new URL('../indexnow.config.json',import.meta.url),'utf8'));
const site = new URL(process.env.SITE_URL || config.site);
const key = config.key;
const keyLocation = new URL(`/${key}.txt`,site).href;
const dryRun = process.argv.includes('--dry-run');
const wait = process.argv.includes('--wait');
if(site.protocol!=='https:' || site.pathname!=='/' || site.search || site.hash) throw new Error('站点必须为 HTTPS 根域名');
if(!/^[a-zA-Z0-9-]{8,128}$/.test(key)) throw new Error('IndexNow 验证键格式无效');
if((await readFile(new URL(`../public/${key}.txt`,import.meta.url),'utf8')).trim()!==key) throw new Error('本地验证文件内容不匹配');

async function get(url) {
  const response = await fetch(url,{signal:AbortSignal.timeout(20000),headers:{'User-Agent':'Soujichang-IndexNow/1.0'}});
  if(!response.ok) throw new Error(`${url} HTTP ${response.status}`);
  return response.text();
}
const decode = value => value.replaceAll('&amp;','&').replaceAll('&lt;','<').replaceAll('&gt;','>').replaceAll('&quot;','"').replaceAll('&apos;',"'");
function locations(xml) { return [...xml.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/g)].map(match=>decode(match[1].trim())); }
function checkUrl(value) {
  const url = new URL(value);
  if(url.origin!==site.origin || url.username || url.password || url.hash) throw new Error('站点地图包含其他域名或无效网址：'+value);
  return url.href;
}
async function sitemapUrls(location, seen=new Set()) {
  checkUrl(location);
  if(seen.has(location) || seen.size>=100) throw new Error('站点地图循环或数量过多');
  seen.add(location);
  const xml = await get(location);
  if(/<sitemapindex\b/.test(xml)) {
    const result=[];
    for(const child of locations(xml)) result.push(...await sitemapUrls(child,seen));
    return result;
  }
  if(!/<urlset\b/.test(xml)) throw new Error('站点地图不是有效的 urlset');
  return locations(xml).map(checkUrl);
}

let urls;
if(dryRun) {
  const xml = await readFile(new URL('../dist/sitemap-0.xml',import.meta.url),'utf8');
  urls=locations(xml).map(checkUrl);
} else {
  let valid=false;
  for(let attempt=0;attempt<(wait?30:1);attempt++) {
    try {
      if((await get(keyLocation)).trim()!==key) throw new Error('线上验证文件内容不匹配');
      valid=true; break;
    } catch(error) {
      if(!wait || attempt===29) throw new Error(`IndexNow 验证文件尚不可用，请先部署网站。${error.message}`);
      console.log(`等待验证文件部署（${attempt+1}/30）`);
      await delay(10000);
    }
  }
  if(!valid) throw new Error('未完成域名验证');
  urls = await sitemapUrls(new URL('/sitemap-index.xml',site).href);
}
urls=[...new Set(urls)];
if(!urls.length) throw new Error('站点地图为空，不提交');
if(urls.some(url=>/\/(?:search|404)(?:\/|\.html|$)/.test(new URL(url).pathname))) throw new Error('提交列表含 noindex 页面');
console.log(`IndexNow：${site.hostname}，${urls.length} 个网址；验证文件 ${keyLocation}`);
if(dryRun) { console.log('配置与本地站点地图检查通过，未发送请求。'); }
else {
  for(let offset=0;offset<urls.length;offset+=10000) {
    const urlList=urls.slice(offset,offset+10000);
    const response=await fetch(config.endpoint,{method:'POST',headers:{'Content-Type':'application/json; charset=utf-8'},body:JSON.stringify({host:site.hostname,key,keyLocation,urlList}),signal:AbortSignal.timeout(30000)});
    if(![200,202].includes(response.status)) throw new Error(`IndexNow HTTP ${response.status}：${(await response.text()).slice(0,500)}`);
    console.log(`HTTP ${response.status}：已提交 ${urlList.length} 个网址${response.status===202?'，等待 IndexNow 验证':'，IndexNow 已接收'}。`);
  }
}
