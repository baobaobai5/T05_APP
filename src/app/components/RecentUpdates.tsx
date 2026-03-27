import { ChevronRight, Clock3 } from 'lucide-react';

const updates = [
  {
    id: 1,
    tag: '寻宝探险',
    title: '盗门旧事',
    chapter: '第56章 非礼勿视',
    author: '@一苇长',
    time: '11:31',
  },
  {
    id: 2,
    tag: '衍生同人',
    title: '四合院：众禽不讲道理？在下也略懂拳脚',
    chapter: '第442章 自言自语·计划',
    author: '@我的灯下已凉',
    time: '11:30',
  },
  {
    id: 3,
    tag: '总裁豪门',
    title: '都说霍二爷不行？其实误会不小',
    chapter: '第31章 铁树开花',
    author: '@墨墨卿卿',
    time: '11:30',
  },
  {
    id: 4,
    tag: '总裁豪门',
    title: '老公离婚吧，我要跟前夫复婚了',
    chapter: '第18章 他宁愿温柔亦当小三',
    author: '@晓妍',
    time: '11:29',
  },
  {
    id: 5,
    tag: '都市奇幻',
    title: '诡异入侵，我靠偷听心声成首富',
    chapter: '第205章 你什么时候喜欢我的',
    author: '@爆裂硬糖',
    time: '11:29',
  },
];

export function RecentUpdates() {
  return (
    <section className="px-4 py-2">
      <div className="flex items-center justify-between px-1 pb-3">
        <div className="flex items-center gap-2">
          <Clock3 className="h-4.5 w-4.5 text-[#ff9650]" />
          <h3 className="text-base font-medium">最近更新</h3>
        </div>

        <button className="inline-flex items-center gap-0.5 text-xs text-muted-foreground transition-colors hover:text-primary">
          查看更多
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="space-y-2">
        {updates.map((item) => (
          <article
            key={item.id}
            className="rounded-2xl border border-white/8 bg-card/92 px-4 py-3 shadow-lg shadow-black/8"
          >
              <div className="mb-1.5 flex items-start justify-between gap-3">
                <span className="bg-primary-gradient-soft text-primary inline-flex rounded-md px-1.5 py-0.5 text-[11px]">
                  {item.tag}
                </span>
                <span className="shrink-0 text-[11px] text-muted-foreground/80">
                  {item.time}
                </span>
              </div>

              <h4 className="line-clamp-1 text-[15px] font-medium text-foreground/95">
                {item.title}
              </h4>

              <div className="mt-1 flex items-end justify-between gap-3">
                <div className="min-w-0">
                  <p className="line-clamp-1 text-[12px] text-muted-foreground">
                    {item.chapter}
                  </p>
                </div>
                <span className="shrink-0 text-[11px] text-muted-foreground/70">
                  {item.author}
                </span>
              </div>
          </article>
        ))}
      </div>
    </section>
  );
}
