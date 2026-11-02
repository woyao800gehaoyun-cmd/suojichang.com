import { existsSync, openSync, closeSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { spawn, spawnSync } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';

const root = fileURLToPath(new URL('../',import.meta.url));
const url = 'http://127.0.0.1:4173/';
const astro = resolve(root,'node_modules/astro/astro.js');
async function checkSite() {
  try {
    const response = await fetch(url+'ai-tools/',{signal:AbortSignal.timeout(1500)});
    return response.ok && (await response.text()).includes('<h1>AI 工具导航</h1>');
  } catch { return false; }
}
try {
  if(!await checkSite()) {
    if(!existsSync(astro)) throw new Error('请先在项目目录运行 npm ci，再双击 start-blog.cmd。');
    if(!existsSync(resolve(root,'dist/index.html'))) {
      const build = spawnSync(process.execPath,[astro,'build'],{cwd:root,stdio:'inherit',windowsHide:true});
      if(build.status!==0) throw new Error('网站构建失败，请查看上方错误。');
    }
    const log = openSync(join(tmpdir(),'soujichang-preview-server.log'),'a');
    const server = spawn(process.execPath,[astro,'preview','--host','127.0.0.1','--port','4173'],{cwd:root,detached:true,windowsHide:true,stdio:['ignore',log,log]});
    server.on('error',error=>console.error(error.message));
    server.unref();
    closeSync(log);
    let ready = false;
    for(let attempt=0;attempt<40;attempt++) {
      if(await checkSite()) { ready=true; break; }
      await delay(250);
    }
    if(!ready) throw new Error('本地服务未能启动，请查看临时目录中的 soujichang-preview-server.log。');
  }
  console.log('网站已启动：'+url);
  if(!process.argv.includes('--no-open')) {
    const edge = ['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe','C:/Program Files/Microsoft/Edge/Application/msedge.exe'].find(existsSync);
    const command = process.platform==='win32' ? (edge || 'rundll32.exe') : process.platform==='darwin'?'open':'xdg-open';
    const args = edge ? ['--new-window',url] : process.platform==='win32'?['url.dll,FileProtocolHandler',url]:[url];
    const browser = spawn(command,args,{detached:true,stdio:'ignore'});
    browser.on('error',error=>console.error('请手动打开 '+url+'：'+error.message));
    browser.unref();
  }
} catch(error) {
  console.error(error.message);
  process.exitCode=1;
}
