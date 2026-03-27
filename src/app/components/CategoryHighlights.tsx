import { useMemo, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { HeatCount } from './ui/heat-count';
import { SerialStatusBadge } from './ui/serial-status-badge';

type HighlightKey = 'ancient' | 'ceo' | 'history' | 'fantasy';

interface HighlightBook {
  id: number;
  title: string;
  desc: string;
  status: string;
  heat: string;
  cover: string;
}

interface HighlightBoard {
  key: HighlightKey;
  label: string;
  books: HighlightBook[];
}

const boards: HighlightBoard[] = [
  {
    key: 'ancient',
    label: '古代情缘',
    books: [
      {
        id: 1,
        title: '京夜难眠',
        desc: '父亲惨死，林亦心如死灰，以最绝情的方式斩断跟尹司宸的婚约。',
        status: '连载',
        heat: '4274万热度',
        cover: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=320&q=80',
      },
      {
        id: 2,
        title: '惯坏她',
        desc: '美艳清醒小白花，年上多系大佬。先婚后爱，感情张力很足。',
        status: '连载',
        heat: '4274万热度',
        cover: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?auto=format&fit=crop&w=320&q=80',
      },
      {
        id: 3,
        title: '下乡大西北，逍遥桃花源',
        desc: '她一句请求，换来命运转向。在荒野与麦浪之间，她找到了自己。',
        status: '连载',
        heat: '4274万热度',
        cover: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=320&q=80',
      },
      {
        id: 13,
        title: '春山如黛',
        desc: '一纸婚约后命运转向，她在权谋与情意之间稳稳落子。',
        status: '完本',
        heat: '4274万热度',
        cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=320&q=80',
      },
      {
        id: 14,
        title: '碧袖丹心',
        desc: '她以为婚约是枷锁，却在并肩后看清彼此的真心。',
        status: '连载',
        heat: '4274万热度',
        cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=320&q=80',
      },
      {
        id: 15,
        title: '世子妃死遁',
        desc: '一场假死换来自由，她却再次被命运推回旧局。',
        status: '完本',
        heat: '4274万热度',
        cover: 'https://images.unsplash.com/photo-1491841573634-28140fc7ced7?auto=format&fit=crop&w=320&q=80',
      },
      {
        id: 16,
        title: '天命成凰',
        desc: '她携一身锋芒归来，要把所有失去的东西亲手拿回。',
        status: '连载',
        heat: '4274万热度',
        cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=320&q=80',
      },
      {
        id: 17,
        title: '春染织醉',
        desc: '京城风雨欲来，她偏要在局中开出最艳的一朵花。',
        status: '连载',
        heat: '4274万热度',
        cover: 'https://images.unsplash.com/photo-1511108690759-009324a90311?auto=format&fit=crop&w=320&q=80',
      },
    ],
  },
  {
    key: 'ceo',
    label: '总裁豪门',
    books: [
      {
        id: 4,
        title: '陆少的隐婚罪妻',
        desc: '婚姻如局，深情与误会交错，她在风暴中心艰难转身。',
        status: '连载',
        heat: '5288万热度',
        cover: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=320&q=80',
      },
      {
        id: 5,
        title: '离婚后她惊艳了世界',
        desc: '她转身离开后，那个男人才发现自己根本无法失去她。',
        status: '连载',
        heat: '5288万热度',
        cover: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=320&q=80',
      },
      {
        id: 6,
        title: '大佬归来，假千金她不装了',
        desc: '真假身份揭开后，她用实力反转所有人的偏见。',
        status: '完本',
        heat: '5288万热度',
        cover: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=320&q=80',
      },
      {
        id: 18,
        title: '在他深情中陨落',
        desc: '情深似海的背后，是一场无人能逃的真相漩涡。',
        status: '连载',
        heat: '5288万热度',
        cover: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&w=320&q=80',
      },
      {
        id: 19,
        title: '夫人总想离婚',
        desc: '她想体面离场，他却偏要把所有温柔都补给她。',
        status: '完本',
        heat: '5288万热度',
        cover: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=320&q=80',
      },
      {
        id: 20,
        title: '替嫁后她惊艳全城',
        desc: '从被轻视到被全城追捧，她只用了短短一夜。',
        status: '连载',
        heat: '5288万热度',
        cover: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=320&q=80',
      },
      {
        id: 21,
        title: '总裁的心尖宠',
        desc: '他把所有偏爱都给了她，却唯独不肯说爱。',
        status: '连载',
        heat: '5288万热度',
        cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=320&q=80',
      },
      {
        id: 22,
        title: '离婚后她火遍全网',
        desc: '当她终于转身，所有人都开始追着她的名字奔跑。',
        status: '完本',
        heat: '5288万热度',
        cover: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?auto=format&fit=crop&w=320&q=80',
      },
    ],
  },
  {
    key: 'history',
    label: '架空历史',
    books: [
      {
        id: 7,
        title: '无敌六皇子',
        desc: '朝堂之上步步为营，少年皇子靠智谋一路逆袭。',
        status: '连载',
        heat: '4827万热度',
        cover: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=320&q=80',
      },
      {
        id: 8,
        title: '寒门枭士',
        desc: '从寒门走向权力中枢，他改写的不只是自己的命运。',
        status: '完本',
        heat: '4827万热度',
        cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=320&q=80',
      },
      {
        id: 9,
        title: '逍遥四公子',
        desc: '轻松诙谐的外表下，是刀光剑影里的步步惊心。',
        status: '连载',
        heat: '4827万热度',
        cover: 'https://images.unsplash.com/photo-1511108690759-009324a90311?auto=format&fit=crop&w=320&q=80',
      },
      {
        id: 23,
        title: '世子无双',
        desc: '庙堂与江湖交叠，他在波诡云谲中闯出自己的路。',
        status: '连载',
        heat: '4827万热度',
        cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=320&q=80',
      },
      {
        id: 24,
        title: '极品小侯爷',
        desc: '少年披甲入局，笑谈间已定下整个朝堂的输赢。',
        status: '完本',
        heat: '4827万热度',
        cover: 'https://images.unsplash.com/photo-1491841573634-28140fc7ced7?auto=format&fit=crop&w=320&q=80',
      },
      {
        id: 25,
        title: '寒门布衣',
        desc: '从草芥到权臣，他拿命搏出的不只是富贵。',
        status: '连载',
        heat: '4827万热度',
        cover: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=320&q=80',
      },
      {
        id: 26,
        title: '锦衣夜行',
        desc: '夜色之下，最危险的人总是最沉默的那个。',
        status: '连载',
        heat: '4827万热度',
        cover: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=320&q=80',
      },
      {
        id: 27,
        title: '大宁枭臣',
        desc: '他在乱世里执棋而行，要替天下换一个新秩序。',
        status: '完本',
        heat: '4827万热度',
        cover: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=320&q=80',
      },
    ],
  },
  {
    key: 'fantasy',
    label: '东方玄幻',
    books: [
      {
        id: 10,
        title: '葬神棺',
        desc: '少年背负神棺而行，在乱世中踏出自己的登天路。',
        status: '连载',
        heat: '2046万热度',
        cover: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=320&q=80',
      },
      {
        id: 11,
        title: '神级进化动物杀手团',
        desc: '万兽并起的世界里，他带着自己的队伍一路横推。',
        status: '连载',
        heat: '2046万热度',
        cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=320&q=80',
      },
      {
        id: 12,
        title: '九阳武神',
        desc: '天赋重开，命运重写。他要把曾失去的一切都夺回来。',
        status: '完本',
        heat: '2046万热度',
        cover: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?auto=format&fit=crop&w=320&q=80',
      },
      {
        id: 28,
        title: '吞噬古帝',
        desc: '一念吞天，一路斩神，他要把诸天都踩在脚下。',
        status: '连载',
        heat: '2046万热度',
        cover: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=320&q=80',
      },
      {
        id: 29,
        title: '史上最强狐妖',
        desc: '当狐族天骄觉醒血脉后，整个九州都为之震动。',
        status: '完本',
        heat: '2046万热度',
        cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=320&q=80',
      },
      {
        id: 30,
        title: '九阳武神',
        desc: '浴火重生之后，他只想把所有仇敌踩碎在脚下。',
        status: '连载',
        heat: '2046万热度',
        cover: 'https://images.unsplash.com/photo-1511108690759-009324a90311?auto=format&fit=crop&w=320&q=80',
      },
      {
        id: 31,
        title: '万古剑神',
        desc: '一剑出，山河动。少年剑修横穿九天十地。',
        status: '连载',
        heat: '2046万热度',
        cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=320&q=80',
      },
      {
        id: 32,
        title: '不死战尊',
        desc: '不死不灭的传承落在他身上，也带来了最残酷的试炼。',
        status: '完本',
        heat: '2046万热度',
        cover: 'https://images.unsplash.com/photo-1491841573634-28140fc7ced7?auto=format&fit=crop&w=320&q=80',
      },
    ],
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

export function CategoryHighlights() {
  const [active, setActive] = useState<HighlightKey>('ancient');

  const current = useMemo(
    () => boards.find((board) => board.key === active) ?? boards[0],
    [active],
  );

  const itemPages = useMemo(() => chunkItems(current.books, 8), [current.books]);

  return (
    <section className="px-4 py-2">
      <div className="overflow-hidden rounded-2xl border border-white/8 bg-card/92 shadow-lg shadow-black/8">
        <div className="scrollbar-hide flex gap-2 overflow-x-auto px-4 pt-4">
          {boards.map((board) => (
            <button
              key={board.key}
              onClick={() => setActive(board.key)}
              className={`shrink-0 rounded-xl px-3 py-1.5 text-sm transition-all ${
                board.key === active
                  ? 'bg-primary-gradient text-white shadow-primary-glow'
                  : 'bg-muted/70 text-muted-foreground'
              }`}
            >
              {board.label}
            </button>
          ))}
        </div>

        <div className="px-4 pb-4 pt-4">
          <div className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto">
            {itemPages.map((page, pageIndex) => (
              <div
                key={`${current.key}-${pageIndex}`}
                className="w-full shrink-0 snap-start"
              >
                <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                  {page.map((book, index) => {
                    const rank = pageIndex * 8 + index + 1;

                    return (
                      <article key={book.id} className="flex items-start gap-3">
                        <div className="relative h-[98px] w-[74px] shrink-0 overflow-hidden rounded-[10px] bg-muted">
                          <img
                            src={book.cover}
                            alt={book.title}
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute left-1.5 top-1.5">
                            <SerialStatusBadge status={book.status} />
                          </div>
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start gap-2">
                            <span
                              className="text-[18px] font-semibold leading-none"
                              style={{ color: rankColors[index] ?? 'rgba(255,255,255,0.72)' }}
                            >
                              {rank}
                            </span>
                            <div className="flex min-h-[98px] min-w-0 flex-1 flex-col">
                              <h4 className="line-clamp-1 text-[15px] font-medium text-foreground/94">
                                {book.title}
                              </h4>
                              <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-muted-foreground">
                                {book.desc}
                              </p>
                              <div className="mt-auto pt-2">
                                <HeatCount
                                  value={book.heat.replace('热度', '')}
                                  className="text-[11px] text-muted-foreground/92"
                                  iconClassName="h-3 w-3"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-center">
            <button className="inline-flex items-center gap-0.5 rounded-full border border-border/70 px-4 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/35 hover:text-primary">
              查看更多
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
