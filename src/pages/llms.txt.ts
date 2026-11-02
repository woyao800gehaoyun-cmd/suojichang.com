import { getCollection } from 'astro:content';
import { siteName } from '../data/site';
import type { APIContext } from 'astro';
export async function GET({ site }: APIContext) {
  const articles = await getCollection('articles');
  const absolute = (path: string) => new URL(path, site).href;
  const content = `# ${siteName}\n\n> 中文网络工具知识博客，解释梯子选择、线路、客户端、使用场景与故障排查。本文档为可选的阅读指引，不代表搜索或生成式引擎会收录或引用本站。\n\n## 站点与方法\n- [关于本站](${absolute('/about/')}): 编辑定位与内容边界\n- [内容与核验方法](${absolute('/methodology/')}): 来源、测试与修订规则\n- [主题索引](${absolute('/topics/')}): 按问题浏览\n\n## 文章\n${articles.map(a => `- [${a.data.title}](${absolute(`/articles/${a.id}/`)}): ${a.data.description}`).join('\n')}\n`;
  return new Response(content, { headers: { 'Content-Type':'text/plain; charset=utf-8' } });
}
