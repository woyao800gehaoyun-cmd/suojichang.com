export const aiTools = [
  {name:'ChatGPT / OpenAI', mark:'GPT', title:'ChatGPT 网络与账号检查', description:'区分网页、移动端和 API，核对支持地区、账号状态与流式回答中断。', article:'chatgpt-network'},
  {name:'Claude', mark:'Cl', title:'Claude 使用环境', description:'先核对产品可用地区，再检查浏览器、会话连续性与客户端分流。', article:'claude-network'},
  {name:'Gemini', mark:'Ge', title:'Gemini 地区与连接排查', description:'分别检查账号资格、服务支持地区、网络出口和具体错误提示。', article:'gemini-region'}
] as const;

export const clients = [
  {name:'Clash Verge Rev', platforms:'Windows / Mac / Linux', description:'安装、远程配置、规则选择、系统代理与 TUN 检查。', article:'clash-verge-guide', source:'https://github.com/clash-verge-rev/clash-verge-rev/releases', format:'Clash / Mihomo 兼容配置'},
  {name:'Shadowrocket', platforms:'iPhone / iPad', description:'小火箭订阅添加、节点更新、连接测试与订阅保护。', article:'shadowrocket-guide', source:'https://apps.apple.com/app/shadowrocket/id932747118', format:'服务方提供的 Shadowrocket 订阅'},
  {name:'v2rayN', platforms:'以项目当前系统支持为准', description:'服务订阅、核心兼容、系统代理与应用分流核对。', article:'v2rayn-guide', source:'https://github.com/2dust/v2rayN/releases', format:'与选用内核兼容的订阅'},
  {name:'v2rayNG', platforms:'Android', description:'导入配置、启用 VPN、后台运行和安卓常见错误。', article:'v2rayng-guide', source:'https://github.com/2dust/v2rayNG/releases', format:'v2rayNG 兼容节点订阅'},
  {name:'sing-box', platforms:'多平台，按实现选择', description:'配置版本、图形客户端与命令行、DNS 和路由迁移。', article:'sing-box-guide', source:'https://sing-box.sagernet.org/', format:'匹配当前版本的 sing-box 配置'},
  {name:'Stash', platforms:'iOS / macOS，按商店说明', description:'兼容配置、规则、网络权限与日志排错。', article:'stash-guide', source:'https://stash.wiki/', format:'Stash 支持的配置格式'}
] as const;

export const scenarios = [
  {name:'新手与日常浏览', description:'优先比较短期付款、设备兼容性、套餐限制和支持渠道。', article:'2026-tizi-guide', label:'综合选择'},
  {name:'AI 与 ChatGPT', description:'支持地区、会话连接和账号权限分别核验。', article:'chatgpt-network', label:'AI 使用'},
  {name:'低预算与轻度使用', description:'用真实流量和倍率估算成本，分清月付与年付折算。', article:'plans-and-pricing', label:'预算控制'},
  {name:'流媒体与 YouTube', description:'测试目标内容实际播放、持续速度和账号地区要求。', article:'native-ip-streaming', label:'视频场景'},
  {name:'游戏与低延迟', description:'看游戏内延迟、抖动和丢包，不能只看节点探测。', article:'scenario-checklist', label:'实时交互'},
  {name:'办公、外贸与跨境业务', description:'关注连续性、上传、出口稳定和组织的使用规定。', article:'scenario-checklist', label:'工作场景'}
] as const;

export const questions = [
  {q:'第一次选梯子，最先看什么？', a:'先确定用途、设备和预算，再用低额月付或试用测试常用时段。核对流量倍率、设备限制、退款和支持渠道，比只看宣传速度更有效。', article:'beginner-checklist'},
  {q:'便宜梯子和专线梯子怎么比较？', a:'把流量、倍率、线路覆盖与付款周期放在一起比较。专线只描述部分传输路径，真实稳定性仍要在自己的网络上验证。', article:'plans-and-pricing'},
  {q:'Windows 该选 Clash Verge Rev 还是 v2rayN？', a:'先看服务方提供的订阅格式，再看需要的分流和系统支持。选择来自维护者渠道、与所用协议和内核兼容的客户端。', article:'device-clients'},
  {q:'节点显示已连接，为什么网页打不开？', a:'连接状态不代表请求已经走对路径。依次检查普通网络、套餐额度、当前配置、系统代理和目标服务，记录错误后再调整设置。', article:'connection-troubleshooting'},
  {q:'ChatGPT 或 Claude 打不开，换地区就有用吗？', a:'不一定。要区分平台支持地区、账号权限、服务故障和网络连接问题。先保存原始报错，再核对官方说明，避免一次改变多个变量。', article:'ai-connection-errors'},
  {q:'订阅失败、节点少或不显示怎么办？', a:'先分清下载失败、解析失败和过滤隐藏。检查链接有效期、订阅格式、客户端版本与当前激活配置，再看套餐允许的节点。', article:'subscription-troubleshooting'},
  {q:'晚上突然变慢，从哪里开始查？', a:'先暂停同步和下载，测试普通网络，再对照同地区的其他节点。分别看延迟、丢包和持续速度，必要时记录多天的同一时段。', article:'slow-at-night'},
  {q:'不限设备就可以多人共享吗？', a:'不一定。设备数、同时在线 IP 和共享账号政策是不同限制。用家庭宽带和蜂窝网络同时连接前，先核对套餐条款。', article:'device-limit'}
] as const;

export const guideIds = ['2026-tizi-guide','beginner-checklist','tizi-vpn-vps','subscription-import','iplc-vs-relay','node-multiplier','privacy-and-logging','provider-risk'];
