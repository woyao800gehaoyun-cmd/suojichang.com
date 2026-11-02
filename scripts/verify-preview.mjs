import { readFile, readdir, access } from 'node:fs/promises';
import { resolve, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import vm from 'node:vm';

const projectRoot = resolve(fileURLToPath(new URL('../',import.meta.url)));
const previewRoot = resolve(projectRoot,'本地预览');
const files = [];
async function walk(dir) {
  for(const entry of await readdir(dir,{withFileTypes:true})) {
    const path = resolve(dir,entry.name);
    if(entry.isDirectory()) await walk(path);
    else if(path.endsWith('.html')) files.push(path);
  }
}
await walk(previewRoot);
let links=0;
for(const file of files) {
  const html = await readFile(file,'utf8');
  if(html.includes('<base ') || /localhost:4321/.test(html)) throw new Error(`预览仍依赖服务：${file}`);
  for(const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const value = match[1].replaceAll('&amp;','&');
    if(/^(https?:|data:|mailto:|tel:)/.test(value)) continue;
    const url = new URL(value,pathToFileURL(file));
    if(url.protocol!=='file:') throw new Error(`不支持的预览链接 ${value}`);
    const target = resolve(fileURLToPath(url));
    if(target!==file && !target.startsWith(previewRoot+sep)) throw new Error(`预览链接越界：${value}`);
    await access(target);
    if(url.hash && target.endsWith('.html')) {
      const dest = target===file ? html : await readFile(target,'utf8');
      if(!dest.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`)) throw new Error(`预览锚点缺失：${value}`);
    }
    links++;
  }
}

// Run the actual generated search script with file:// semantics: no server or fetch.
const html = await readFile(resolve(previewRoot,'search/index.html'),'utf8');
const data = html.match(/<script[^>]*id="search-data"[^>]*>([\s\S]*?)<\/script>/)[1];
const index = JSON.parse(data);
const scripts = [...html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)];
const script = scripts.find(s=>!s[1].includes('type=') && s[2].includes('search-input'))?.[2];
if(!script) throw new Error('搜索脚本没有内联，文件预览可能受跨域限制');
const listeners = new Map();
const input = {value:'',addEventListener:(name,callback)=>listeners.set(name,callback)};
const status = {textContent:''};
const empty = {hidden:true};
const cards = index.map(item=>({dataset:{id:item.id},textContent:'',hidden:false}));
const nodes = {'#search-input':input,'.search-form':{addEventListener(){}},'#search-status':status,'#search-empty':empty,'#search-data':{textContent:data}};
vm.runInNewContext(script,{document:{querySelector:key=>nodes[key],querySelectorAll:key=>key==='.search-card'?cards:[]},URL,location:{href:'file:///preview/search/index.html',protocol:'file:'}});
for(const [query,expected] of [['光年梯','guangnianti-review'],['GNT80','guangnianti-review'],['Clash','clash-verge-guide']]) {
  input.value=query; listeners.get('input')();
  if(cards.find(card=>card.dataset.id===expected).hidden) throw new Error(`离线搜索未找到 ${query}`);
}
input.value='zzzz-no-result-012345'; listeners.get('input')();
if(empty.hidden || cards.some(card=>!card.hidden)) throw new Error('离线搜索空状态错误');
console.log(`本地预览验证通过：${files.length} 个 HTML 文件、${links} 个链接/锚点，离线全文搜索正常。`);

// Exercise the portable entry after it has lost all neighbouring files.
const standalone = await readFile(resolve(projectRoot,'预览.html'),'utf8');
const bundled = standalone.match(/<script[^>]*id="preview-pages"[^>]*>([\s\S]*?)<\/script>/)[1];
const runtime = [...standalone.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)].find(s=>!s[1].includes('type='))[2];
const frame = {srcdoc:'',contentWindow:{}};
const events = {};
const location = {href:'file:///isolated/copy.html',hash:''};
vm.runInNewContext(runtime,{document:{getElementById:id=>id==='preview-pages'?{textContent:bundled}:frame},window:{addEventListener:(type,fn)=>events[type]=fn},location,URL});
for(const route of ['/','/guides/','/ai-tools/','/clients/','/categories/troubleshooting/','/brands/','/articles/guangnianti-review/','/search/']) {
  location.hash='#'+route; events.hashchange();
  if(!frame.srcdoc.includes('<h1') || !frame.srcdoc.includes('blog-preview:navigate')) throw new Error(`单文件预览路由失效：${route}`);
}
events.message({source:frame.contentWindow,data:{type:'blog-preview:navigate',route:'/ai-tools/'}});
if(location.hash!=='#/ai-tools/') throw new Error('单文件预览点击消息未更新路由');
console.log('单文件预览验证通过：单独复制后，全部导航入口、测评与搜索仍可渲染。');
