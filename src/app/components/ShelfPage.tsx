import { useMemo, useState } from 'react';
import { BookOpenText, RefreshCw, Star } from 'lucide-react';
import type { NovelDetailData } from './NovelDetailPage';
import { BottomNav } from './BottomNav';
import { TopBrandBar } from './TopBrandBar';
import { HeatCount } from './ui/heat-count';
import { SerialStatusBadge } from './ui/serial-status-badge';

interface ShelfPageProps {
  onOpenSearch?: () => void;
  onOpenDetail?: (novel: NovelDetailData) => void;
  onSelectPage?: (page: 'home' | 'history' | 'shelf' | 'wallet') => void;
}

interface ShelfNovel extends NovelDetailData {
  resultBadge?: 'vip' | 'level' | 'coin';
  resultBadgeText?: string;
}

const shelfItems: ShelfNovel[] = [
  {
    id: 301,
    title: '修武罗神',
    cover:
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=480&q=80',
    views: '2.9万阅读',
    status: '连载中',
    words: '634万字',
    tags: ['玄幻', '热血', '逆袭'],
    updatedAt: '2026-03-26 08:42:05',
    intro: '少年穿越荒芜之地，以一腔孤勇在神域世界中逆风而行。',
    latestChapter: '第201章 天门再开',
    chapterCount: 632,
    reads: '634.72万',
    favorites: '2.9万',
    author: '善良的蜜蜂',
    score: '9.6',
    ratingCount: '8.8万人评价',
    liveReaders: '634.72万',
    totalReads: '77.03万',
    resultBadge: 'level',
    resultBadgeText: 'L2等级',
  },
  {
    id: 302,
    title: '盖世神医',
    cover:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=480&q=80',
    views: '2.9万阅读',
    status: '连载中',
    words: '200万以上',
    tags: ['都市', '神医', '逆袭'],
    updatedAt: '2026-03-19 14:43:04',
    intro: '被低估的年轻神医一路打脸逆袭，名利与风暴同时追来。',
    latestChapter: '第550章 只是意外吗？',
    chapterCount: 418,
    reads: '833.21万',
    favorites: '2.9万',
    author: '沙拉薯条',
    score: '9.6',
    ratingCount: '8.8万人评价',
    liveReaders: '833.21万',
    totalReads: '77.03万',
    resultBadge: 'vip',
    resultBadgeText: 'VIP',
  },
  {
    id: 303,
    title: '月蚀海面',
    cover:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=480&q=80',
    views: '2.9万阅读',
    status: '完本',
    words: '98万字',
    tags: ['悬疑', '治愈'],
    updatedAt: '2026-03-18 11:03:24',
    intro: '海面之下埋着多年前的旧案，也藏着她从未说出口的秘密。',
    latestChapter: '第218章 最后的潮声',
    chapterCount: 218,
    reads: '120.22万',
    favorites: '1.8万',
    author: '岚西',
    score: '9.2',
    ratingCount: '4.1万人评价',
    liveReaders: '120.22万',
    totalReads: '18.5万',
    resultBadge: 'coin',
    resultBadgeText: '10金币',
  },
  {
    id: 304,
    title: '雾色纸牌',
    cover:
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=480&q=80',
    views: '2.9万阅读',
    status: '完本',
    words: '154万字',
    tags: ['都市', '脑洞'],
    updatedAt: '2026-03-21 19:12:12',
    intro: '一副旧纸牌串起四段人生，命运在翻牌之间悄悄改写。',
    latestChapter: '第310章 逆牌',
    chapterCount: 310,
    reads: '242.11万',
    favorites: '2.3万',
    author: '书隐',
    score: '9.0',
    ratingCount: '5.0万人评价',
    liveReaders: '242.11万',
    totalReads: '24.4万',
    resultBadge: 'coin',
    resultBadgeText: '免费',
  },
];

