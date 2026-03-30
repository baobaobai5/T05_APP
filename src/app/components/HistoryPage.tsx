import { useMemo, useState } from 'react';
import {
  Download,
  ImageOff,
  Menu,
  RefreshCw,
  Star,
} from 'lucide-react';
import logo from '../../assets/logo.svg';
import { BottomNav } from './BottomNav';
import type { NovelDetailData } from './NovelDetailPage';
import { HeatCount } from './ui/heat-count';
import { SerialStatusBadge } from './ui/serial-status-badge';

interface HistoryPageProps {
  onOpenSearch?: () => void;
  onOpenDetail?: (novel: NovelDetailData) => void;
  onSelectPage?: (page: 'home' | 'history' | 'shelf' | 'wallet') => void;
}

interface HistoryNovel extends NovelDetailData {
  resultBadge?: 'vip' | 'level' | 'coin';
  resultBadgeText?: string;
}

const historyItems: HistoryNovel[] = [
  {
    id: 201,
    title: '修罗武神',
    cover:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=480&q=80',
    views: '2.9万阅读',
    status: '连载中',
    words: '634万字',
    tags: ['玄幻', '热血', '逆袭'],
    updatedAt: '2026-03-26 08:42:05',
    intro: '少年自卑微之地走出，在修罗界域中以武证道，逆天而行。',
    latestChapter: '第550章 修罗界门开启',
    chapterCount: 999,
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
    id: 202,
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
    id: 203,
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
    resultBadgeText: '免费',
  },
  {
    id: 204,
    title: '雾色纸牌',
    cover:
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=480&q=80',
    views: '2.9万阅读',
    status: '连载中',
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

function HistoryHeader(_: { onOpenSearch?: () => void; onOpenProfile?: () => void }) {
  return (
    <header className="fixed left-1/2 top-0 z-[70] w-full max-w-[430px] -translate-x-1/2 border-b border-border/40 bg-background/92 backdrop-blur-2xl">
      <div className="px-4 pb-2.5 pt-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src={logo} alt="小优 logo" className="h-7 w-auto object-contain" />
          </div>

          <div className="flex items-center gap-1.5">
            <button className="relative flex h-8 w-8 items-center justify-center rounded-[10px] bg-muted/60 text-foreground/80 transition-all hover:bg-muted active:scale-95">
              <Download className="h-[17px] w-[17px]" />
              <span className="absolute right-1.5 top-1 h-1.5 w-1.5 rounded-full bg-red-500 shadow shadow-red-500/50"></span>
            </button>
            <button className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-[10px] bg-muted/60 text-foreground/80 transition-all hover:bg-muted active:scale-95">
              <img
                src="https://images.unsplash.com/photo-1740102075520-fe22a53035cf?w=80&q=80"
                alt="avatar"
                className="h-full w-full rounded-[10px] object-cover"
              />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-muted/60 text-foreground/80 transition-all hover:bg-muted active:scale-95">
              <Menu className="h-[16px] w-[16px]" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

function EmptyState() {
  return (
    <div className="flex min-h-[calc(100vh-170px)] flex-col items-center justify-center px-8 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-[24px] border border-white/8 bg-card/72 shadow-[0_14px_30px_rgba(0,0,0,0.12)]">
        <ImageOff className="h-9 w-9 text-white/14" />
      </div>
      <p className="mt-5 text-[14px] text-white/36">暂无记录，快去浏览吧~</p>
    </div>
  );
}

function HistoryGrid({
  items,
  onOpenDetail,
}: {
  items: HistoryNovel[];
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

export function HistoryPage({ onOpenSearch, onOpenDetail, onSelectPage }: HistoryPageProps) {
  const [hasHistory, setHasHistory] = useState(true);
  const displayItems = useMemo(() => (hasHistory ? historyItems : []), [hasHistory]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <HistoryHeader onOpenSearch={onOpenSearch} />

      <main className="px-4 pb-24 pt-[78px]">
        {displayItems.length === 0 ? (
          <EmptyState />
        ) : (
          <HistoryGrid items={displayItems} onOpenDetail={onOpenDetail} />
        )}
      </main>

      <button
        onClick={() => setHasHistory((value) => !value)}
        className="fixed right-4 top-[92px] z-20 rounded-full border border-white/10 bg-card/90 px-3 py-1.5 text-[11px] text-white/62 backdrop-blur-xl"
      >
        {hasHistory ? '切换空状态' : '切换有记录'}
      </button>

      <BottomNav
        onOpenSearch={onOpenSearch}
        onSelectPage={onSelectPage}
        activePage="history"
      />
    </div>
  );
}
