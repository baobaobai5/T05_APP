import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  BadgeCheck,
  Check,
  ChevronDown,
  Coins,
  Copy,
  Crown,
  Gift,
  Headphones,
  MessageSquareText,
  ReceiptText,
  Search,
  ShieldBan,
  Smartphone,
  ScanLine,
  WalletCards,
  X,
} from 'lucide-react';
import { BottomNav } from './BottomNav';
import { TopBrandBar } from './TopBrandBar';

interface RechargePageProps {
  onOpenSearch?: () => void;
  onSelectPage?: (page: 'home' | 'history' | 'shelf' | 'wallet') => void;
}

interface RechargeOrder {
  id: string;
  title: string;
  type: 'vip' | 'coin';
  orderAmount: string;
  paidAmount: string;
  fee: string;
  orderNo: string;
  createdAt: string;
  paidAt?: string;
  canceledAt?: string;
  status: 'paid' | 'pending' | 'failed';
}

interface VipPackage {
  id: string;
  title: string;
  currentPrice: string;
  originalPrice: string;
}

interface BenefitItem {
  id: string;
  label: string;
  icon: typeof Crown;
}

interface CoinPackage {
  id: string;
  price: number;
  coins: string;
}

interface CoinRecordItem {
  id: string;
  title: string;
  amount: string;
  time: string;
}

function benefitText(type: RechargeOrder['type']) {
  return type === 'vip' ? '会员权益：会员内容免费' : '金币说明：可用于章节解锁与单本购买';
}

function validityText(type: RechargeOrder['type']) {
  return type === 'vip' ? '有效期：2026.01.01-2026.02.31' : '有效期：到账后永久有效';
}

const rechargeOrders: RechargeOrder[] = [
  {
    id: 'vip-1',
    title: '充值会员永久卡500元',
    type: 'vip',
    orderAmount: '500元',
    paidAmount: '505元',
    fee: '5元',
    orderNo: 'fd45464567897897',
    createdAt: '2025-11-02 02:02:02',
    paidAt: '2025-11-02 02:02:02',
    status: 'paid',
  },
  {
    id: 'vip-2',
    title: '会员套餐名称',
    type: 'vip',
    orderAmount: '100元',
    paidAmount: '105元',
    fee: '5元',
    orderNo: 'fd45464567897897',
    createdAt: '2025-11-03 02:02:02',
    status: 'pending',
  },
  {
    id: 'vip-3',
    title: '充值会员永久卡500元',
    type: 'vip',
    orderAmount: '500元',
    paidAmount: '505元',
    fee: '5元',
    orderNo: 'fd45464567897897',
    createdAt: '2025-11-01 02:02:02',
    canceledAt: '2025-11-01 02:02:02',
    status: 'failed',
  },
  {
    id: 'coin-1',
    title: '金币充值 6000',
    type: 'coin',
    orderAmount: '60元',
    paidAmount: '60元',
    fee: '0元',
    orderNo: 'gn23564567897897',
    createdAt: '2025-11-04 10:18:00',
    paidAt: '2025-11-04 10:18:12',
    status: 'paid',
  },
  {
    id: 'coin-2',
    title: '金币充值 12000',
    type: 'coin',
    orderAmount: '120元',
    paidAmount: '120元',
    fee: '0元',
    orderNo: 'gn23564567897898',
    createdAt: '2025-11-05 14:20:16',
    status: 'pending',
  },
];

const vipPackages: VipPackage[] = [
  { id: 'weekly', title: '周卡', currentPrice: '100元', originalPrice: '150元' },
  { id: 'monthly', title: '月卡', currentPrice: '180元', originalPrice: '260元' },
  { id: 'lifetime', title: '永久卡', currentPrice: '500元', originalPrice: '4000元' },
  { id: 'yearly', title: '年卡', currentPrice: '400元', originalPrice: '800元' },
  { id: 'season', title: '季卡', currentPrice: '260元', originalPrice: '500元' },
  { id: 'campus', title: '校园卡', currentPrice: '88元', originalPrice: '128元' },
];

const vipBenefits: BenefitItem[] = [
  { id: 'free', label: '会员免费', icon: Crown },
  { id: 'coin-free', label: '金币内容免费', icon: Coins },
  { id: 'gift-1', label: '赠送代币 x1000', icon: Gift },
  { id: 'gift-2', label: '赠送经验值 x1000', icon: BadgeCheck },
  { id: 'ad-free', label: '跳过广告', icon: ShieldBan },
  { id: 'zone', label: '禁区专属', icon: Crown },
  { id: 'comment', label: '评论', icon: MessageSquareText },
  { id: 'service', label: '专属客服', icon: Headphones },
  { id: 'post', label: '上传帖子', icon: Smartphone },
];

const coinPackages: CoinPackage[] = [
  { id: 'coin-30', price: 30, coins: '30币' },
  { id: 'coin-50', price: 50, coins: '50币' },
  { id: 'coin-100', price: 100, coins: '100币' },
  { id: 'coin-200', price: 200, coins: '200币' },
  { id: 'coin-300', price: 300, coins: '300币' },
  { id: 'coin-500', price: 500, coins: '500币' },
];

