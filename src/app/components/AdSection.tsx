import { X, Zap, Gift, ShoppingBag } from 'lucide-react';
import { useState } from 'react';

interface AdSectionProps {
  variant?: 'default' | 'compact' | 'banner';
}

export function AdSection({ variant = 'default' }: AdSectionProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed && variant === 'banner') return null;

  if (variant === 'compact') {
    return (
      <div className="px-4">
        <div className="bg-primary-gradient-soft relative flex items-center gap-3 p-3.5 rounded-2xl border border-primary/15">
          <div className="bg-primary-gradient-soft w-9 h-9 flex items-center justify-center rounded-xl flex-shrink-0 border border-white/10">
            <Zap className="w-4.5 h-4.5 text-primary" style={{ width: 18, height: 18 }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground mb-0.5">赞助推广</p>
            <p className="text-sm leading-tight">会员专享：每日精选内容免费看</p>
          </div>
          <button className="bg-primary-gradient flex-shrink-0 px-3 py-1.5 text-white rounded-xl text-xs shadow-md shadow-primary/25 active:scale-95 transition-transform">
            了解
          </button>
          <span className="absolute top-1.5 right-2 text-[10px] text-muted-foreground/50">广告</span>
        </div>
      </div>
    );
  }

  if (variant === 'banner') {
    return (
      <div className="px-4">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500/90 to-orange-500/90 p-4 shadow-lg shadow-amber-500/20">
          <button
            onClick={() => setDismissed(true)}
            className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center rounded-full bg-black/20"
          >
            <X className="w-3 h-3 text-white" />
          </button>
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <Gift className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-white/80 text-xs mb-0.5">限时特惠</p>
              <h4 className="text-white text-sm mb-1">新人首月会员 ¥0.01</h4>
              <p className="text-white/70 text-xs">解锁全部高级功能，无限创作</p>
            </div>
            <button className="flex-shrink-0 px-3.5 py-2 bg-white text-orange-500 rounded-xl text-sm active:scale-95 transition-transform">
              立即抢
            </button>
          </div>
          <span className="absolute bottom-1.5 right-3 text-[10px] text-white/40">广告</span>
        </div>
      </div>
    );
  }

  // default — 3-column ad grid
  const ads = [
    { icon: ShoppingBag, title: '限时优惠', tag: '折扣', from: '#4950de', to: '#775af0' },
    { icon: Gift, title: '新品首发', tag: '新品', from: '#3b82f6', to: '#60a5fa' },
    { icon: Zap, title: '精选推荐', tag: '热门', from: '#f59e0b', to: '#fbbf24' },
  ];

  return (
    <div className="px-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-muted-foreground">推荐推广</p>
        <span className="text-[10px] text-muted-foreground/50 border border-border/60 px-1.5 py-0.5 rounded">广告</span>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        {ads.map((ad, i) => {
          const Icon = ad.icon;
          return (
            <div
              key={i}
              className="p-3 bg-card rounded-2xl border border-border/40 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/8 transition-all active:scale-[0.97] cursor-pointer group"
            >
              <div
                className="aspect-square rounded-xl mb-2.5 flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${ad.from}20 0%, ${ad.to}30 100%)` }}
              >
                <Icon
                  className="group-hover:scale-110 transition-transform"
                  style={{ color: ad.from, width: 28, height: 28 }}
                />
              </div>
              <p className="text-xs mb-1 line-clamp-1 text-center">{ad.title}</p>
              <span
                className="inline-flex w-full justify-center px-2 py-0.5 text-[10px] rounded-md"
                style={{ color: ad.from, background: `${ad.from}15` }}
              >
                {ad.tag}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
