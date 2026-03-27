import { ChevronRight, Flame, Star } from 'lucide-react';
import { HeatCount } from './ui/heat-count';
import { SerialStatusBadge } from './ui/serial-status-badge';

const hotItems = [
  {
    id: 1,
    title: '修罗武神',
    author: '善良的蜜蜂',
    desc: '论潜力，不算天才，可若功法技，皆可一战封神。',
    score: 9.5,
    reads: '12.5万',
    tag: '玄幻',
    status: '连载',
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 2,
    title: '霸道总裁的小娇妻',
    author: '慕容雪',
    desc: '一场联姻，她成了他的妻子，冷酷总裁却慢慢失控。',
    score: 9.2,
    reads: '18.3万',
    tag: '言情',
    status: '完本',
    cover: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 3,
    title: '星际争霸：重生',
    author: '流浪的蛤蟆',
    desc: '星海浩瀚，文明角逐。重生归来，他誓要重掌未来。',
    score: 9.4,
    reads: '9.8万',
    tag: '科幻',
    status: '连载',
    cover: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 4,
    title: '帝王的阴谋',
    author: '月关',
    desc: '权谋天下，剑指江山。在乱世中，他步步成局。',
    score: 9.1,
    reads: '7.6万',
    tag: '历史',
    status: '连载',
    cover: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=500&q=80',
  },
];

export function HotRecommendations() {
  return (
    <section className="px-4 py-2">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Flame className="h-4.5 w-4.5 text-[#ff9650]" />
          <h3 className="text-base font-medium">热门推荐</h3>
        </div>
        <button className="inline-flex items-center gap-0.5 text-xs text-muted-foreground transition-colors hover:text-primary">
          查看更多
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {hotItems.map((item) => (
          <article
            key={item.id}
            className="overflow-hidden rounded-2xl border border-white/8 bg-card/92 shadow-lg shadow-black/8"
          >
            <div className="relative h-[180px] overflow-hidden">
              <img
                src={item.cover}
                alt={item.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,20,0.06),transparent_36%,rgba(8,10,20,0.28)_70%,rgba(8,10,20,0.8)_100%)]" />

              <div className="absolute left-2 top-2 flex gap-1.5">
                <span className="bg-primary-gradient inline-flex rounded-md px-1.5 py-0.5 text-[11px] text-white">
                  {item.tag}
                </span>
                <SerialStatusBadge status={item.status} />
              </div>

              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-2.5 pb-2 text-xs text-white">
                <span className="inline-flex items-center gap-0.5 text-[#ffd25f]">
                  <Star className="h-3 w-3 fill-current" />
                  {item.score}
                </span>
                <HeatCount
                  value={item.reads}
                  className="text-[12px] text-white/88"
                  iconClassName="h-3 w-3"
                />
              </div>
            </div>

            <div className="p-3">
              <h4 className="text-[15px] font-medium text-foreground/94">{item.title}</h4>
              <p className="mt-1 text-xs text-primary/85">{item.author}</p>
              <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-muted-foreground">
                {item.desc}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
