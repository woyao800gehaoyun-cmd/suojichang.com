// A single portable HTML file: every route is embedded, so moving the file is safe.
export function createStandalonePreview(pages, favicon) {
  const data = JSON.stringify(pages).replaceAll('<','\\u003c');
  function connectPage(route, hostFile) {
    const current = new URL(route,'https://preview.invalid');
    for(const link of document.querySelectorAll('a[href]')) {
      const raw = link.getAttribute('href');
      if(!raw || /^(?:[a-z][\w+.-]*:|\/\/)/i.test(raw)) continue;
      const url = new URL(raw,current);
      link.dataset.previewRoute = url.pathname+url.search+url.hash;
      link.href = hostFile+'#'+link.dataset.previewRoute;
    }
    document.addEventListener('click',event=>{
      const link = event.target.closest('a[data-preview-route]');
      if(!link || event.button!==0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const url = new URL(link.dataset.previewRoute,current);
      if(url.pathname===current.pathname && url.hash) {
        document.getElementById(decodeURIComponent(url.hash.slice(1)))?.scrollIntoView();
        for(const menu of document.querySelectorAll('.mobile-menu[open]')) menu.removeAttribute('open');
      } else {
        parent.postMessage({type:'blog-preview:navigate',route:link.dataset.previewRoute},'*');
      }
    });
    if(current.hash) requestAnimationFrame(()=>document.getElementById(decodeURIComponent(current.hash.slice(1)))?.scrollIntoView());
    parent.postMessage({type:'blog-preview:title',title:document.title},'*');
  }
  function runPreview() {
    const pages = JSON.parse(document.getElementById('preview-pages').textContent);
    const frame = document.getElementById('preview-frame');
    const origin = 'https://preview.invalid';
    const hostFile = location.href.split('#')[0];
    const bridge = CONNECT_PAGE;
    function render() {
      const route = location.hash.slice(1) || '/';
      const url = new URL(route,origin);
      const html = pages[url.pathname] || pages['/404.html'];
      const args = JSON.stringify([url.pathname+url.search+url.hash,hostFile]).replaceAll('<','\\u003c');
      const script = '<script>('+bridge+')(...'+args+');<\/script>';
      frame.srcdoc = html.replace('</body>',script+'</body>');
    }
    window.addEventListener('message',event=>{
      if(event.source!==frame.contentWindow || !event.data) return;
      if(event.data.type==='blog-preview:title') document.title=event.data.title;
      if(event.data.type==='blog-preview:navigate' && typeof event.data.route==='string') {
        const url = new URL(event.data.route,origin);
        if(url.origin!==origin) return;
        const hash = '#'+url.pathname+url.search+url.hash;
        if(location.hash===hash) render(); else location.hash=hash;
      }
    });
    window.addEventListener('hashchange',render);
    render();
  }
  const runtime = runPreview.toString().replace('CONNECT_PAGE',JSON.stringify(connectPage.toString()));
  return `<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>2026梯子推荐 · 完整预览</title><link rel="icon" href="${favicon}"><style>html,body{margin:0;width:100%;height:100%;overflow:hidden}iframe{display:block;width:100%;height:100%;border:0}</style></head><body><iframe id="preview-frame" title="2026梯子推荐完整网站预览"></iframe><noscript>此预览需要启用 JavaScript。也可以使用本地预览文件夹中的页面。</noscript><script type="application/json" id="preview-pages">${data}</script><script>(${runtime})();</script></body></html>`;
}
