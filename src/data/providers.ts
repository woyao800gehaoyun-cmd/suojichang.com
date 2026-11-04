export const providers = [
  {
    id:'guangnianti', name:'光年梯机场', initial:'光', price:'15', traffic:'120 GB / 月', trafficGb:120,
    lines:'IEPL 专线', tags:['本站主推','15 元月付','IEPL 专线'], featured:true,
    coupon:'GNT80', article:'guangnianti-review',
    entry:'https://Rumors.gntaff.com/#/?code=Mclks3w5',
    summary:'15元月付、120G月流量、IEPL专线。相比极连云和瞬云的18元100G套餐，月费少3元、流量多20G，兼顾月付门槛与流量余量，是本站主推选择。',
    advantages:['15元月付，比18元套餐每月少3元','120G月流量，比100G套餐多20G','IEPL专线，套餐额度折算约0.125元/GB'],
    focus:'优先兼顾专线、月付成本与流量余量'
  },
  {
    id:'yuntu', name:'云图机场', initial:'云', price:'20', traffic:'150 GB / 月', trafficGb:150,
    lines:'IEPL 专线', tags:['IEPL 专线','150G 流量'], featured:false,
    coupon:'yt88', article:'yuntu-review',
    entry:'https://super.ytjcok.org/#/register?code=COsTypDq',
    summary:'20元月付、150G月流量、IEPL专线。比光年梯多5元、多30G额度，适合120G不够、希望在20元预算内增加流量的用户。',
    advantages:['150G月流量，较适合中等用量','20元月付IEPL专线方案','优惠码yt88，实际优惠以结算为准'],
    focus:'希望增加月流量的IEPL候选'
  },
  {
    id:'jilianyun', name:'极连云机场', initial:'极', price:'18', traffic:'100 GB / 月', trafficGb:100,
    lines:'待核实', tags:['18 元月付','100G 流量'], featured:false,
    coupon:'JLY888', article:'jilianyun-review',
    entry:'https://haozevpn.jlyvipaff.com/#/?code=KUKfOY13',
    summary:'18元月付、100G月流量，优惠码JLY888。适合每月100G足够、希望比较入口与客户端体验的用户；线路类别与设备规则以服务页面为准。',
    advantages:['18元月付，100G额度明确','提供优惠码JLY888','可按短周期验证自己的应用需求'],
    focus:'100G用量范围内的月付候选'
  },
  {
    id:'shunyun', name:'瞬云机场', initial:'瞬', price:'18', traffic:'100 GB / 月', trafficGb:100,
    lines:'IPLC 专线', tags:['IPLC 专线','18 元月付'], featured:false,
    coupon:'20OFF', article:'shunyun-review',
    entry:'https://ddd.jichang.best/#/register?code=SWAVvMOV',
    summary:'18元月付、100G流量，主打IPLC专线。适合在相近预算下比较IPLC方案的用户，优惠码20OFF，具体折扣与适用条件以结算页为准。',
    advantages:['IPLC专线方案','18元月付，100G额度明确','提供优惠码20OFF'],
    focus:'希望对照IPLC线路的用户'
  },
  {
    id:'bianjieyun', name:'边界云', initial:'界', price:'189', billing:'year', monthlyEquivalent:'15.75', traffic:'100 GB / 月', trafficGb:100,
    lines:'优化线路（套餐页标注）', tags:['189 元年付','每月100G','VLESS + Reality'], featured:false,
    coupon:'BJAPP', article:'bianjieyun-review',
    entry:'https://www.bianjiecloud.com/r/GCYFYL',
    summary:'云帆套餐189元/年，折合15.75元/月，每月100G，优惠码BJAPP。套餐图标注VLESS + Reality、TCP/UDP和不限设备；实际需一次支付年费，非平台原因不退款。',
    advantages:['每月100G，按月订单日重置','套餐标注主流客户端及TCP/UDP支持','189元年付，折合15.75元/月'],
    focus:'可接受年付及退款条件、100G够用的用户'
  },
  {
    id:'edge-nodes', name:'边缘节点', initial:'边', price:'25', traffic:'110 GB / 月', trafficGb:110,
    lines:'待核实', tags:['25 元月付','110G 流量'], featured:false,
    coupon:'xk808', article:'edge-nodes-review',
    entry:'https://cbfdd.lonka.click/#/?code=4wmwcLDL',
    summary:'25元月付、110G月流量，优惠码xk808。适合明确需要比较该服务节点的用户；价格高于本页15至20元月付套餐，建议结合实际应用与支持规则判断。',
    advantages:['110G月流量，便于核对用量','提供优惠码xk808','节点覆盖与线路类型需进一步核对'],
    focus:'有明确节点或使用需求后再比较'
  },
  {
    id:'kunpeng', name:'鲲鹏加速', initial:'鲲', price:'12', traffic:'以套餐页公布为准', trafficGb:null,
    lines:'直连', tags:['12 元月付','低预算直连'], featured:false,
    coupon:null, article:'kunpeng-review',
    entry:'https://kunpengjiasu.com/#/register?code=Yd7XpCEQ',
    summary:'12元月付的直连方案，比光年梯15元套餐每月少3元，适合预算优先的轻度用户。流量额度以套餐页为准，目前暂无优惠码。',
    advantages:['12元月付，已知月付套餐中门槛最低','比15元套餐每月少3元','先验证直连是否适合自己的网络'],
    focus:'优先控制月付成本的轻度用户'
  }
] as const;

export const providerUpdatedDate = '2026-11-04';
export const providerDisclosure = '套餐资料更新于2026-11-04，由站点运营者提供；边界云以所提供云帆套餐截图为依据，189元为年付总价，15.75元为折合月价。实际销售、倍率与优惠条件以结算页为准。极连云和边缘节点的线路类型仍待核实。外部注册链接含推广参数，本站可能获得推广收益；测评未提供独立测速或解锁成绩。';
type PriceInfo = {price:string|null;billing?:string;monthlyEquivalent?:string};
export const providerPrice = (p:PriceInfo) => !p.price ? '价格待核实' : p.billing==='year' ? '¥'+p.price+'/年（折合¥'+p.monthlyEquivalent+'/月）' : '¥'+p.price+'/月';
export const providerCoupon = (p: {coupon:string|null;couponStatus?:string}) => p.coupon || p.couponStatus || '暂无优惠码';
