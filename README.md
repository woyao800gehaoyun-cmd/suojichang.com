# 2026梯子推荐

基于 Astro 5 和 Markdown 的静态中文博客。默认域名为 `https://soujichang.com`，站名、颜色和文章均可在源码中维护。

## 本地运行

Windows 用户可直接双击项目根目录的 `start-blog.cmd`。它会启动本地网站并自动打开 Edge，固定地址为 `http://127.0.0.1:4173/`；导航使用正常 HTTP 路由，不依赖聊天软件打开文件时采用的路径。也可运行 `npm start`，重复启动会复用已运行的服务。

也支持直接双击 `dist/index.html`：文件模式下会自动将栏目与文章链接解析为 `dist/` 内的实际 HTML 文件。请保留完整的 `dist/` 文件夹；单独分享一个文件时使用 `完整博客预览.html`。HTTP 访问时保留正式网站的正常路由。

需要 Node.js 22.18+（或当前 LTS）和 npm。验证脚本使用 Node 原生 TypeScript 类型剥离支持。

```powershell
npm ci
npm run dev
```

打开终端显示的本地地址，通常为 `http://localhost:4321/`。

每次构建会在项目根目录生成 `完整博客预览.html`，并保留 `预览.html` 作为相同内容的别名。它内嵌全部页面，双击即可浏览导航、文章、分类和全文搜索；可以单独复制、改名或分享，不依赖相邻文件夹和本地服务。预览需要启用 JavaScript。另生成 `本地预览/` 作为传统多文件预览。GitHub Actions 的 `blog-standalone-preview` 产物也提供该单文件。正式部署仍使用 `dist/`，网站正式路由与 SEO 不受单文件预览影响。

```powershell
npm run verify
npm run preview
```

`verify` 先构建，再检查内部链接、锚点、文章元信息、结构化数据、关键词入口、RSS、站点地图、AI 工具官网入口与搜索索引；同时检查全部本地预览链接，并运行离线全文搜索脚本。发布目录为 `dist`。

## 新增与更新文章

```powershell
npm run new:post -- my-first-review "我的文章标题" "选购指南"
```

脚本在 `src/content/articles/` 创建 Markdown 文件，日期采用上海时区，并阻止覆盖同名文件。可用分类：选购指南、线路与协议、设备教程、使用场景、故障排查。也可以参考 `templates/article.md` 手工新建。

1. 文件名是文章路径，例如 `my-first-review.md` 对应 `/articles/my-first-review/`；发布后尽量保持路径稳定。
2. 填写唯一标题、摘要、分类、发布日期、阅读分钟和关键词，完成正文后再发布。当前版本中，内容目录里的每篇文章都会发布，没有草稿开关。
3. 先给直接答案，再用二级标题拆解问题，补上条件、实例、来源与关联文章。
4. 修改旧文章时保留 `published`；实质修订后添加或更新 `updated: YYYY-MM-DD`，并在正文说明重要变化。不要只为刷新日期而修改时间。
5. 运行 `npm run verify`，预览桌面与手机布局，再推送到托管仓库。

文章会自动加入文章列表、所属分类、首页最近更新、搜索索引、RSS、站点地图和 `llms.txt`。首页品牌资料由 `src/data/providers.ts` 维护，AI、客户端、指南与问题入口由 `src/data/hubs.ts` 维护。RSS 发布日期用于新文排序；旧文修订会更新站内列表与页面修订日期。

## 结构与编辑位置

