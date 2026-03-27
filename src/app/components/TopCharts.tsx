import { useMemo, useState } from 'react';
import { ChevronRight } from 'lucide-react';

type BoardKey = 'recommend' | 'hot' | 'finished' | 'rating';

interface ChartItem {
  id: number;
  title: string;
  author: string;
  cover: string;
  board: BoardKey;
  genre: string;
}

const boards: { key: BoardKey; label: string }[] = [
  { key: 'recommend', label: '推荐榜' },
  { key: 'hot', label: '大热榜' },
  { key: 'finished', label: '完结榜' },
  { key: 'rating', label: '好评榜' },
];

const chartItems: ChartItem[] = [
  {
    id: 1,
    title: '我率秦军三百万，为秦续命万万年',
    author: '远古',
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=300&q=80',
    board: 'recommend',
    genre: '都市',
  },
  {
    id: 2,
    title: '分手六年，贺律师又沦陷了',
    author: '青木',
    cover: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?auto=format&fit=crop&w=300&q=80',
    board: 'recommend',
    genre: '都市',
  },
  {
    id: 3,
    title: '抢我婚约嫁太子？我携孕肚嫁皇帝',
    author: '南枝',
    cover: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=300&q=80',
    board: 'recommend',
    genre: '穿越',
  },
  {
    id: 4,
    title: '朱门春闺',
    author: '温玉',
    cover: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=300&q=80',
    board: 'recommend',
    genre: '脑洞',
  },
  {
    id: 11,
    title: '夜雨停时，她在旧城区捡到一封未寄出的信',
    author: '听雪',
    cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=300&q=80',
    board: 'recommend',
    genre: '都市',
  },
  {
    id: 12,
    title: '雾色深处有星光',
    author: '南歌',
    cover: 'https://images.unsplash.com/photo-1491841573634-28140fc7ced7?auto=format&fit=crop&w=300&q=80',
    board: 'recommend',
    genre: '玄幻',
  },
  {
    id: 22,
    title: '他在雪夜尽头等一封迟来的回信',
    author: '折枝',
    cover: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=300&q=80',
    board: 'recommend',
    genre: '都市',
  },
  {
    id: 23,
    title: '半城月色照旧梦',
    author: '未迟',
    cover: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=300&q=80',
    board: 'recommend',
    genre: '脑洞',
  },
  {
    id: 24,
    title: '春信已至，故人仍在灯火深处',
    author: '时砚',
    cover: 'https://images.unsplash.com/photo-1511108690759-009324a90311?auto=format&fit=crop&w=300&q=80',
    board: 'recommend',
    genre: '都市',
  },
  {
    id: 25,
    title: '青山迟暮时，她终于听见自己的名字',
    author: '清禾',
    cover: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&w=300&q=80',
    board: 'recommend',
    genre: '穿越',
  },
  {
    id: 5,
    title: '穿成恶雌，逼我靠打团逆天改命',
    author: '一木',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=300&q=80',
    board: 'hot',
    genre: '系统',
  },
  {
    id: 6,
    title: '第五年重逢，失控的爱意再也藏不住',
    author: '空青',
    cover: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=300&q=80',
    board: 'hot',
    genre: '都市',
  },
  {
    id: 13,
    title: '系统逼我成为顶流编剧',
    author: '北城',
    cover: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=300&q=80',
    board: 'hot',
    genre: '系统',
  },
  {
    id: 14,
    title: '烈焰审判庭',
    author: '辞镜',
    cover: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&w=300&q=80',
    board: 'hot',
    genre: '玄幻',
  },
  {
    id: 15,
    title: '她在暴雪夜里重启人生',
    author: '阿照',
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=300&q=80',
    board: 'hot',
    genre: '都市',
  },
  {
    id: 7,
    title: '剑来长风渡',
    author: '青衣',
    cover: 'https://images.unsplash.com/photo-1511108690759-009324a90311?auto=format&fit=crop&w=300&q=80',
    board: 'finished',
    genre: '玄幻',
  },
  {
    id: 8,
    title: '吃蘑菇后，她成了古仙医',
    author: '晚舟',
    cover: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=300&q=80',
    board: 'finished',
    genre: '脑洞',
  },
  {
    id: 16,
    title: '寒灯引',
    author: '疏影',
    cover: 'https://images.unsplash.com/photo-1511108690759-009324a90311?auto=format&fit=crop&w=300&q=80',
    board: 'finished',
    genre: '玄幻',
  },
  {
    id: 17,
    title: '折月成诗',
    author: '砚秋',
    cover: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=300&q=80',
    board: 'finished',
    genre: '穿越',
  },
  {
    id: 18,
    title: '风雪归人',
    author: '临川',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=300&q=80',
    board: 'finished',
    genre: '都市',
  },
  {
    id: 9,
    title: '月海书局，今晚只对你亮灯',
    author: '星桥',
    cover: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=300&q=80',
    board: 'rating',
    genre: '玄幻',
  },
  {
    id: 10,
    title: '雾港回响：第七盏灯塔的低语',
    author: '回声',
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=300&q=80',
    board: 'rating',
    genre: '穿越',
  },
  {
    id: 19,
    title: '深海邮差',
    author: '知返',
    cover: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?auto=format&fit=crop&w=300&q=80',
    board: 'rating',
    genre: '脑洞',
  },
  {
    id: 20,
    title: '如果风知道答案',
    author: '禾几',
    cover: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=300&q=80',
    board: 'rating',
    genre: '都市',
  },
  {
    id: 21,
    title: '星河审判日',
    author: '秦川',
    cover: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=300&q=80',
    board: 'rating',
    genre: '系统',
  },
];