const coinRecords: CoinRecordItem[] = [
  { id: 'record-1', title: '充值：30元', amount: '+30', time: '支付时间：2025-11-02 02:02:02' },
  { id: 'record-2', title: '购买视频：视频标题', amount: '-30', time: '支付时间：2025-11-02 02:02:02' },
  { id: 'record-3', title: '兑换500AI积分', amount: '-50', time: '支付时间：2025-11-02 02:02:02' },
];

function RechargeHero({
  onOpenType,
}: {
  onOpenType: (value: 'vip' | 'coin') => void;
}) {
  const cards = [
    {
      id: 'vip' as const,
      title: 'VIP充值',
      subtitle: '解锁会员专属权益',
      icon: Crown,
      className:
        'from-[#5f63f2]/24 via-[#7c5df1]/14 to-transparent border-primary/20 shadow-[0_14px_30px_rgba(92,87,255,0.18)]',
    },
    {
      id: 'coin' as const,
      title: '金币充值',
      subtitle: '购买章节与单本内容',
      icon: Coins,
      className:
        'from-[#ff9b45]/22 via-[#ff7b3d]/12 to-transparent border-[#ff9b45]/20 shadow-[0_14px_30px_rgba(255,137,69,0.14)]',
    },
  ];

  return (
    <section className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <button
              key={card.id}
              onClick={() => onOpenType(card.id)}
              className="relative overflow-hidden rounded-[18px] border border-white/10 bg-card/88 p-4 text-left transition-all active:scale-[0.99]"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${card.className}`} />
              <div className="relative flex min-h-[98px] flex-col justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/8 bg-white/6">
                  <Icon className={`h-5 w-5 ${card.id === 'vip' ? 'text-[#ffd56a]' : 'text-[#ffb15f]'}`} />
                </div>
                <div>
                  <h2 className="text-[18px] font-semibold text-foreground/96">{card.title}</h2>
                  <p className="mt-1 text-[12px] text-muted-foreground">{card.subtitle}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function VipRechargePanel({ onReturnToOrders }: { onReturnToOrders: () => void }) {
  const [selectedPackage, setSelectedPackage] = useState<string>('lifetime');
  const [paymentMethod, setPaymentMethod] = useState<'alipay' | 'wechat'>('alipay');
  const [showConfirm, setShowConfirm] = useState(false);
  const [showPayPrompt, setShowPayPrompt] = useState(false);
  const [showPaymentQr, setShowPaymentQr] = useState(false);
  const [showPaymentResult, setShowPaymentResult] = useState(false);
  const selectedPackageInfo =
    vipPackages.find((item) => item.id === selectedPackage) ?? vipPackages[0];
  const payableAmount = Number(selectedPackageInfo.currentPrice.replace('元', ''));
  const qrSize = 13;

  return (
    <section className="rounded-[20px] border border-white/8 bg-card/90 p-4 shadow-[0_14px_32px_rgba(0,0,0,0.16)]">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-[linear-gradient(270deg,#121526_10%,rgba(18,21,38,0)_100%)]" />
        <div className="scrollbar-hide -mx-1 flex gap-3 overflow-x-auto px-1 pb-1 pr-8">
        {vipPackages.map((item) => {
          const isActive = selectedPackage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setSelectedPackage(item.id)}
              className={`min-w-[112px] rounded-[18px] border px-4 py-3 text-left transition-all active:scale-[0.99] ${
                isActive
                  ? 'border-primary/70 bg-primary/8 shadow-[0_10px_24px_rgba(92,87,255,0.18)]'
                  : 'border-white/8 bg-white/[0.03]'
              }`}
            >
              <div className="flex min-h-[96px] flex-col justify-between">
                <p className="text-[16px] font-medium text-foreground/92">{item.title}</p>
                <div>
                  <p className="text-[24px] font-semibold leading-none text-foreground/96">
                    {item.currentPrice}
                  </p>
                  <p className="mt-2 text-[12px] text-muted-foreground">原价：{item.originalPrice}</p>
                </div>
              </div>
            </button>
          );
        })}
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-[15px] font-medium text-foreground/92">权益描述</h3>
        <div className="mt-3 grid grid-cols-4 gap-x-3 gap-y-4">
          {vipBenefits.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.id} className="flex flex-col items-center text-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/8 bg-white/[0.04]">
                  <Icon className="h-5 w-5 text-primary/90" />
                </div>
                <p className="mt-2 text-[11px] leading-4 text-muted-foreground">{item.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-[15px] font-medium text-foreground/92">支付方式</h3>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <button
            onClick={() => setPaymentMethod('alipay')}
            className={`flex items-center justify-between rounded-2xl border px-4 py-3 transition-all active:scale-[0.99] ${
              paymentMethod === 'alipay'
                ? 'border-primary/60 bg-primary/8'
                : 'border-white/8 bg-white/[0.03]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/6">
                <WalletCards className="h-4.5 w-4.5 text-[#66a8ff]" />
              </div>
              <span className="text-[14px] text-foreground/92">支付宝</span>
            </div>
            <span
              className={`h-4 w-4 rounded-full border ${
                paymentMethod === 'alipay'
                  ? 'border-primary bg-primary shadow-[0_0_0_3px_rgba(92,87,255,0.18)]'
                  : 'border-white/24'
              }`}
            />
          </button>

          <button
            onClick={() => setPaymentMethod('wechat')}
            className={`flex items-center justify-between rounded-2xl border px-4 py-3 transition-all active:scale-[0.99] ${
              paymentMethod === 'wechat'
                ? 'border-primary/60 bg-primary/8'
                : 'border-white/8 bg-white/[0.03]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/6">
                <MessageSquareText className="h-4.5 w-4.5 text-[#5ed18a]" />
              </div>
              <span className="text-[14px] text-foreground/92">微信</span>
            </div>
            <span
              className={`h-4 w-4 rounded-full border ${
                paymentMethod === 'wechat'
                  ? 'border-primary bg-primary shadow-[0_0_0_3px_rgba(92,87,255,0.18)]'
                  : 'border-white/24'
              }`}
            />
          </button>
        </div>
      </div>

      <button
        onClick={() => setShowConfirm(true)}
        className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-full bg-primary-gradient px-6 text-[16px] font-medium text-white shadow-primary-glow transition-all active:scale-95"
      >
        购买会员
      </button>

      {showConfirm ? (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/58 px-6 backdrop-blur-sm">
          <div className="w-full max-w-[320px] overflow-hidden rounded-[22px] border border-white/8 bg-card/98 shadow-[0_24px_80px_rgba(0,0,0,0.4)]">
            <div className="px-5 pb-5 pt-6">
              <h3 className="text-center text-[18px] font-semibold text-foreground/96">温馨提示</h3>
              <div className="mt-5 space-y-3 text-[14px] leading-7 text-muted-foreground">
                <p>1.平台承诺，您的付款信息、会员信息完全加密，不会泄露您的任何信息，请安心付款。</p>
                <p>2.如果支付渠道无法付款，请退出后重新发起，或切换其他付款方式。</p>
                <p>3.如遇到充值未到账，请及时联系在线客服为您解决。</p>
              </div>
            </div>

            <div className="grid grid-cols-2 border-t border-white/8">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex h-12 items-center justify-center border-r border-white/8 text-[15px] text-foreground/76 transition-colors hover:bg-white/[0.03] hover:text-foreground/92"
              >
                取消
              </button>
              <button
                onClick={() => {
                  setShowConfirm(false);
                  setShowPayPrompt(true);
                }}
                className="flex h-12 items-center justify-center text-[15px] font-medium text-primary transition-colors hover:bg-primary/8"
              >
                确认充值
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {showPayPrompt ? (
        <div className="fixed inset-0 z-[121] flex items-center justify-center bg-black/58 px-6 backdrop-blur-sm">
          <div className="w-full max-w-[320px] overflow-hidden rounded-[22px] border border-white/8 bg-card/98 shadow-[0_24px_80px_rgba(0,0,0,0.4)]">
            <div className="px-5 pb-6 pt-6">
              <h3 className="text-center text-[18px] font-semibold text-foreground/96">提示</h3>
              <p className="mt-6 text-center text-[15px] leading-7 text-muted-foreground">
                订单创建成功，是否立即前往支付？
              </p>
            </div>

            <div className="grid grid-cols-2 border-t border-white/8">
              <button
                onClick={() => setShowPayPrompt(false)}
                className="flex h-12 items-center justify-center border-r border-white/8 text-[15px] text-foreground/76 transition-colors hover:bg-white/[0.03] hover:text-foreground/92"
              >
                取消
              </button>
              <button
                onClick={() => {
                  setShowPayPrompt(false);
                  setShowPaymentQr(true);
                }}
                className="flex h-12 items-center justify-center text-[15px] font-medium text-primary transition-colors hover:bg-primary/8"
              >
                确认
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {showPaymentQr ? (
        <div className="fixed inset-0 z-[122] bg-background">
          <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col bg-background">
            <div className="flex items-center justify-between border-b border-white/8 px-4 pb-3 pt-4">
              <button
                onClick={() => setShowPaymentQr(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/6 text-white/80 transition-all hover:bg-white/10 active:scale-95"
                aria-label="关闭支付页"
              >
                <ArrowLeft className="h-4.5 w-4.5" />
              </button>
              <div className="text-center">
                <p className="text-[16px] font-semibold text-foreground/96">
                  {paymentMethod === 'alipay' ? '支付宝扫码支付' : '微信扫码支付'}
                </p>
                <p className="mt-1 text-[12px] text-muted-foreground">请使用对应支付工具扫码完成付款</p>
              </div>
              <div className="w-9" />
            </div>

            <div className="flex flex-1 flex-col items-center px-6 py-6">
              <div className="w-full rounded-[24px] border border-white/8 bg-card/90 px-5 py-6 shadow-[0_16px_42px_rgba(0,0,0,0.22)]">
                <p className="text-center text-[42px] font-semibold tracking-tight text-foreground/96">
                  ¥{payableAmount.toFixed(2)}
                </p>

                <div className="mt-6 flex justify-center">
                  <div className="rounded-[28px] border border-white/8 bg-white p-4 shadow-[0_20px_36px_rgba(0,0,0,0.18)]">
                    <div
                      className="grid gap-[3px] rounded-[10px] bg-white"
                      style={{ gridTemplateColumns: `repeat(${qrSize}, minmax(0, 1fr))` }}
                    >
                      {Array.from({ length: qrSize * qrSize }, (_, index) => {
                        const row = Math.floor(index / qrSize);
                        const col = index % qrSize;
                        const inTopLeft = row < 4 && col < 4;
                        const inTopRight = row < 4 && col > qrSize - 5;
                        const inBottomLeft = row > qrSize - 5 && col < 4;
                        const finder =
                          inTopLeft ||
                          inTopRight ||
                          inBottomLeft;
                        const innerFinder =
                          (row === 1 || row === 2) &&
                          (col === 1 || col === 2) &&
                          col < 4 &&
                          row < 4;
                        const topRightInner =
                          (row === 1 || row === 2) &&
                          (col === qrSize - 3 || col === qrSize - 2);
                        const bottomLeftInner =
                          (row === qrSize - 3 || row === qrSize - 2) &&
                          (col === 1 || col === 2);
                        const filled =
                          finder ||
                          innerFinder ||
                          topRightInner ||
                          bottomLeftInner ||
                          ((row * 5 + col * 7 + row * col) % 3 === 0 &&
                            !(row === 6 && col > 2 && col < 10));

                        return (
                          <span
                            key={`${row}-${col}`}
                            className={`h-3 w-3 rounded-[2px] ${filled ? 'bg-black' : 'bg-white'}`}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>

                <button className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-full bg-primary-gradient px-6 text-[15px] font-medium text-white shadow-primary-glow transition-all active:scale-95">
                  {paymentMethod === 'alipay' ? '打开支付宝APP继续付款' : '打开微信继续付款'}
                </button>

                <button
                  onClick={() => {
                    setShowPaymentResult(true);
                  }}
                  className="mt-3 block w-full text-center text-[14px] text-primary/90 transition-colors hover:text-primary"
                >
                  我已付款，返回查看订单
                </button>

                <div className="mt-4 flex justify-center">
                  <button className="flex h-8 w-12 items-center justify-center rounded-xl border border-white/8 bg-white/[0.03] text-muted-foreground transition-colors hover:text-foreground/88">
                    <ChevronDown className="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>

              <div className="mt-5 flex w-full items-start gap-3 rounded-[18px] border border-white/8 bg-card/72 px-4 py-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <ScanLine className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[15px] font-medium text-foreground/92">
                    请使用{paymentMethod === 'alipay' ? '支付宝' : '微信'}扫一扫
                  </p>
                  <p className="mt-1 text-[13px] leading-6 text-muted-foreground">
                    扫描二维码完成支付，支付完成后可返回订单页查看状态。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {showPaymentResult ? (
        <div className="fixed inset-0 z-[123] flex items-center justify-center bg-black/58 px-6 backdrop-blur-sm">
          <div className="w-full max-w-[320px] overflow-hidden rounded-[22px] border border-white/8 bg-card/98 shadow-[0_24px_80px_rgba(0,0,0,0.4)]">
            <div className="px-5 pb-6 pt-6">
              <h3 className="text-center text-[18px] font-semibold text-foreground/96">
                确认支付结果
              </h3>
              <p className="mt-6 text-center text-[15px] leading-7 text-muted-foreground">
                支付后，若30分钟未到账，请点击【在线客服】上传支付凭证为您处理
              </p>
            </div>

            <div className="border-t border-white/8">
              <button
                onClick={() => {
                  setShowPaymentResult(false);
                  setShowPaymentQr(false);
                  onReturnToOrders();
                }}
                className="flex h-12 w-full items-center justify-center text-[15px] font-medium text-primary transition-colors hover:bg-primary/8"
              >
                确定
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function CoinRechargePanel({ onReturnToOrders }: { onReturnToOrders: () => void }) {
  const [selectedPackage, setSelectedPackage] = useState<string>('coin-30');
  const [paymentMethod, setPaymentMethod] = useState<'alipay' | 'wechat'>('alipay');
  const [showConfirm, setShowConfirm] = useState(false);
  const [showPayPrompt, setShowPayPrompt] = useState(false);
  const [showPaymentQr, setShowPaymentQr] = useState(false);
  const [showPaymentResult, setShowPaymentResult] = useState(false);
  const selectedPackageInfo =
    coinPackages.find((item) => item.id === selectedPackage) ?? coinPackages[0];
  const qrSize = 13;

  return (
    <section className="space-y-5">
      <div className="overflow-hidden rounded-[20px] border border-primary/15 bg-primary-gradient p-[1px] shadow-[0_16px_36px_rgba(92,87,255,0.18)]">
        <div className="rounded-[19px] bg-[linear-gradient(180deg,rgba(120,102,255,0.28),rgba(29,31,53,0.96))] px-5 py-5">
          <p className="text-[14px] text-white/70">金币余额</p>
          <p className="mt-2 text-[38px] font-semibold leading-none text-white">0</p>
          <p className="mt-2 text-[12px] text-white/56">可用于章节解锁、单本内容购买和礼物打赏</p>
        </div>
      </div>

      <div>
        <h3 className="text-[15px] font-medium text-foreground/92">
          请选择充值金额 <span className="text-[12px] text-primary/82">（1金币=1人民币）</span>
        </h3>
        <div className="mt-3 grid grid-cols-3 gap-3">
          {coinPackages.map((item) => {
            const isActive = selectedPackage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setSelectedPackage(item.id)}
                className={`rounded-[18px] border px-3 py-4 text-center transition-all active:scale-[0.99] ${
                  isActive
                    ? 'border-primary/70 bg-primary-gradient shadow-[0_12px_26px_rgba(92,87,255,0.2)]'
                    : 'border-white/8 bg-card/86'
                }`}
              >
                <p className={`text-[18px] font-semibold ${isActive ? 'text-white' : 'text-foreground/94'}`}>
                  ¥ {item.price}
                </p>
                <p className={`mt-1 text-[13px] ${isActive ? 'text-white/88' : 'text-muted-foreground'}`}>
                  {item.coins}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-[15px] font-medium text-foreground/92">支付方式</h3>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <button
            onClick={() => setPaymentMethod('alipay')}
            className={`flex items-center justify-between rounded-2xl border px-4 py-3 transition-all active:scale-[0.99] ${
              paymentMethod === 'alipay'
                ? 'border-primary/60 bg-primary/8'
                : 'border-white/8 bg-white/[0.03]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/6">
                <WalletCards className="h-4.5 w-4.5 text-[#66a8ff]" />
              </div>
              <span className="text-[14px] text-foreground/92">支付宝</span>
            </div>
            <span
              className={`h-4 w-4 rounded-full border ${
                paymentMethod === 'alipay'
                  ? 'border-primary bg-primary shadow-[0_0_0_3px_rgba(92,87,255,0.18)]'
                  : 'border-white/24'
              }`}
            />
          </button>

          <button
            onClick={() => setPaymentMethod('wechat')}
            className={`flex items-center justify-between rounded-2xl border px-4 py-3 transition-all active:scale-[0.99] ${
              paymentMethod === 'wechat'
                ? 'border-primary/60 bg-primary/8'
                : 'border-white/8 bg-white/[0.03]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/6">
                <MessageSquareText className="h-4.5 w-4.5 text-[#5ed18a]" />
              </div>
              <span className="text-[14px] text-foreground/92">微信</span>
            </div>
            <span
              className={`h-4 w-4 rounded-full border ${
                paymentMethod === 'wechat'
                  ? 'border-primary bg-primary shadow-[0_0_0_3px_rgba(92,87,255,0.18)]'
                  : 'border-white/24'
              }`}
            />
          </button>
        </div>
      </div>

      <button
        onClick={() => setShowConfirm(true)}
        className="inline-flex h-11 w-full items-center justify-center rounded-full bg-primary-gradient px-6 text-[16px] font-medium text-white shadow-primary-glow transition-all active:scale-95"
      >
        购买金币
      </button>

      {showConfirm ? (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/58 px-6 backdrop-blur-sm">
          <div className="w-full max-w-[320px] overflow-hidden rounded-[22px] border border-white/8 bg-card/98 shadow-[0_24px_80px_rgba(0,0,0,0.4)]">
            <div className="px-5 pb-5 pt-6">
              <h3 className="text-center text-[18px] font-semibold text-foreground/96">温馨提示</h3>
              <div className="mt-5 space-y-3 text-[14px] leading-7 text-muted-foreground">
                <p>1.平台承诺，您的付款信息、账户信息将全程加密，请安心付款。</p>
                <p>2.如果支付渠道无法付款，请退出后重新发起，或切换其他付款方式。</p>
                <p>3.如遇到充值未到账，请及时联系在线客服为您解决。</p>
              </div>
            </div>

            <div className="grid grid-cols-2 border-t border-white/8">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex h-12 items-center justify-center border-r border-white/8 text-[15px] text-foreground/76 transition-colors hover:bg-white/[0.03] hover:text-foreground/92"
              >
                取消
              </button>
              <button
                onClick={() => {
                  setShowConfirm(false);
                  setShowPayPrompt(true);
                }}
                className="flex h-12 items-center justify-center text-[15px] font-medium text-primary transition-colors hover:bg-primary/8"
              >
                确认充值
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {showPayPrompt ? (
        <div className="fixed inset-0 z-[121] flex items-center justify-center bg-black/58 px-6 backdrop-blur-sm">
          <div className="w-full max-w-[320px] overflow-hidden rounded-[22px] border border-white/8 bg-card/98 shadow-[0_24px_80px_rgba(0,0,0,0.4)]">
            <div className="px-5 pb-6 pt-6">
              <h3 className="text-center text-[18px] font-semibold text-foreground/96">提示</h3>
              <p className="mt-6 text-center text-[15px] leading-7 text-muted-foreground">
                订单创建成功，是否立即前往支付？
              </p>
            </div>

            <div className="grid grid-cols-2 border-t border-white/8">
              <button
                onClick={() => setShowPayPrompt(false)}
                className="flex h-12 items-center justify-center border-r border-white/8 text-[15px] text-foreground/76 transition-colors hover:bg-white/[0.03] hover:text-foreground/92"
              >
                取消
              </button>
              <button
                onClick={() => {
                  setShowPayPrompt(false);
                  setShowPaymentQr(true);
                }}
                className="flex h-12 items-center justify-center text-[15px] font-medium text-primary transition-colors hover:bg-primary/8"
              >
                确认
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {showPaymentQr ? (
        <div className="fixed inset-0 z-[122] bg-background">
          <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col bg-background">
            <div className="flex items-center justify-between border-b border-white/8 px-4 pb-3 pt-4">
              <button
                onClick={() => setShowPaymentQr(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/6 text-white/80 transition-all hover:bg-white/10 active:scale-95"
                aria-label="关闭支付页"
              >
                <ArrowLeft className="h-4.5 w-4.5" />
              </button>
              <div className="text-center">
                <p className="text-[16px] font-semibold text-foreground/96">
                  {paymentMethod === 'alipay' ? '支付宝扫码支付' : '微信扫码支付'}
                </p>
                <p className="mt-1 text-[12px] text-muted-foreground">请使用对应支付工具扫码完成付款</p>
              </div>
              <div className="w-9" />
            </div>

            <div className="flex flex-1 flex-col items-center px-6 py-6">
              <div className="w-full rounded-[24px] border border-white/8 bg-card/90 px-5 py-6 shadow-[0_16px_42px_rgba(0,0,0,0.22)]">
                <p className="text-center text-[42px] font-semibold tracking-tight text-foreground/96">
                  ¥{selectedPackageInfo.price.toFixed(2)}
                </p>

                <div className="mt-6 flex justify-center">
                  <div className="rounded-[28px] border border-white/8 bg-white p-4 shadow-[0_20px_36px_rgba(0,0,0,0.18)]">
                    <div
                      className="grid gap-[3px] rounded-[10px] bg-white"
                      style={{ gridTemplateColumns: `repeat(${qrSize}, minmax(0, 1fr))` }}
                    >
                      {Array.from({ length: qrSize * qrSize }, (_, index) => {
                        const row = Math.floor(index / qrSize);
                        const col = index % qrSize;
                        const inTopLeft = row < 4 && col < 4;
                        const inTopRight = row < 4 && col > qrSize - 5;
                        const inBottomLeft = row > qrSize - 5 && col < 4;
                        const finder = inTopLeft || inTopRight || inBottomLeft;
                        const innerFinder =
                          (row === 1 || row === 2) &&
                          (col === 1 || col === 2) &&
                          col < 4 &&
                          row < 4;
                        const topRightInner =
                          (row === 1 || row === 2) &&
                          (col === qrSize - 3 || col === qrSize - 2);
                        const bottomLeftInner =
                          (row === qrSize - 3 || row === qrSize - 2) &&
                          (col === 1 || col === 2);
                        const filled =
                          finder ||
                          innerFinder ||
                          topRightInner ||
                          bottomLeftInner ||
                          ((row * 5 + col * 7 + row * col) % 3 === 0 &&
                            !(row === 6 && col > 2 && col < 10));

                        return (
                          <span
                            key={`${row}-${col}`}
                            className={`h-3 w-3 rounded-[2px] ${filled ? 'bg-black' : 'bg-white'}`}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>

                <button className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-full bg-primary-gradient px-6 text-[15px] font-medium text-white shadow-primary-glow transition-all active:scale-95">
                  {paymentMethod === 'alipay' ? '打开支付宝APP继续付款' : '打开微信继续付款'}
                </button>

                <button
                  onClick={() => setShowPaymentResult(true)}
                  className="mt-3 block w-full text-center text-[14px] text-primary/90 transition-colors hover:text-primary"
                >
                  我已付款，返回查看订单
                </button>

                <div className="mt-4 flex justify-center">
                  <button className="flex h-8 w-12 items-center justify-center rounded-xl border border-white/8 bg-white/[0.03] text-muted-foreground transition-colors hover:text-foreground/88">
                    <ChevronDown className="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>

              <div className="mt-5 flex w-full items-start gap-3 rounded-[18px] border border-white/8 bg-card/72 px-4 py-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <ScanLine className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[15px] font-medium text-foreground/92">
                    请使用{paymentMethod === 'alipay' ? '支付宝' : '微信'}扫一扫
                  </p>
                  <p className="mt-1 text-[13px] leading-6 text-muted-foreground">
                    扫描二维码完成支付，支付完成后可返回订单页查看状态。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {showPaymentResult ? (
        <div className="fixed inset-0 z-[123] flex items-center justify-center bg-black/58 px-6 backdrop-blur-sm">
          <div className="w-full max-w-[320px] overflow-hidden rounded-[22px] border border-white/8 bg-card/98 shadow-[0_24px_80px_rgba(0,0,0,0.4)]">
            <div className="px-5 pb-6 pt-6">
              <h3 className="text-center text-[18px] font-semibold text-foreground/96">
                确认支付结果
              </h3>
              <p className="mt-6 text-center text-[15px] leading-7 text-muted-foreground">
                支付后，若30分钟未到账，请点击【在线客服】上传支付凭证为您处理
              </p>
            </div>

            <div className="border-t border-white/8">
              <button
                onClick={() => {
                  setShowPaymentResult(false);
                  setShowPaymentQr(false);
                  onReturnToOrders();
                }}
                className="flex h-12 w-full items-center justify-center text-[15px] font-medium text-primary transition-colors hover:bg-primary/8"
              >
                确定
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function CoinRecordsPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="pb-6">
      <RechargeSubPageHeader title="金币记录" onBack={onBack} />
      <main className="space-y-3 px-4 pt-4">
        {coinRecords.map((item) => (
          <article
            key={item.id}
            className="rounded-[18px] border border-white/8 bg-card/90 px-4 py-4 shadow-[0_14px_32px_rgba(0,0,0,0.16)]"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-[16px] font-medium text-foreground/94">{item.title}</h3>
              <span
                className={`text-[18px] font-semibold ${
                  item.amount.startsWith('+') ? 'text-[#7adf65]' : 'text-foreground/92'
                }`}
              >
                {item.amount}
              </span>
            </div>
            <p className="mt-3 text-[13px] text-muted-foreground">{item.time}</p>
          </article>
        ))}
      </main>
    </div>
  );
}

function RechargeSubPageHeader({
  title,
  onBack,
  rightLabel,
  onRightAction,
}: {
  title: string;
  onBack: () => void;
  rightLabel?: string;
  onRightAction?: () => void;
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/8 bg-background/94 backdrop-blur-2xl">
      <div className="flex items-center justify-between gap-3 px-4 pb-3 pt-3">
        <button
          onClick={onBack}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/6 text-white/80 transition-all hover:bg-white/10 active:scale-95"
          aria-label="返回"
        >
          <ArrowLeft className="h-4.5 w-4.5" />
        </button>
        <div className="flex-1">
          <h1 className="text-[18px] font-semibold text-foreground/96">{title}</h1>
          <p className="text-[12px] text-muted-foreground">选择套餐并完成支付</p>
        </div>
        {rightLabel ? (
          <div className="flex items-center gap-3">
            <button
              onClick={onRightAction}
              className="text-[13px] text-muted-foreground transition-colors hover:text-foreground/88"
            >
              {rightLabel}
            </button>
            <button
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/6 text-white/72 transition-colors hover:bg-white/10 hover:text-white/90"
              aria-label={`${title}搜索`}
            >
              <Search className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="w-9" />
        )}
      </div>
    </header>
  );
}

function OrderTabs({
  activeOrderType,
  onOrderTypeChange,
}: {
  activeOrderType: 'vip' | 'coin';
  onOrderTypeChange: (value: 'vip' | 'coin') => void;
}) {
  const tabs = [
    { id: 'vip' as const, label: 'VIP订单' },
    { id: 'coin' as const, label: '金币订单' },
  ];

  return (
    <div className="flex items-center gap-4 border-b border-white/8 pb-1">
      {tabs.map((tab) => {
        const isActive = activeOrderType === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onOrderTypeChange(tab.id)}
            className={`relative pb-2 text-[15px] transition-colors ${
              isActive ? 'font-semibold text-foreground' : 'text-muted-foreground'
            }`}
          >
            {tab.label}
            {isActive ? (
              <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-primary" />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

function statusMeta(status: RechargeOrder['status']) {
  if (status === 'paid') return { label: '已支付', className: 'text-[#7adf65]' };
  if (status === 'pending') return { label: '待支付', className: 'text-[#ff6a6a]' };
  return { label: '支付失败', className: 'text-foreground/92' };
}

function OrderCard({
  order,
  onViewDetail,
}: {
  order: RechargeOrder;
  onViewDetail: (order: RechargeOrder) => void;
}) {
  const status = statusMeta(order.status);

  return (
    <article className="rounded-[18px] border border-white/8 bg-card/90 p-4 shadow-[0_14px_32px_rgba(0,0,0,0.16)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-[20px] font-semibold text-foreground/96">{order.title}</h3>
        </div>
        <span className={`text-[16px] font-semibold ${status.className}`}>{status.label}</span>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-[14px] text-muted-foreground">
        <p>订单金额：{order.orderAmount}</p>
        <p className="truncate">订单编号：{order.orderNo} <span className="text-foreground/72">复制</span></p>
        <p>支付金额：{order.paidAmount}</p>
        <p>订单创建时间：{order.createdAt}</p>
        <p>手续费：{order.fee}</p>
        {order.status === 'paid' && order.paidAt ? <p>订单支付时间：{order.paidAt}</p> : null}
        {order.status === 'failed' && order.canceledAt ? <p>订单取消时间：{order.canceledAt}</p> : null}
      </div>

      <div className="mt-4 flex items-center justify-end gap-3">
        {order.status === 'pending' ? (
          <>
            <button
              onClick={() => onViewDetail(order)}
              className="text-[13px] font-medium text-foreground/72 transition-colors hover:text-foreground/92"
            >
              查看详情
            </button>
            <button className="inline-flex h-10 min-w-[132px] items-center justify-center rounded-full bg-primary-gradient px-6 text-[16px] font-medium text-white shadow-primary-glow transition-all active:scale-95">
              去支付
            </button>
          </>
        ) : (
          <button
            onClick={() => onViewDetail(order)}
            className="text-[13px] font-medium text-foreground/72 transition-colors hover:text-foreground/92"
          >
            查看详情
          </button>
        )}
      </div>
    </article>
  );
}

function RechargeDetailModal({
  order,
  onClose,
}: {
  order: RechargeOrder;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const status = statusMeta(order.status);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(order.orderNo);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/58 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-[398px] rounded-[22px] border border-white/8 bg-card/98 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.4)]">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/6 text-white/60 transition-colors hover:bg-white/10 hover:text-white/88"
          aria-label="关闭"
        >
          <X className="h-4.5 w-4.5" />
        </button>

        <div className="pb-3 pt-1 text-center">
          <h2 className="text-[22px] font-semibold text-foreground/96">查看详情</h2>
        </div>

        <div className="space-y-3">
          <section className="rounded-2xl border border-white/8 bg-white/[0.04] p-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <ReceiptText className="h-4 w-4 text-primary" />
                  <p className="text-[16px] font-medium text-foreground/94">{order.title}</p>
                </div>
                <div className="mt-3 space-y-1.5 text-[13px] text-muted-foreground">
                  <p>订单金额：{order.orderAmount}</p>
                  <p>支付金额：{order.paidAmount}</p>
                  <p>手续费：{order.fee}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[12px] text-muted-foreground">状态</p>
                <p className={`mt-1 text-[16px] font-semibold ${status.className}`}>{status.label}</p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-white/8 bg-white/[0.04] p-3">
            <p className="text-[15px] font-medium text-foreground/92">明细</p>
            <div className="mt-2 space-y-1.5 text-[13px] text-muted-foreground">
              <p>{validityText(order.type)}</p>
              <p>{benefitText(order.type)}</p>
            </div>
          </section>

          <section className="rounded-2xl border border-white/8 bg-white/[0.04] p-3">
            <div className="space-y-2 text-[13px] text-muted-foreground">
              <div className="flex items-center justify-between gap-3">
                <p className="min-w-0 truncate">订单编号：{order.orderNo}</p>
                <button
                  onClick={handleCopy}
                  className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white/6 px-2.5 py-1 text-[12px] text-foreground/78 transition-colors hover:bg-white/10"
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? '已复制' : '复制'}
                </button>
              </div>
              <p>购买方式：用户ID</p>
              <p>支付方式：支付宝</p>
              <p>订单创建时间：{order.createdAt}</p>
              {order.paidAt ? <p>订单支付时间：{order.paidAt}</p> : null}
              {order.canceledAt ? <p>订单取消时间：{order.canceledAt}</p> : null}
            </div>
          </section>

          {order.status === 'pending' ? (
            <button className="inline-flex h-11 w-full items-center justify-center rounded-full bg-primary-gradient px-6 text-[16px] font-medium text-white shadow-primary-glow transition-all active:scale-95">
              去支付
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function RechargePage({ onOpenSearch, onSelectPage }: RechargePageProps) {
  const [currentView, setCurrentView] = useState<'overview' | 'vip' | 'coin' | 'coinRecords'>('overview');
  const [activeOrderType, setActiveOrderType] = useState<'vip' | 'coin'>('vip');
  const [detailOrder, setDetailOrder] = useState<RechargeOrder | null>(null);

  const visibleOrders = useMemo(
    () => rechargeOrders.filter((item) => item.type === activeOrderType),
    [activeOrderType],
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {currentView === 'overview' ? (
        <>
          <header className="fixed left-1/2 top-0 z-[70] w-full max-w-[430px] -translate-x-1/2 border-b border-border/40 bg-background/92 backdrop-blur-2xl">
            <div className="px-4 pb-2.5 pt-3">
              <TopBrandBar />
            </div>
          </header>

        <main className="px-4 pb-24 pt-[68px]">
          <RechargeHero onOpenType={setCurrentView} />

          <section className="mt-5 space-y-4">
            <OrderTabs activeOrderType={activeOrderType} onOrderTypeChange={setActiveOrderType} />

            <div className="space-y-4">
              {visibleOrders.map((order) => (
                <OrderCard key={order.id} order={order} onViewDetail={setDetailOrder} />
              ))}
            </div>
          </section>
        </main>
        </>
      ) : currentView === 'coinRecords' ? (
        <CoinRecordsPage onBack={() => setCurrentView('coin')} />
      ) : (
        <div className="pb-24">
          <RechargeSubPageHeader
            title={currentView === 'vip' ? 'VIP充值' : '金币充值'}
            onBack={() => setCurrentView('overview')}
            rightLabel={currentView === 'coin' ? '金币记录' : undefined}
            onRightAction={currentView === 'coin' ? () => setCurrentView('coinRecords') : undefined}
          />
          <main className="px-4 pb-6 pt-4">
            {currentView === 'vip' ? (
              <VipRechargePanel
                onReturnToOrders={() => {
                  setCurrentView('overview');
                  setActiveOrderType('vip');
                }}
              />
            ) : (
              <CoinRechargePanel
                onReturnToOrders={() => {
                  setCurrentView('overview');
                  setActiveOrderType('coin');
                }}
              />
            )}
          </main>
        </div>
      )}

      {detailOrder ? (
        <RechargeDetailModal order={detailOrder} onClose={() => setDetailOrder(null)} />
      ) : null}

      {currentView === 'overview' ? (
        <BottomNav
          onOpenSearch={onOpenSearch}
          onSelectPage={onSelectPage}
          activePage="wallet"
        />
      ) : null}
    </div>
  );
}
