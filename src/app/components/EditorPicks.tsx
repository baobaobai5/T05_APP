import { ChevronRight } from 'lucide-react';
import { HeatCount } from './ui/heat-count';
import { SerialStatusBadge } from './ui/serial-status-badge';

const editorPicks = [
  {
    id: 1,
    title: '雾港回响',
    desc: '灯塔、潮声与失踪案交织成新的真相，悬疑感层层推进。',
    tags: ['悬疑', '幻想'],
    heat: '4274万热度',
    status: '连载中',
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=320&q=80',
  },
  {
    id: 2,
    title: '月海书局',
    desc: '每一本旧书都通向另一段人生，温柔又有后劲的奇幻故事。',
    tags: ['治愈', '奇幻'],
    heat: '4274万热度',
    status: '完本',
    cover: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?auto=format&fit=crop&w=320&q=80',
  },
  {
    id: 3,
    title: '长夜列车',
    desc: '终点站后的神秘车厢里，每位乘客都藏着不愿提起的秘密。',
    tags: ['都市', '推理'],
    heat: '4274万热度',
    status: '完本',
    cover: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=320&q=80',
  },
  {
    id: 4,
    title: '春山如黛',
    desc: '一纸婚约后命运转向，她在权谋与情意之间稳稳落子。',
    tags: ['古言', '权谋'],
    heat: '4274万热度',
    status: '完本',
    cover: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=320&q=80',
  },
];

export function EditorPicks() {
  return (
    <section className="px-4 py-2">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary-gradient h-4 w-1 rounded-full" />
          <h3 className="text-base font-medium">总编推荐</h3>
        </div>
        <button className="inline-flex items-center gap-0.5 text-xs text-muted-foreground transition-colors hover:text-primary">
          查看更多
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="space-y-3">
        {editorPicks.map((item) => (
          <article
            key={item.id}
            className="overflow-hidden rounded-2xl border border-white/8 bg-card/92 p-3 shadow-lg shadow-black/8"
          >
            <div className="flex gap-3">
              <div className="relative h-[112px] w-[84px] shrink-0 overflow-hidden rounded-[10px] bg-muted">
                <img
                  src={item.cover}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,20,0.06),transparent_34%,rgba(8,10,20,0.3)_72%,rgba(8,10,20,0.82)_100%)]" />
                <div className="absolute left-2 top-2">
                  <SerialStatusBadge status={item.status} />
                </div>
              </div>

              <div className="flex min-w-0 flex-1 flex-col">
                <h4 className="text-[15px] font-medium leading-tight text-foreground/94">
                  {item.title}
                </h4>
                <p className="mt-1.5 truncate text-sm leading-5 text-muted-foreground">
                  {item.desc}
                </p>

                <div className="mt-2 flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-primary-gradient-soft text-primary inline-flex rounded-md px-1.5 py-0.5 text-[11px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-1.5">
                  <HeatCount
                    value={item.heat.replace('热度', '')}
                    className="text-[11px] text-muted-foreground/92"
                    iconClassName="h-3 w-3"
                  />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
