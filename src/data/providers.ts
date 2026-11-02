export const providers = [
  {
    id:'guangnianti', name:'光年梯机场', initial:'光', price:'18', traffic:'120 GB / 月', trafficGb:120,
    lines:'IEPL 专线', tags:['本站主推','同价多 20G','IEPL 专线'], featured:true,
    coupon:'GNT80', article:'guangnianti-review',
    entry:'https://Rumors.gntaff.com/#/?code=Mclks3w5',
    summary:'18 元月付配 120G 流量，兼顾专线规格与流量余量。与本页另外两款 18 元、100G 套餐相比，同价多出 20G，是本站优先推荐的均衡选择。',
    advantages:['120G 月流量，比同价 100G 套餐多 20%','IEPL 专线，适合优先考虑专线方案的用户','18 元月付，方便先用一个周期验证需求'],
    focus:'专线与流量兼顾，18 元预算优先看光年梯'
  },
  {
    id:'shunyun', name:'瞬云机场', initial:'瞬', price:'18', traffic:'100 GB / 月', trafficGb:100,
    lines:'IPLC 专线', tags:['IPLC 专线','18 元月付'], featured:false,
    coupon:'20OFF', article:'shunyun-review',
    entry:'https://ddd.jichang.best/#/register?code=SWAVvMOV',
    summary:'18 元月付、100G 流量，主打 IPLC 专线。适合希望在相近预算下比较不同专线方案、用自己的网络验证实际表现的用户。',
    advantages:['IPLC 专线方案','18 元月付，100G 额度清楚','提供优惠码 20OFF，结算时核对适用条件'],
    focus:'希望对照 IPLC 线路的用户'
  },
  {
    id:'yuntu', name:'云图机场', initial:'云', price:'18', traffic:'100 GB / 月', trafficGb:100,
    lines:'IEPL 专线', tags:['IEPL 专线','100G 流量'], featured:false,
    coupon:'yt88', article:'yuntu-review',
    entry:'https://super.ytjcok.org/#/register?code=COsTypDq',
    summary:'18 元月付、100G 流量，采用 IEPL 专线方案。适合每月 100G 能覆盖需求、希望比较不同 IEPL 服务接入体验的用户。',
    advantages:['IEPL 专线方案','100G 月流量，便于做用量预算','提供优惠码 yt88，按实际结算金额比较'],
    focus:'100G 用量范围内的 IEPL 备选'
  },
  {
    id:'kunpeng', name:'鲲鹏加速', initial:'鲲', price:'12', traffic:'以套餐页公布为准', trafficGb:null,
    lines:'直连', tags:['12 元月付','低预算直连'], featured:false,
    coupon:null, article:'kunpeng-review',
    entry:'https://kunpengjiasu.com/#/register?code=Yd7XpCEQ',
    summary:'12 元月付的直连方案，比本页 18 元套餐少 6 元，适合预算优先的轻度用户。流量额度请在套餐页确认，目前暂无优惠码。',
    advantages:['12 元月付，四款中月付门槛最低','每月比 18 元套餐节省 6 元','适合先验证直连是否满足自己的网络需求'],
    focus:'优先控制月付成本的轻度用户'
  }
] as const;

export const providerUpdatedDate = '2026-11-02';
export const providerDisclosure = '套餐价格、流量、线路与优惠码由站点运营者提供，记录日期：2026-11-02。实际销售与优惠条件以结算页为准；外部注册链接含推广参数，本站可能获得推广收益。测评为套餐资料分析，未提供独立测速或解锁成绩。';
