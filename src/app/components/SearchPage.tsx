import { useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  ArrowLeft,
  ChevronRight,
  Clock3,
  Flame,
  Search,
  Star,
  X,
} from 'lucide-react';
import levelBadge from '../../assets/level-badge.svg';
import type { NovelDetailData } from './NovelDetailPage';
import { HeatCount } from './ui/heat-count';
import { SerialStatusBadge } from './ui/serial-status-badge';

interface SearchPageProps {
  onBack: () => void;
  history: string[];
  onHistoryChange: (history: string[]) => void;
  onOpenDetail?: (novel: NovelDetailData) => void;
  initialQuery?: string;
}

interface SearchResultCard extends NovelDetailData {
  resultBadge?: 'vip' | 'level';
  resultBadgeText?: string;
  keywords?: string[];
}

const recommendKeywords = ['豪门虐恋', '玄幻热血', '已完结', '高分甜宠', '古代权谋', '都市神医'];
const hotRankings = ['鼠标移入状态', '热搜词条', '完本小说', '连载爆款'];
const suggestionPool = [
  '热搜词条',
  '热搜词条推荐',
  '热搜词条合集',
  '热搜词条榜单',
  '热搜词条专区',
  '鼠标移入状态',
  '玄幻热血',
  '豪门甜宠',
];

const searchNovels: SearchResultCard[] = [
  {
    id: 101,
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
    keywords: ['修罗武神', '修武罗神', '修武罗', '修武', '修罗', '罗神'],
  },
  {
    id: 102,
    title: '盖世神医',
    cover:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=480&q=80',
    views: '833.21万',
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
    keywords: ['盖世神医', '神医', '都市神医', '修医', '医生'],
  },
  {
    id: 103,
    title: '葬神棺',
    cover:
      'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=480&q=80',
    views: '634.72万',
    status: '连载中',
    words: '200万以上',
    tags: ['玄幻', '升级流', '热血'],
    updatedAt: '2026-03-16 09:24:18',
    intro: '一口神棺牵出万古隐秘，少年自深渊一路杀到苍穹之上。',
    latestChapter: '第418章 你听见海面之下了吗',
    chapterCount: 418,
    reads: '634.72万',
    favorites: '2.9万',
    author: '月关',
    score: '9.1',
    ratingCount: '6.4万人评价',
    liveReaders: '634.72万',
    totalReads: '70.52万',
    resultBadge: 'level',
    resultBadgeText: 'L2等级',
    keywords: ['葬神棺', '神棺', '玄幻热血', '热血升级', '棺'],
  },
  {
    id: 104,
    title: '世子先别死，夫人有喜了',
    cover:
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=480&q=80',
    views: '2.9万阅读',
    status: '连载中',
    words: '131万字',
    tags: ['古言', '权谋', '高分'],
    updatedAt: '2026-03-24 00:42:05',
    intro: '前世错付，今生她先手布局，在风暴之中拿回命运。',
    latestChapter: '第550章 只是意外吗？',
    chapterCount: 550,
    reads: '35.1万',
    favorites: '6.6万人',
    author: '沙拉薯条',
    score: '9.6',
    ratingCount: '8.8万人评价',
    liveReaders: '6.6万人',
    totalReads: '35.1万',
    resultBadge: 'vip',
    resultBadgeText: 'VIP',
    keywords: ['世子先别死', '夫人有喜了', '古代权谋', '古言', '权谋'],
  },
];

function normalizeSearchText(value: string) {
  return value.replace(/\s+/g, '').replace(/[？?！!，,。.\-·]/g, '').toLowerCase();
}

function fuzzyMatch(query: string, item: SearchResultCard) {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return true;

  const haystack = normalizeSearchText(
    `${item.title}${item.author ?? ''}${item.intro}${item.tags.join('')}${(item.keywords ?? []).join('')}`,
  );

  if (haystack.includes(normalizedQuery)) return true;

  if ((item.keywords ?? []).some((keyword) => normalizeSearchText(keyword).includes(normalizedQuery))) {
    return true;
  }

  const uniqueChars = Array.from(new Set(normalizedQuery.split('')));
  const overlap = uniqueChars.filter((char) => haystack.includes(char)).length;

  return uniqueChars.length >= 2 && overlap / uniqueChars.length >= 0.75;
}

function SearchBanner() {
  return (
    <div className="mt-6">
      <div className="relative overflow-hidden rounded-[18px] border border-white/8 bg-card/78 shadow-[0_14px_30px_rgba(0,0,0,0.16)]">
        <img
          src="https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=80"
          alt="版权改编"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,18,36,0.88)_0%,rgba(12,16,33,0.72)_58%,rgba(8,10,22,0.9)_100%)]" />
        <div className="relative flex h-[112px] flex-col items-center justify-center px-6 text-center">
          <div className="text-[22px] font-semibold text-white">版权改编</div>
          <div className="mt-2 text-[12px] leading-5 text-white/64">
            热门 IP 原著正在持续更新，点进来挖掘下一个爆款
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({
  title,
  trailing,
}: {
  title: string;
  trailing?: ReactNode;
}) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-[17px] font-semibold text-white">{title}</h2>
      {trailing}
    </div>
  );
}

