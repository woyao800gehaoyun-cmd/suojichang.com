export const siteName = '2026梯子推荐';
export const tagline = '把线路、客户端和使用场景讲清楚';
export const categories = [
  { name: '选购指南', slug: 'choose', description: '从预算、稳定性和服务透明度出发，建立自己的选择标准。', icon: 'compass' },
  { name: '线路与协议', slug: 'network', description: '理解专线、中转、节点倍率与不同 IP 的实际差异。', icon: 'route' },
  { name: '设备教程', slug: 'devices', description: 'Windows、Mac、Android 和 iOS 的客户端配置与订阅。', icon: 'monitor' },
  { name: '使用场景', slug: 'scenarios', description: '针对 AI、流媒体、游戏、办公和跨境业务做选择。', icon: 'sparkles' },
  { name: '故障排查', slug: 'troubleshooting', description: '连接超时、导入失败、晚高峰变慢时逐项定位。', icon: 'wrench' }
] as const;

export const categorySlug = (name: string) => categories.find(c => c.name === name)?.slug || 'choose';

const detailedTopics: Record<string, string> = {
  '节点倍率': 'node-multiplier', '倍率说明': 'node-multiplier', '倍率怎么算': 'node-multiplier',
  '梯子订阅': 'subscription-import', '订阅链接': 'subscription-import', '订阅地址': 'subscription-import', '梯子节点': 'subscription-import', '节点梯子': 'subscription-import',
  '梯子流量包': 'plans-and-pricing', '流量重置包': 'plans-and-pricing', '流量不够怎么办': 'plans-and-pricing',
  '梯子审计': 'privacy-and-logging', '无审计梯子': 'privacy-and-logging', '日志审计': 'privacy-and-logging',
  '梯子和 VPN 区别': 'tizi-vpn-vps', '梯子 vs VPN': 'tizi-vpn-vps', '梯子和 VPS 区别': 'tizi-vpn-vps', '梯子 vs 自建': 'tizi-vpn-vps',
  '梯子跑路怎么判断': 'provider-risk', '梯子是否靠谱': 'provider-risk', '老牌梯子推荐': 'provider-risk', '稳定老牌梯子': 'provider-risk',
  '梯子连上了但打不开网页': 'connection-troubleshooting', '梯子无法连接': 'connection-troubleshooting', '连接超时': 'connection-troubleshooting', '梯子被墙了怎么办': 'connection-troubleshooting', '梯子失效': 'connection-troubleshooting',
  '梯子节点少': 'subscription-troubleshooting', '节点不显示': 'subscription-troubleshooting', '梯子订阅失败': 'subscription-troubleshooting', '更新订阅失败': 'subscription-troubleshooting', 'Clash 导入订阅失败': 'subscription-troubleshooting', 'Clash 配置错误': 'subscription-troubleshooting', 'iOS 小火箭订阅失败': 'subscription-troubleshooting', '安卓无法导入订阅': 'subscription-troubleshooting',
  '梯子推荐新手': 'beginner-checklist', '新手梯子推荐': 'beginner-checklist', '小白梯子推荐': 'beginner-checklist',
  '梯子导航': 'provider-risk', '梯子大全': 'provider-risk', '梯子合集': 'provider-risk', '梯子官网': 'provider-risk', '梯子备用网址': 'provider-risk', '梯子入口': 'provider-risk',
  '多设备梯子': 'device-clients', '不限设备梯子': 'device-clients', '设备数限制': 'device-clients',
  'SS 梯子': 'beginner-checklist', 'SSR 梯子': 'beginner-checklist', 'V2Ray 梯子': 'beginner-checklist', 'Trojan 梯子': 'beginner-checklist',
  '梯子速度慢': 'slow-at-night', '延迟高怎么办': 'slow-at-night', '晚高峰不卡梯子': 'slow-at-night', '高峰期稳定梯子': 'slow-at-night', '梯子加速': 'slow-at-night', '网络加速': 'slow-at-night',
  '日本原生 IP 梯子': 'native-ip-streaming', '美国流媒体梯子': 'native-ip-streaming', '节点推荐': 'region-nodes'
};

export function topicArticle(term: string, fallback: string): string {
  return detailedTopics[term] || (/价格|多少钱|套餐|月付|季付|年付|优惠|折扣|试用|体验|便宜|平价|性价比/.test(term) ? 'plans-and-pricing' : /Windows|Mac|Android|iOS|客户端|Clash|Shadowrocket|Quantumult|Stash|v2ray|sing-box|iPhone|安卓/.test(term) ? 'device-clients' : /香港|台湾|日本|新加坡|韩国|美国|英国|德国|法国|马来西亚|泰国|越南|菲律宾/.test(term) ? 'region-nodes' : fallback);
}