const rankColors = ['#ff8d5c', '#ffb14f', '#ffd451'];

function chunkItems<T>(items: T[], size: number) {
  const chunks: T[][] = [];

  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }

  return chunks;
}

export function TopCharts() {
  const [activeBoard, setActiveBoard] = useState<BoardKey>('recommend');

  const visibleItems = useMemo(() => {
    return chartItems.filter((item) => item.board === activeBoard);
  }, [activeBoard]);

  const itemPages = useMemo(() => chunkItems(visibleItems, 4), [visibleItems]);

  return (
    <section className="px-4 py-2">
      <div className="overflow-hidden rounded-2xl border border-white/8 bg-card/92 shadow-lg shadow-black/8">
        <div className="flex items-center justify-between px-4 pt-4">
          <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
            {boards.map((board) => (
              <button
                key={board.key}
                onClick={() => setActiveBoard(board.key)}
                className={`shrink-0 text-[15px] font-medium transition-colors ${
                  activeBoard === board.key ? 'text-white' : 'text-muted-foreground'
                }`}
              >
                {board.label}
              </button>
            ))}
          </div>

          <button className="flex shrink-0 items-center gap-0.5 text-xs text-muted-foreground transition-colors hover:text-primary">
            完整榜单
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="relative px-4 py-4">
          <div className="scrollbar-hide flex snap-x snap-mandatory gap-3 overflow-x-auto pr-6">
            {itemPages.map((page, pageIndex) => (
              <div
                key={`${activeBoard}-${pageIndex}`}
                className="w-full shrink-0 snap-start"
              >
                <div className="flex gap-3">
                  <div className="min-w-0 flex-1 space-y-3">
                    {page.map((item, index) => {
                      const rank = pageIndex * 4 + index + 1;

                      return (
                        <article
                          key={item.id}
                          className="flex items-start gap-2.5 py-0.5"
                        >
                          <div className="relative h-[76px] w-[56px] shrink-0 overflow-hidden rounded-[5px] bg-muted">
                            <img
                              src={item.cover}
                              alt={item.title}
                              className="h-full w-full object-cover"
                            />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-start gap-2">
                              <span
                                className="mt-0.5 text-lg font-semibold leading-none"
                                style={{
                                  color:
                                    rank <= 3
                                      ? rankColors[rank - 1]
                                      : 'rgba(255,255,255,0.72)',
                                }}
                              >
                                {rank}
                              </span>
                              <div className="min-w-0">
                                <h4 className="line-clamp-2 text-sm leading-5 text-foreground/94">
                                  {item.title}
                                </h4>
                                <div className="mt-1 flex flex-wrap gap-1.5">
                                  <span className="bg-primary-gradient-soft text-primary inline-flex shrink-0 rounded-md px-1.5 py-0.5 text-[11px]">
                                    {item.author}
                                  </span>
                                  <span className="bg-primary-gradient-soft text-primary inline-flex shrink-0 rounded-md px-1.5 py-0.5 text-[11px]">
                                    {item.genre}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>

                  {itemPages[pageIndex + 1] ? (
                    <div className="pointer-events-none relative w-[96px] shrink-0 overflow-hidden">
                      <div className="space-y-3 opacity-70">
                        {itemPages[pageIndex + 1].map((item, index) => {
                          const rank = (pageIndex + 1) * 4 + index + 1;

                          return (
                            <div key={item.id} className="flex items-start gap-2 py-0.5">
                              <span
                                className="mt-0.5 text-lg font-semibold leading-none"
                                style={{
                                  color:
                                    rank <= 3
                                      ? rankColors[rank - 1]
                                      : 'rgba(255,255,255,0.5)',
                                }}
                              >
                                {rank}
                              </span>

                              <div className="relative h-[76px] w-[56px] shrink-0 overflow-hidden rounded-[5px] bg-muted">
                                <img
                                  src={item.cover}
                                  alt={item.title}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-r from-card/15 via-card/60 to-card" />
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-y-4 right-4 w-8 bg-gradient-to-l from-card via-card/92 to-transparent" />
        </div>
      </div>
    </section>
  );
}
