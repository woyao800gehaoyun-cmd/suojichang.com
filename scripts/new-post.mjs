import { writeFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';

const [slug, title, category = '选购指南'] = process.argv.slice(2);
const categories = ['选购指南','线路与协议','设备教程','使用场景','故障排查'];
if (!slug || !title || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || !categories.includes(category)) {
  console.error('用法: npm run new:post -- article-slug "文章标题" "选购指南"\n分类: ' + categories.join('、'));
  process.exit(1);
}
const target = resolve('src/content/articles', `${slug}.md`);
try { await access(target); console.error('同名文章已存在，不会覆盖: ' + target); process.exit(1); } catch(error) { if(error.code !== 'ENOENT') throw error; }
const date = new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Shanghai'}).format(new Date());
const content = `---\ntitle: ${JSON.stringify(title)}\ndescription: "请填写文章摘要，再发布。"\ncategory: ${JSON.stringify(category)}\npublished: ${date}\nreadingMinutes: 5\nkeywords: []\n---\n\n> **先看结论：**请填写直接答案与适用条件。\n\n## 问题与背景\n\n请填写正文。\n\n## 检查步骤\n\n请填写可复查的步骤。\n\n## 来源与延伸阅读\n\n优先引用官方或原始资料。\n`;
await writeFile(target, content, {flag:'wx'});
console.log('已创建: ' + target);