export const topicGroups = [
  {
    title: '选择与价格',
    intro: '先明确预算、使用频率、退款条款与风险，再比较套餐。',
    article: '2026-tizi-guide',
    terms: ['梯子', '梯子推荐', '梯子排行', '梯子测评', '梯子怎么样', '梯子导航', '梯子大全', '梯子合集', '梯子官网', '梯子备用网址', '梯子入口', '梯子怎么选', '梯子避坑', '梯子选择指南', '梯子推荐新手', '新手梯子推荐', '小白梯子推荐', '老牌梯子推荐', '稳定老牌梯子', '梯子跑路怎么判断', '梯子是否靠谱', '便宜梯子', '平价梯子', '高性价比梯子', '梯子月付', '梯子季付', '梯子年付', '梯子优惠', '梯子折扣', '梯子优惠码', '梯子试用', '梯子免费试用', '梯子体验', '梯子套餐', '梯子价格', '梯子多少钱', '梯子流量包', '流量重置包', '流量不够怎么办']
  },
  {
    title: '线路与节点',
    intro: '线路名称只是线索，真实速度仍受地区、运营商和时间段影响。',
    article: 'iplc-vs-relay',
    terms: ['梯子订阅', '订阅链接', '订阅地址', '梯子节点', '节点梯子', '节点推荐', '梯子加速', '网络加速', '稳定梯子', '好用梯子', '不掉线梯子', '高速梯子', '低延迟梯子', '游戏梯子', '晚高峰不卡梯子', '高峰期稳定梯子', 'IPLC 梯子', '专线梯子', '内网专线梯子', '中转梯子', 'BGP 梯子', '直连梯子', 'SS 梯子', 'SSR 梯子', 'V2Ray 梯子', 'Trojan 梯子', '节点倍率', '倍率说明', '倍率怎么算', '梯子审计', '无审计梯子', '日志审计', '多设备梯子', '不限设备梯子', '设备数限制']
  },
  {
    title: 'IP 与地区',
    intro: '地区标签和 IP 类型要按目标服务实际验证，不能只看宣传页。',
    article: 'native-ip-streaming',
    terms: ['原生 IP 梯子', '家宽 IP 梯子', '住宅 IP 梯子', '香港梯子', '香港节点梯子', '台湾梯子', '日本梯子', '新加坡梯子', '韩国梯子', '美国梯子', '英国梯子', '德国梯子', '法国梯子', '马来西亚梯子', '泰国梯子', '越南梯子', '菲律宾梯子', '香港 IPLC 梯子', '日本原生 IP 梯子', '新加坡专线梯子', '香港低延迟梯子', '日本游戏梯子', '美国流媒体梯子']
  },
  {
    title: '设备与客户端',
    intro: '客户端兼容性、订阅格式与系统权限决定是否能顺利使用。',
    article: 'subscription-import',
    terms: ['Windows 梯子', '梯子 Windows 客户端', 'Mac 梯子', '梯子 Mac 客户端', 'Android 梯子', '梯子安卓客户端', 'iOS 梯子', '梯子 iPhone 客户端', 'Clash 梯子', 'Clash for Windows 梯子', 'Clash Verge 梯子', 'Clash Meta 梯子', 'Shadowrocket 梯子', 'Quantumult X 梯子', 'Stash 梯子', 'v2rayN 梯子', 'v2rayNG 梯子', 'sing-box 梯子']
  },
  {
    title: '场景与对比',
    intro: '按真实任务判断可用性，避免把“能连接”当作“适合使用”。',
    article: 'scenario-checklist',
    terms: ['流媒体梯子', '解锁流媒体梯子', 'ChatGPT 梯子', 'AI 梯子', 'OpenAI 梯子', '外贸梯子', '跨境电商梯子', '出海梯子', '直播梯子', 'TikTok 梯子', 'YouTube 梯子', '办公梯子', '远程办公梯子', '学术梯子', '梯子和 VPN 区别', '梯子 vs VPN', '梯子和 VPS 区别', '梯子 vs 自建']
  },
  {
    title: '排障与恢复',
    intro: '从网络、订阅、客户端和节点四层逐步排查。',
    article: 'slow-at-night',
    terms: ['梯子连上了但打不开网页', '梯子订阅失败', '更新订阅失败', '梯子节点少', '节点不显示', '梯子速度慢', '延迟高怎么办', '梯子无法连接', '连接超时', '梯子被墙了怎么办', '梯子失效', 'Clash 导入订阅失败', 'Clash 配置错误', 'iOS 小火箭订阅失败', '安卓无法导入订阅']
  }
] as const;
