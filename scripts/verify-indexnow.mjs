import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const config=JSON.parse(await readFile(new URL('../indexnow.config.json',import.meta.url),'utf8'));
const originalFetch=globalThis.fetch;
try {
  for(const test of ['ok','pending','bad-key','foreign-url','rejected']) {
    let submissions=0;
    globalThis.fetch=async (url,options)=>{
      if(String(url).endsWith('.txt')) return new Response(test==='bad-key'?'wrong':config.key);
      if(String(url).endsWith('sitemap-index.xml')) return new Response(`<sitemapindex><sitemap><loc>${config.site}/sitemap-0.xml</loc></sitemap></sitemapindex>`);
      if(String(url).endsWith('sitemap-0.xml')) {
        const value=test==='foreign-url'?'https://other.test/':config.site+'/';
        return new Response(`<urlset><url><loc>${value}</loc></url><url><loc>${value}</loc></url></urlset>`);
      }
      assert.equal(String(url),config.endpoint);
      const body=JSON.parse(options.body);
      assert.equal(body.host,new URL(config.site).hostname);
      assert.equal(body.key,config.key);
      assert.equal(body.keyLocation,`${config.site}/${config.key}.txt`);
      assert.deepEqual(body.urlList,[config.site+'/']);
      submissions++;
      return new Response('',{status:test==='pending'?202:test==='rejected'?403:200});
    };
    let failure;
    try { await import(`./indexnow.mjs?test=${test}`); } catch(error) { failure=error; }
    if(['ok','pending'].includes(test)) {assert.equal(failure,undefined);assert.equal(submissions,1);}
    else {
      assert.ok(failure,`${test} should fail`);
      assert.equal(submissions,test==='rejected'?1:0);
    }
  }
} finally { globalThis.fetch=originalFetch; }
console.log('IndexNow 协议验证通过：200/202、去重、拒绝错误验证键/外站URL/403。未发送网络请求。');