export function SearchPage({
  onBack,
  history,
  onHistoryChange,
  onOpenDetail,
  initialQuery = '',
}: SearchPageProps) {
  const [query, setQuery] = useState(initialQuery);
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [visibleResultCount, setVisibleResultCount] = useState(6);

  useEffect(() => {
    setQuery(initialQuery);
    setSubmittedQuery('');
  }, [initialQuery]);

  useEffect(() => {
    setVisibleResultCount(6);
  }, [submittedQuery]);

  const trimmedQuery = query.trim();
  const isSuggesting = trimmedQuery.length > 0 && submittedQuery !== trimmedQuery;

  const suggestions = useMemo(() => {
    if (!trimmedQuery) return suggestionPool.slice(0, 6);
    return suggestionPool
      .filter((item) => item.toLowerCase().includes(trimmedQuery.toLowerCase()))
      .slice(0, 6);
  }, [trimmedQuery]);

  const results = useMemo(() => {
    if (!submittedQuery) return [];
    return searchNovels.filter((item) => fuzzyMatch(submittedQuery, item));
  }, [submittedQuery]);

  const resultCards = useMemo(() => {
    if (results.length === 0) return [];
    return Array.from({ length: 12 }, (_, index) => results[index % results.length]);
  }, [results]);

  const visibleResultCards = resultCards.slice(0, visibleResultCount);

  const commitSearch = (value: string) => {
    const next = value.trim();
    setQuery(next);
    setSubmittedQuery(next);

    if (!next) return;

    onHistoryChange([next, ...history.filter((item) => item !== next)].slice(0, 6));
  };

  const clearHistoryItem = (item: string) => {
    onHistoryChange(history.filter((entry) => entry !== item));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed left-1/2 top-0 z-[90] w-full max-w-[430px] -translate-x-1/2 border-b border-white/8 bg-background/92 backdrop-blur-2xl">
        <div className="flex items-center gap-3 px-4 pb-3 pt-4">
          <button
            onClick={onBack}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/8 text-white/84 transition-all active:scale-95"
            aria-label="返回"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <div className="flex h-10 flex-1 overflow-hidden rounded-[14px] border border-primary/25 bg-card/76 shadow-[0_12px_28px_rgba(97,102,240,0.14)]">
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                if (!event.target.value.trim()) setSubmittedQuery('');
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  commitSearch(query);
                }
              }}
              placeholder="请输入搜索关键词"
              className="h-full flex-1 bg-transparent px-3 text-[14px] text-white outline-none placeholder:text-white/42"
            />
            <button
              onClick={() => commitSearch(query)}
              className="inline-flex h-full shrink-0 items-center gap-1.5 bg-primary-gradient px-4 text-[13px] font-medium text-white active:scale-[0.98]"
            >
              <Search className="h-4 w-4" />
              搜索
            </button>
          </div>
        </div>
      </header>

      <main className="px-4 pb-10 pt-[82px]">
        {isSuggesting ? (
          <div className="overflow-hidden rounded-[18px] border border-white/8 bg-card/74 shadow-[0_12px_28px_rgba(0,0,0,0.12)]">
            {suggestions.map((item, index) => (
              <button
                key={item}
                onClick={() => commitSearch(item)}
                className={`flex h-12 w-full items-center px-4 text-left text-[14px] text-white/82 transition-colors ${
                  index === 0 ? 'bg-primary/16 text-white' : 'hover:bg-white/[0.04]'
                } ${index !== suggestions.length - 1 ? 'border-b border-white/6' : ''}`}
              >
                {item}
              </button>
            ))}
          </div>
        ) : submittedQuery ? (
          results.length > 0 ? (
            <div>
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-[15px] font-medium text-white/88">
                  共找到 999 本相关小说
                </h2>
                <span className="text-[12px] text-muted-foreground">“{submittedQuery}”</span>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-5">
                {visibleResultCards.map((item, index) => (
                  <button
                    key={`${item.id}-${index}`}
                    onClick={() => onOpenDetail?.(item)}
                    className="text-left transition-all active:scale-[0.99]"
                  >
                    <div className="overflow-hidden rounded-2xl border border-white/8 bg-card/92 shadow-lg shadow-black/8">
                      <div className="relative h-[180px] overflow-hidden">
                        <img src={item.cover} alt={item.title} className="h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,20,0.06),transparent_36%,rgba(8,10,20,0.28)_70%,rgba(8,10,20,0.8)_100%)]" />

                        <div className="absolute left-2 top-2 flex gap-1.5">
                          {item.resultBadgeText ? (
                            item.resultBadge === 'level' ? (
                              <img
                                src={levelBadge}
                                alt="等级"
                                className="h-5 w-auto object-contain"
                              />
                            ) : (
                              <span className="inline-flex rounded-md bg-[#ff4c4c] px-1.5 py-0.5 text-[11px] text-white">
                                {item.resultBadgeText}
                              </span>
                            )
                          ) : null}
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
                        <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-muted-foreground">
                          {item.intro}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {visibleResultCount < resultCards.length ? (
                <div className="pt-8 text-center">
                  <button
                    onClick={() => setVisibleResultCount((count) => Math.min(count + 4, resultCards.length))}
                    className="text-[14px] text-white/64 transition-colors hover:text-white/88"
                  >
                    加载更多
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <div>
              <div className="rounded-[18px] border border-white/8 bg-card/74 px-4 py-10 text-center shadow-[0_12px_28px_rgba(0,0,0,0.12)]">
                <div className="text-[22px] font-semibold text-white">未找到匹配项</div>
                <div className="mt-2 text-[13px] text-muted-foreground">
                  没有搜到 “{submittedQuery}”，试试下面这些推荐词
                </div>
              </div>

              <div className="mt-8">
                <SectionTitle title="猜你想搜" />
                <div className="grid grid-cols-2 gap-3">
                  {recommendKeywords.map((item, index) => (
                    <button
                      key={item}
                      onClick={() => commitSearch(item)}
                      className={`rounded-[14px] border px-4 py-3 text-left text-[14px] transition-all active:scale-[0.98] ${
                        index === 0
                          ? 'border-white/10 bg-white/[0.05] text-white'
                          : 'border-white/6 bg-card/56 text-white/78'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <SearchBanner />

              <div className="mt-8">
                <SectionTitle title="热门搜索" />
                <div className="space-y-2.5">
                  {hotRankings.map((item, index) => (
                    <button
                      key={item}
                      onClick={() => commitSearch(item)}
                      className={`flex h-12 w-full items-center gap-3 rounded-[14px] px-4 text-left transition-all active:scale-[0.99] ${
                        index === 0
                          ? 'border border-white/8 bg-white/[0.06] text-white shadow-[0_8px_18px_rgba(0,0,0,0.12)]'
                          : 'text-white/76'
                      }`}
                    >
                      <span className={`w-4 text-center text-[15px] font-semibold ${index === 0 ? 'text-white' : 'text-primary-light'}`}>
                        {index + 1}
                      </span>
                      <span className="text-[14px]">{item}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )
        ) : (
          <div>
            {history.length > 0 ? (
              <div className="mb-8">
                <SectionTitle
                  title="最近搜索"
                  trailing={
                    <button
                      onClick={() => onHistoryChange([])}
                      className="text-[12px] text-muted-foreground transition-colors hover:text-white/84"
                    >
                      全部清空
                    </button>
                  }
                />

                <div className="space-y-1">
                  {history.map((item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between rounded-[14px] px-1 py-2 text-[14px] text-white/84"
                    >
                      <button
                        onClick={() => commitSearch(item)}
                        className="flex flex-1 items-center gap-3 text-left"
                      >
                        <Clock3 className="h-4 w-4 text-white/36" />
                        <span>{item}</span>
                      </button>
                      <button
                        onClick={() => clearHistoryItem(item)}
                        className="p-1 text-white/48 transition-colors hover:text-white/82"
                        aria-label={`删除 ${item}`}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="mb-8">
              <SectionTitle title="猜你想搜" />
              <div className="grid grid-cols-2 gap-3">
                {recommendKeywords.map((item, index) => (
                  <button
                    key={item}
                    onClick={() => commitSearch(item)}
                    className={`rounded-[14px] border px-4 py-3 text-left text-[14px] transition-all active:scale-[0.98] ${
                      index === 0
                        ? 'border-white/10 bg-white/[0.05] text-white'
                        : 'border-white/6 bg-card/56 text-white/78'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <SearchBanner />

            <div className="mt-8">
              <SectionTitle
                title="热门搜索"
                trailing={
                  <div className="inline-flex items-center gap-1 text-[12px] text-primary-light">
                    <Flame className="h-3.5 w-3.5" />
                    趋势更新
                  </div>
                }
              />
              <div className="space-y-2.5">
                {hotRankings.map((item, index) => (
                  <button
                    key={item}
                    onClick={() => commitSearch(item)}
                    className={`flex h-12 w-full items-center gap-3 rounded-[14px] px-4 text-left transition-all active:scale-[0.99] ${
                      index === 0
                        ? 'border border-white/8 bg-white/[0.06] text-white shadow-[0_8px_18px_rgba(0,0,0,0.12)]'
                        : 'text-white/76'
                    }`}
                  >
                    <span className={`w-4 text-center text-[15px] font-semibold ${index === 0 ? 'text-white' : 'text-primary-light'}`}>
                      {index + 1}
                    </span>
                    <span className="text-[14px]">{item}</span>
                    <ChevronRight className="ml-auto h-4 w-4 text-white/24" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
