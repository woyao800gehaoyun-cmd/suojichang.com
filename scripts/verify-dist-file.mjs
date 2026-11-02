import { readFile, readdir, access } from 'node:fs/promises';
import { resolve, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import vm from 'node:vm';

const root = resolve('dist');
let pages = 0;
let links = 0;
async function walk(dir) {
  for(const entry of await readdir(dir,{withFileTypes:true})) {
    const file = resolve(dir,entry.name);
    if(entry.isDirectory()) { await walk(file); continue; }
    if(!file.endsWith('.html')) continue;
    const html = await readFile(file,'utf8');
    const script = html.match(/<script[^>]*data-file-navigation[^>]*>([\s\S]*?)<\/script>/)?.[1];
    if(!script) throw new Error('缺少文件导航兼容脚本：'+file);
    const depth = html.match(/data-route-depth="(\d+)"/)?.[1];
    const elements = [...html.matchAll(/\b(href|src)="([^"]+)"/g)].map(match=>({
      attribute:match[1],value:match[2].replaceAll('&amp;','&'),
      getAttribute(name){return name===this.attribute?this.value:null;},
      setAttribute(name,value){if(name===this.attribute)this.value=value;}
    }));
    const original = elements.map(element=>element.value);
    const document = {documentElement:{dataset:{routeDepth:depth}},querySelectorAll:()=>elements};
    vm.runInNewContext(script,{location:{protocol:'https:',href:'https://example.test/'},document,URL});
    if(elements.some((element,i)=>element.value!==original[i])) throw new Error('HTTP模式不应改写正式链接');
    const href = pathToFileURL(file).href;
    vm.runInNewContext(script,{location:{protocol:'file:',href},document,URL});
    for(const element of elements) {
      const url = new URL(element.value,href);
      if(url.protocol!=='file:') continue;
      const target = fileURLToPath(url);
      if(!target.startsWith(root+sep)) throw new Error('dist文件链接指向磁盘根目录：'+element.value);
      await access(target);
      links++;
    }
    pages++;
  }
}
await walk(root);
console.log(`dist双击兼容验证通过：${pages}页、${links}个文件链接；HTTP模式保持正式路由。`);
