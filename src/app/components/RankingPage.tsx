import { useMemo, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import paihangBg from '../../assets/paihangbg.svg';
import type { NovelDetailData } from './NovelDetailPage';
import { HeatCount } from './ui/heat-count';
import { SerialStatusBadge } from './ui/serial-status-badge';

type RankingTabKey = 'hot' | 'new' | 'finished' | 'favorite';

interface RankingPageProps {
  onBack: () => void;
  onOpenDetail?: (novel: NovelDetailData) => void;
}

interface RankingNovel {
  id: number;
  title: string;
  desc: string;
  cover: string;
  views: string;
  updatedAt: string;
  status: string;
  words: string;
  tags: string[];
  board: RankingTabKey;
}

const tabs: { key: RankingTabKey; label: string }[] = [
  { key: 'hot', label: '大热榜' },
  { key: 'new', label: '新书榜' },
  { key: 'finished', label: '完结榜' },
  { key: 'favorite', label: '收藏榜' },
];

const rankingNovels: RankingNovel[] = [
  {
    id: 1,
    title: '盖世神医',
    desc: '被低估的年轻神医一路打脸逆袭，名利与风暴同时追来。',
    cover: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=480&q=80',
    views: '833.21万',
    updatedAt: '更新于 2026-03-19',
    status: '连载中',
    words: '字数 200万以上',
    tags: ['都市', '神医', '逆袭'],
    board: 'hot',
  },
  {
    id: 2,
    title: '葬神棺',
    desc: '一口神棺牵出万古隐秘，少年自深渊一路杀到苍穹之上。',
    cover: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=480&q=80',
    views: '634.72万',
    updatedAt: '更新于 2026-03-16',
    status: '连载中',
    words: '字数 200万以上',
    tags: ['玄幻', '升级流', '热血'],
    board: 'hot',
  },
  {
    id: 3,
    title: '真北·登机！真北战列',
    desc: '钢铁舰队、极寒海域与燃烧意志交织，少年指挥官踏上逆袭征途。',
    cover: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=480&q=80',
    views: '791.0万',
    updatedAt: '更新于 2026-03-23',
    status: '连载中',
    words: '字数 100万-200万',
    tags: ['热血', '战争', '舰队'],
    board: 'hot',
  },
  {
    id: 4,
    title: '春灯照雪',
    desc: '新书刚上线便冲进榜单前列，节奏凌厉，情绪拉满。',
    cover: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=480&q=80',
    views: '201.4万',
    updatedAt: '更新于 2026-03-26',
    status: '连载中',
    words: '字数 30万-50万',
    tags: ['新书', '甜宠', '群像'],
    board: 'new',
  },
  {
    id: 5,
    title: '雾港回响',
    desc: '悬疑与都市情感并行推进，人物关系层层反转。',
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=480&q=80',
    views: '183.8万',
    updatedAt: '更新于 2026-03-25',
    status: '连载中',
    words: '字数 50万-100万',
    tags: ['悬疑', '都市', '破案'],
    board: 'new',
  },
  {
    id: 6,
    title: '月海书局',
    desc: '安静又克制的情绪写法，让这本新书拥有了很高的留存。',
    cover: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?auto=format&fit=crop&w=480&q=80',
    views: '166.7万',
    updatedAt: '更新于 2026-03-24',
    status: '连载中',
    words: '字数 30万以下',
    tags: ['治愈', '奇幻', '书局'],
    board: 'new',
  },
  {
    id: 7,
    title: '都说霍二爷不行？其实误会不小',
    desc: '一场误会引出豪门真心局，她在风暴中心反转命运。',
    cover: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=480&q=80',
    views: '522.30万',
    updatedAt: '更新于 2026-03-20',
    status: '完本',
    words: '字数 100万-200万',
    tags: ['豪门', '甜宠', '婚恋'],
    board: 'finished',
  },
  {
    id: 8,
    title: '剑来长风渡',
    desc: '热血与江湖感都很完整，完本后口碑持续上升。',
    cover: 'https://images.unsplash.com/photo-1511108690759-009324a90311?auto=format&fit=crop&w=480&q=80',
    views: '488.9万',
    updatedAt: '更新于 2026-03-08',
    status: '完本',
    words: '字数 200万以上',
    tags: ['玄幻', '江湖', '完结'],
    board: 'finished',
  },
  {
    id: 9,
    title: '月港归舟',
    desc: '收尾稳定、情绪完整，是近期完结榜里讨论度很高的一本。',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=480&q=80',
    views: '362.1万',
    updatedAt: '更新于 2026-03-10',
    status: '完本',
    words: '字数 100万-200万',
    tags: ['都市', '成长', '治愈'],
    board: 'finished',
  },
  {
    id: 10,
    title: '她在暴雪夜里重启人生',
    desc: '收藏曲线非常稳定，长尾表现尤其突出。',
    cover: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&w=480&q=80',
    views: '719.5万',
    updatedAt: '更新于 2026-03-18',
    status: '连载中',
    words: '字数 100万-200万',
    tags: ['收藏高', '都市', '成长'],
    board: 'favorite',
  },
  {
    id: 11,
    title: '深海邮差',
    desc: '世界观完整且更新稳定，收藏榜表现一路上升。',
    cover: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=480&q=80',
    views: '610.4万',
    updatedAt: '更新于 2026-03-22',
    status: '连载中',
    words: '字数 50万-100万',
    tags: ['收藏高', '奇幻', '冒险'],
    board: 'favorite',
  },
  {
    id: 12,
    title: '半城月色照旧梦',
    desc: '题材不算激进，但完成度很高，收藏转化非常漂亮。',
    cover: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=480&q=80',
    views: '587.6万',
    updatedAt: '更新于 2026-03-17',
    status: '连载中',
    words: '字数 50万-100万',
    tags: ['脑洞', '都市', '情绪流'],
    board: 'favorite',
  },
];

export function RankingPage({ onBack, onOpenDetail }: RankingPageProps) {
  const [activeTab, setActiveTab] = useState<RankingTabKey>('hot');

  const visibleItems = useMemo(
    () => rankingNovels.filter((item) => item.board === activeTab),
    [activeTab],
  );

  const buildDetailData = (item: RankingNovel): NovelDetailData => ({
    id: item.id,
    title: item.title,
    cover: item.cover,
    views: item.views,
    status: item.status,
    words: item.words.replace(/^字数\s*/, ''),
    tags: item.tags,
    updatedAt: item.updatedAt,
    intro: `${item.desc} ${item.title}延续了榜单里的高讨论度，人物关系和剧情转折都很抓人，适合继续深入阅读。`,
    latestChapter: `更新至 ${item.title} · 最新章节已同步`,
    chapterCount: item.status === '完本' ? 550 : 418,
    reads: item.views,
    favorites: item.views,
    author:
      item.tags[0] === '都市'
        ? '沙拉薯条'
        : item.tags[0] === '玄幻'
          ? '沈墨安'
          : item.tags[0] === '收藏高'
            ? '月下闻笙'
            : '江南旧客',
    score: item.status === '完本' ? '9.7' : '9.6',
    ratingCount: item.status === '完本' ? '9.2万人评价' : '8.8万人评价',
    liveReaders: item.views,
    totalReads: item.views,
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="relative overflow-visible bg-[#f0a53d] pb-24 pt-4">
        <img
          src={paihangBg}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,204,116,0.12)_0%,rgba(255,169,52,0.06)_35%,rgba(9,10,18,0)_100%)]" />

        <div className="relative z-10 flex items-center gap-3 px-4">
          <button
            onClick={onBack}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-black/18 text-[#2d1f10] backdrop-blur-sm transition-all active:scale-95"
            aria-label="返回"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <div className="flex-1 text-center">
            <h1 className="text-[18px] font-semibold tracking-[0.08em] text-[#17120d]">
              排行榜
            </h1>
          </div>

          <div className="h-9 w-9 shrink-0" />
        </div>

        <div className="absolute bottom-[-24px] left-0 right-0 z-10 h-12 rounded-[20px] bg-[#10111c] shadow-[0_14px_30px_rgba(0,0,0,0.2)]">
          <div className="scrollbar-hide flex h-full items-center gap-7 overflow-x-auto whitespace-nowrap px-4">
            {tabs.map((tab) => (
              <button
                key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative shrink-0 pb-1 transition-colors ${
                activeTab === tab.key
                  ? 'text-[15px] font-semibold text-white'
                  : 'text-[15px] font-normal text-white/58'
              }`}
            >
                {tab.label}
                {activeTab === tab.key ? (
                  <span className="absolute inset-x-0 -bottom-2.5 mx-auto h-[3px] w-8 rounded-full bg-[linear-gradient(90deg,#ff983d_0%,#ffcf7c_100%)] shadow-[0_6px_16px_rgba(255,163,61,0.35)]" />
                ) : null}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="-mt-12 rounded-t-[28px] bg-[#08090f] pb-8 shadow-[0_-10px_30px_rgba(0,0,0,0.24)]">
        <section className="space-y-4 border-t border-white/6 px-4 pt-[80px]">
          {visibleItems.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onOpenDetail?.(buildDetailData(item))}
              className="w-full rounded-[24px] border border-white/8 bg-[#1b1b2f] p-3 text-left shadow-[0_18px_32px_rgba(0,0,0,0.18)] transition-all active:scale-[0.99]"
            >
              <div className="flex gap-3">
                <div className="relative h-[126px] w-[94px] shrink-0 overflow-hidden rounded-[16px] bg-muted">
                  <img src={item.cover} alt={item.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,14,28,0.02),rgba(12,14,28,0.12)_56%,rgba(12,14,28,0.5)_100%)]" />
                  <div className="absolute left-0 top-0 rounded-br-[14px] rounded-tl-[14px] bg-[linear-gradient(135deg,#ff8a3d_0%,#ff4f3d_100%)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-white shadow-[0_10px_18px_rgba(255,92,56,0.35)]">
                    TOP{index + 1}
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="line-clamp-2 text-[18px] font-semibold leading-tight text-foreground/96">
                      {item.title}
                    </h2>
                    <SerialStatusBadge status={item.status} className="shrink-0" />
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-muted-foreground">
                    <HeatCount value={item.views} />
                    <span>{item.updatedAt}</span>
                  </div>

                  <p className="mt-3 truncate text-sm leading-7 text-muted-foreground">
                    {item.desc}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex rounded-md bg-primary-gradient-soft px-1.5 py-0.5 text-[11px] text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 text-[12px] text-muted-foreground/84">{item.words}</div>
                </div>
              </div>
            </button>
          ))}
        </section>
      </main>
    </div>
  );
}