const purchasedItems: ShelfNovel[] = [
  {
    ...shelfItems[1],
    id: 305,
    title: '月下惊鸿',
    status: '完本',
    resultBadge: 'vip',
    resultBadgeText: 'VIP',
    author: '沈晏',
    score: '9.4',
  },
  {
    ...shelfItems[3],
    id: 306,
    title: '荒城旧梦',
    resultBadge: 'coin',
    resultBadgeText: '10金币',
    author: '故川',
    score: '9.1',
  },
];

function ShelfHeader({
  activeTab,
  onTabChange,
}: {
  activeTab: 'basket' | 'purchased';
  onTabChange: (tab: 'basket' | 'purchased') => void;
}) {
  const tabs = [
    { id: 'basket' as const, label: '书篮' },
    { id: 'purchased' as const, label: '已购买' },
  ];

  return (
    <header className="fixed left-1/2 top-0 z-[70] w-full max-w-[430px] -translate-x-1/2 border-b border-border/40 bg-background/92 backdrop-blur-2xl">
      <div className="px-4 pb-2 pt-3">
        <TopBrandBar />
        <div className="mt-3 flex items-center gap-4">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`relative pb-2 text-[14px] transition-colors ${
                  isActive ? 'font-semibold text-foreground' : 'text-muted-foreground'
                }`}
              >
                {tab.label}
                {isActive ? (
                  <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-primary" />
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}

function ShelfEmptyState() {
  return (
    <div className="flex min-h-[calc(100vh-190px)] flex-col items-center justify-center px-8 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-[24px] border border-white/8 bg-card/72 shadow-[0_14px_30px_rgba(0,0,0,0.12)]">
        <BookOpenText className="h-9 w-9 text-white/14" />
      </div>
      <p className="mt-5 text-[14px] text-white/36">书架空空的，快去收藏喜欢的小说吧~</p>
    </div>
  );
}

function ShelfGrid({
  items,
  onOpenDetail,
}: {
  items: ShelfNovel[];
  onOpenDetail?: (novel: NovelDetailData) => void;
}) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-5">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onOpenDetail?.(item)}
            className="text-left transition-all active:scale-[0.99]"
          >
            <div className="overflow-hidden rounded-2xl border border-white/8 bg-card/92 shadow-lg shadow-black/8">
              <div className="relative h-[180px] overflow-hidden">
                <img src={item.cover} alt={item.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,20,0.06),transparent_36%,rgba(8,10,20,0.28)_70%,rgba(8,10,20,0.8)_100%)]" />

                <div className="absolute left-2 top-2 flex gap-1.5">
                  <SerialStatusBadge status={item.status} />
                </div>

                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-2.5 pb-2 text-xs text-white">
                  <span className="inline-flex items-center gap-0.5 text-[#ffd25f]">
                    <Star className="h-3 w-3 fill-current" />
                    {item.score ?? '9.6'}
                  </span>
                  <HeatCount
                    value={item.views}
                    className="text-[12px] text-white/88"
                    iconClassName="h-3 w-3"
                  />
                </div>
              </div>

              <div className="p-3">
                <h3 className="line-clamp-2 text-[15px] font-medium text-foreground/94">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">{item.author}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="pt-7 text-center">
        <button className="inline-flex items-center gap-1 text-[14px] text-white/64 transition-colors hover:text-white/88">
          <RefreshCw className="h-3.5 w-3.5" />
          加载更多
        </button>
      </div>
    </div>
  );
}

export function ShelfPage({ onOpenSearch, onOpenDetail, onSelectPage }: ShelfPageProps) {
  const [activeTab, setActiveTab] = useState<'basket' | 'purchased'>('basket');
  const displayItems = useMemo(
    () => (activeTab === 'basket' ? shelfItems : purchasedItems),
    [activeTab],
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ShelfHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <main className="px-4 pb-24 pt-[108px]">
        {displayItems.length === 0 ? (
          <ShelfEmptyState />
        ) : (
          <ShelfGrid items={displayItems} onOpenDetail={onOpenDetail} />
        )}
      </main>

      <BottomNav
        onOpenSearch={onOpenSearch}
        onSelectPage={onSelectPage}
        activePage="shelf"
      />
    </div>
  );
}
