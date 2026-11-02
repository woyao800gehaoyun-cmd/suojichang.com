(() => {
  // Keep normal website URLs on HTTP; resolve local files only when double-clicked.
  if (location.protocol !== 'file:') return;
  const depth = Number(document.documentElement.dataset.routeDepth || 0);
  const root = new URL('../'.repeat(depth) || './', location.href);
  for (const element of document.querySelectorAll('[href], [src]')) {
    for (const attribute of ['href', 'src']) {
      const value = element.getAttribute(attribute);
      if (!value?.startsWith('/') || value.startsWith('//')) continue;
      const route = new URL(value, 'https://preview.invalid');
      const path = route.pathname + (route.pathname.endsWith('/') ? 'index.html' : '');
      const destination = new URL('.' + path, root);
      destination.search = route.search;
      destination.hash = route.hash;
      element.setAttribute(attribute, destination.href);
    }
  }
})();
