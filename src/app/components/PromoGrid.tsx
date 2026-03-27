import { Crown, Gift, Sparkles, Smartphone } from 'lucide-react';

const promoItems = [
  {
    id: 1,
    title: '会员限免',
    desc: '开通即领 7 天畅读权益',
    cta: '立即领取',
    icon: Crown,
    tone: '#775af0',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    title: '签到有礼',
    desc: '连续签到解锁书券奖励',
    cta: '去签到',
    icon: Gift,
    tone: '#4950de',
    image: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    title: 'AI 推荐',
    desc: '猜你想看的爆款新书',
    cta: '查看推荐',
    icon: Sparkles,
    tone: '#6b63ec',
    image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 4,
    title: '客户端福利',
    desc: '下载 App 领取专属礼包',
    cta: '去下载',
    icon: Smartphone,
    tone: '#5f6ef5',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80',
  },
];

export function PromoGrid() {
  return (
    <section className="px-4 py-2">
      <div className="grid grid-cols-2 gap-3">
        {promoItems.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.id}
              className="relative aspect-video overflow-hidden rounded-[10px] border border-white/8 bg-card/90 shadow-lg shadow-black/12"
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${item.tone}cc 0%, rgba(10, 12, 26, 0.48) 45%, rgba(7, 9, 18, 0.74) 100%)`,
                }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_30%,rgba(0,0,0,0.2))]" />

              <div className="relative flex h-full flex-col justify-between p-3">
                <div className="flex items-start justify-between gap-2">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-[10px] border border-white/12 bg-white/10 backdrop-blur-sm"
                    style={{
                      boxShadow: `0 10px 22px ${item.tone}35`,
                    }}
                  >
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="rounded-full bg-black/22 px-2 py-0.5 text-[10px] text-white/78 backdrop-blur-sm">
                    广告
                  </span>
                </div>

                <div />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