| 位置 | 用途 |
| --- | --- |
| `src/content/articles/` | 正文文章、品牌资料、AI 专题与独立客户端教程；长期更新入口 |
| `src/data/site.ts` | 站名、分类、完整主题词分组与文章映射 |
| `src/pages/topics.astro` | 主题索引页面 |
| `src/layouts/Base.astro` | 全站导航、页脚、SEO 和分享信息 |
| `src/styles/simple.css` | 浅灰蓝博客模板的配色、版式和响应式样式 |
| `src/data/providers.ts` | 品牌资料、参考价格、来源与详情页映射 |
| `src/data/hubs.ts` | AI、客户端、使用场景、常见问题和新手指南入口 |
| `src/data/navigation.ts` | 桌面与移动端共享的栏目导航 |
| `src/data/ai-directory.ts` | AI 工具分类、名称、介绍与官方地址 |
| `src/pages/ai-tools.astro` | 可直接打开官网的完整 AI 工具导航 |
| `src/pages/[hub].astro` | 六个内容中心：品牌、AI、客户端、指南、场景和问题 |
| `src/pages/methodology.astro` | 核验方法与编辑原则 |
| `templates/article.md` | 可复制的写作结构 |

## SEO 与 GEO

- 每页独立标题、摘要、canonical、中文语言标记及 Open Graph；分享图片为 PNG。
- 正文在构建时生成 HTML；导航与文章阅读无需 JavaScript。
- 文章包含作者入口、发布日期、实质修订日期、目录、相关内容、`BlogPosting` 和 `BreadcrumbList`。
- 分类与主题索引建立内部链接，覆盖用户提供的主题；通用主题使用“梯子”，品牌保留用户指定的正式名称。
- 自动生成 `/sitemap-index.xml`、`/robots.txt`、`/rss.xml`；搜索和 404 页面不进入站点地图。
- GEO 通过直接答案、术语解释、条件清楚的表格、可追溯来源和稳定文章地址改善机器可读性。
- `/llms.txt` 为可选的阅读指引，目前不是搜索引擎或 AI 收录保证，也不替代正常 HTML 和站点地图。

关键词放在主题索引和有意义的正文中，不使用隐藏文本。当前品牌为光年梯、瞬云、云图和鲲鹏加速，套餐参数由站点运营者提供。完整推广地址和优惠码集中维护于 src/data/providers.ts；光年梯为主推。优惠码不自动推断折扣，鲲鹏未提供的流量保持待用户在套餐页确认。没有独立测试的供应商不填写本站评分、测速或平台解锁结论。

SEO/GEO 基础配置不能保证排名、收录或 AI 引用。后续要靠内容质量、真实更新、外部信誉与实际索引反馈调整。

## 部署到 Cloudflare Pages

GitHub 仓库：https://github.com/woyao800gehaoyun-cmd/suojichang.com 。推送触发 GitHub Actions 构建与校验，并生成静态产物；网站上线仍由实际托管配置决定。

1. 将项目提交到自己的 Git 仓库，在 Cloudflare Pages 创建项目并连接它。
2. 构建命令：`npm run build`；产物目录：`dist`；Node 版本设置为 22。
3. 添加环境变量 `SITE_URL=https://soujichang.com`（如使用其他域名，替换为正式 HTTPS 域名）。
4. 在 Pages 添加自定义域名并按控制台指引配置 DNS。
5. 核对 HTTPS、文章路径、404、站点地图、RSS 与分享图片，然后在 Google Search Console 和 Bing Webmaster Tools 验证域名并提交站点地图。

`public/_headers` 提供 Cloudflare Pages 可读取的响应头规则。其他静态托管平台需要按其规则配置响应头与 404。不要给全部未知路径添加指向首页的 SPA 回退，本项目每篇文章都有真实 HTML 文件。

更换域名后需重新构建，canonical、robots、RSS 和站点地图会使用新域名。不要以临时预览域名提交正式索引。若公开预览环境也有收录风险，应在托管平台对预览环境设置 `X-Robots-Tag: noindex`。

## 长期维护建议

每周按读者真实问题更新一篇文章，避免只改标题年份。每月复查客户端维护状态、关键来源与高流量页面；每季度回看内容覆盖与内部链接。套餐、优惠、支持地区与实测结论应在发布时重新核验，并留下可复查记录。

新增统计、评论、联系表单或推广链接之前，同步修改隐私说明与披露。当前网站没有后台、数据库、表单收集或第三方统计脚本，站内搜索在浏览器本地匹配公开索引。
