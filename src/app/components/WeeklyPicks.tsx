import { RefreshCw } from 'lucide-react';

const picks = [
  { id: 1, tag: '悬疑', title: '长夜列车：午夜车厢里，所有秘密都开始苏醒' },
  { id: 2, tag: '治愈', title: '月海书局：每一本旧书，都会打开另一种人生' },
  { id: 3, tag: '幻想', title: '雾港回响：灯塔、潮声与失踪案交织成新的真相' },
  { id: 4, tag: '都市', title: '雾色霓虹：她在夜色尽头，捡回自己的人生剧本' },
  { id: 5, tag: '古言', title: '春山如黛：一纸婚约后，命运开始偏向她这一边' },
];

export function WeeklyPicks() {
  return (
    <section className="px-4 py-2">
      <div className="overflow-hidden rounded-2xl border border-white/8 bg-card/92 shadow-lg shadow-black/8">
        <div className="flex items-center justify-between border-b border-border/50 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="bg-primary-gradient h-4 w-1 rounded-full" />
            <h3 className="text-base font-medium">本周强推</h3>
          </div>
          <button className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary">
            <RefreshCw className="h-3.5 w-3.5" />
            换一换
          </button>
        </div>

        <div className="px-4">
          {picks.map((item, index) => (
            <article
              key={item.id}
              className={`flex items-center gap-2 py-3 ${
                index !== picks.length - 1 ? 'border-b border-border/35' : ''
              }`}
            >
              <span className="bg-primary-gradient-soft text-primary inline-flex shrink-0 rounded-md px-1.5 py-0.5 text-[11px]">
                {item.tag}
              </span>
              <p className="line-clamp-1 text-sm text-foreground/92">{item.title}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
