import { readFile, writeFile } from 'node:fs/promises';

const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
const favicon = await readFile(new URL('../public/favicon.svg', import.meta.url), 'utf8');
const preview = html
  .replace('<head>', '<head><base href="http://localhost:4321/">')
  .replace('href="/favicon.svg"', `href="data:image/svg+xml;base64,${Buffer.from(favicon).toString('base64')}"`);
await writeFile(new URL('../预览.html', import.meta.url), preview, 'utf8');
console.log('已生成可直接打开的完整首页：预览.html');
