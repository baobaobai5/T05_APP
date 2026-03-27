import { Eye } from 'lucide-react';
import { SerialStatusBadge } from './ui/serial-status-badge';

const freeNovels = [
  {
    id: 1,
    title: '帝王的阴谋',
    author: '月关',
    heat: '1520万',
    status: '连载中',
    cover:
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=420&q=80',
  },
  {
    id: 2,
    title: '幽暗密林',
    author: '天蚕土豆',
    heat: '978万',
    status: '连载中',
    cover:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=420&q=80',
  },
  {
    id: 3,
    title: '星际迷航',
    author: '月影仙踪',
    heat: '2145万',
    status: '完本',
    cover:
      'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=420&q=80',
  },
  {
    id: 4,
    title: '沙海遗城',
    author: '烽火戏诸侯',
    heat: '1876万',
    status: '完本',
    cover:
      'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=420&q=80',
  },
  {
    id: 5,
    title: '花灯引路',
    author: '顾西爵',
    heat: '3762万',
    status: '连载中',
    cover:
      'https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=420&q=80',
  },
  {
    id: 6,
    title: '龙族前传',
    author: '江南',
    heat: '856万',
    status: '连载中',
    cover:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=420&q=80',
  },
];

export function FreeNovelGrid() {
  return (
    <section className="px-4 py-2">
      <div className="relative">
        <div className="scrollbar-hide flex snap-x snap-mandatory gap-3 overflow-x-auto pr-9">
          {freeNovels.map((novel) => {
            return (
              <article key={novel.id} className="w-[138px] shrink-0 snap-start">
                <div className="overflow-hidden rounded-[10px] border border-white/8 bg-card/92 shadow-lg shadow-black/8">
                  <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                    <img
                      src={novel.cover}
                      alt={novel.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,20,0.04),transparent_38%,rgba(8,10,20,0.28)_72%,rgba(8,10,20,0.9)_100%)]" />

                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-2.5 pb-2">
                      <span className="inline-flex items-center gap-1 text-[11px] text-white/88">
                        <Eye className="h-3 w-3" strokeWidth={2.1} />
                        {novel.heat}
                      </span>
                      <SerialStatusBadge status={novel.status} />
                    </div>
                  </div>
                </div>

                <h3 className="mt-2 line-clamp-1 text-[13px] font-medium text-foreground/94">
                  {novel.title}
                </h3>
                <p className="mt-0.5 text-[12px] text-muted-foreground">{novel.author}</p>
              </article>
            );
          })}
        </div>

        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-background via-background/88 to-transparent" />
      </div>
    </section>
  );
}
