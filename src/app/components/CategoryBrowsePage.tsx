import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  Eye,
} from 'lucide-react';
import vipBadge from '../../assets/vip-badge.svg';
import coinBadge from '../../assets/coin-badge.svg';
import levelBadge from '../../assets/level-badge.svg';
import type { NovelDetailData } from './NovelDetailPage';
import { SerialStatusBadge } from './ui/serial-status-badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface FilterGroup {
  key: string;
  label: string;
  options: string[];
}

interface CategoryBrowsePageProps {
  onBack: () => void;
  variant?: 'category' | 'allWorks' | 'finished' | 'free' | 'vip';
  onOpenDetail?: (novel: NovelDetailData) => void;
}

interface BrowseItem {
  id: number;
  title: string;
  desc: string;
  cover: string;
  views: string;
  updatedAt: string;
  status: string;
  tags: string[];
  words: string;
  badge?: 'vip' | 'coin' | 'level';
}

const filterGroups: FilterGroup[] = [
  {
    key: 'category',
    label: '作品分类',
    options: [
      '全部',
      '现代言情',
      '古代言情',
      '幻想言情',
      '历史',
      '军事',
      '科幻',
      '游戏',
      '游戏竞技',
      '玄幻言情',
      '都市',
      '奇闻异事',
      '武侠仙侠',
      '体育',
      'N次元',
      '文学艺术',
      '人文社科',
      '经营励志',
      '经商文学',
      '出版小说',
      '少儿教育',
      '衍生言情',
      '现实题材',
    ],
  },
  {
    key: 'tag',
    label: '标签',
    options: [
      '全部',
      '热血',
      '无敌流',
      '升级流',
      '甜宠',
      '豪门',
      '女强',
      '宅斗',
      '权谋',
      '经营',
      '都市',
      '成长',
      '医妃',
      '打脸',
      '萌宝',
      '婚恋',
      '群像',
      '战争',
    ],
  },
  {
    key: 'price',
    label: '资费',
    options: ['全部', '免费', 'VIP', '金币', '等级'],
  },
  {
    key: 'words',
    label: '作品字数',
    options: ['全部', '30万以下', '30万-50万', '50万-100万', '100万-200万', '200万以上'],
  },
  {
    key: 'update',
    label: '更新时间',
    options: ['全部', '3天内', '7天内', '30天内'],
  },
  {
    key: 'status',
    label: '是否完结',
    options: ['全部', '已完结', '连载中'],
  },
];

const sortOptions = ['按点击量', '按热度', '按更新时间', '按收藏数'];

const inlineFilterKeys = new Set(['category', 'tag', 'price']);
const dropdownFilterKeys = new Set(['words', 'update', 'status']);

const browseItems: BrowseItem[] = [
  {
    id: 1,
    title: '盖世神医',
    desc: '被低估的年轻神医一路打脸逆袭，名利与风暴同时追来。',
    cover: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=480&q=80',
    views: '833.21万',
    updatedAt: '更新于 2026-03-19',
    status: '连载中',
    tags: ['都市', '神医', '逆袭'],
    words: '字数 200万以上',
  },
  {
    id: 2,
    title: '真北·登机！真北战列',
    desc: '钢铁舰队、极寒海域与燃烧意志交织，少年指挥官踏上逆袭征途。',
    cover: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=480&q=80',
    views: '791.0万',
    updatedAt: '更新于 2026-03-23',
    status: '连载中',
    tags: ['热血', '战争', '舰队'],
    words: '等级  字数 100万-200万',
    badge: 'level',
  },
  {
    id: 3,
    title: '葬神棺',
    desc: '一口神棺牵出万古隐秘，少年自深渊一路杀到苍穹之上。',
    cover: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=480&q=80',
    views: '634.72万',
    updatedAt: '更新于 2026-03-16',
    status: '连载中',
    tags: ['玄幻', '升级流', '热血'],
    words: '金币  字数 200万以上',
    badge: 'coin',
  },
  {
    id: 4,
    title: '都说霍二爷不行？其实误会不小',
    desc: '一场误会引出豪门真心局，她在风暴中心反转命运。',
    cover: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=480&q=80',
    views: '522.30万',
    updatedAt: '更新于 2026-03-20',
    status: '完本',
    tags: ['豪门', '甜宠', '婚恋'],
    words: 'VIP  字数 100万-200万',
    badge: 'vip',
  },
];

const pageConfigs = {
  category: {
    title: '作品分类',
    subtitle: '按分类筛选你感兴趣的作品',
    presetFilters: {},
  },
  allWorks: {
    title: '全部作品',
    subtitle: '浏览站内全部作品内容',
    presetFilters: {},
  },
  finished: {
    title: '完本小说',
    subtitle: '查看已完结的高热度作品',
    presetFilters: { status: '已完结' },
  },
  free: {
    title: '免费小说',
    subtitle: '筛选当前可以免费阅读的内容',
    presetFilters: { price: '免费' },
  },
  vip: {
    title: 'VIP专区',
    subtitle: '浏览 VIP 专享阅读内容',
    presetFilters: { price: 'VIP' },
  },
} satisfies Record<
  NonNullable<CategoryBrowsePageProps['variant']>,
  {
    title: string;
    subtitle: string;
    presetFilters: Partial<Record<string, string>>;
  }
>;

export function CategoryBrowsePage({
  onBack,
  variant = 'category',
  onOpenDetail,
}: CategoryBrowsePageProps) {
  const pageConfig = pageConfigs[variant];
  const defaultFilters = useMemo(
    () => ({
      ...Object.fromEntries(filterGroups.map((group) => [group.key, group.options[0]])),
      ...pageConfig.presetFilters,
    }),
    [pageConfig],
  );
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>(
    defaultFilters,
  );
  const [sortBy, setSortBy] = useState(sortOptions[0]);

  useEffect(() => {
    setSelectedFilters(defaultFilters);
    setSortBy(sortOptions[0]);
  }, [defaultFilters]);

  const visibleItems = useMemo(() => {
    return browseItems.filter((item) => {
      const selectedPrice = selectedFilters.price;
      const selectedStatus = selectedFilters.status;

      if (selectedStatus === '已完结' && item.status !== '完本') {
        return false;
      }

      if (selectedStatus === '连载中' && item.status !== '连载中') {
        return false;
      }

      if (selectedPrice === '免费' && item.badge) {
        return false;
      }

      if (selectedPrice === 'VIP' && item.badge !== 'vip') {
        return false;
      }

      if (selectedPrice === '金币' && item.badge !== 'coin') {
        return false;
      }

      if (selectedPrice === '等级' && item.badge !== 'level') {
        return false;
      }

      return true;
    });
  }, [selectedFilters.price, selectedFilters.status]);

  const buildDetailData = (item: BrowseItem): NovelDetailData => ({
    id: item.id,
    title: item.title,
    cover: item.cover,
    views: item.views,
    status: item.status,
    words: item.words.replace(/^.*字数\s*/, ''),
    tags: item.tags,
    updatedAt: item.updatedAt,
    intro: `${item.desc} ${item.title}围绕${item.tags.join('、')}等元素铺开，节奏稳、情绪足，适合一口气沉浸式阅读。`,
    latestChapter: `更新至${item.title}·${item.updatedAt.replace('更新于 ', '')} 最新章节`,
    chapterCount: item.status === '完本' ? 550 : 342,
    reads: item.views,
    favorites: item.views,
    author: item.tags[0] === '都市' ? '沙拉薯条' : item.tags[0] === '热血' ? '沈墨安' : '月下闻笙',
    score: item.status === '完本' ? '9.7' : '9.6',
    ratingCount: item.status === '完本' ? '9.4万人评价' : '8.8万人评价',
    liveReaders: item.views,
    totalReads: item.views,
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed top-0 left-1/2 z-[70] w-full max-w-[430px] -translate-x-1/2 border-b border-white/6 bg-background/94 backdrop-blur-2xl">
        <div className="flex items-center gap-3 px-4 pb-3 pt-4">
          <button
            onClick={onBack}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-muted/70 text-foreground/88 transition-all hover:bg-muted active:scale-95"
            aria-label="返回"
          >
            <ArrowLeft className="h-4.5 w-4.5" />
          </button>
          <div>
            <h1 className="text-[17px] font-semibold text-foreground/96">{pageConfig.title}</h1>
            <p className="mt-0.5 text-[12px] text-muted-foreground">
              {pageConfig.subtitle}
            </p>
          </div>
        </div>
      </header>

      <main className="px-4 pb-8 pt-[88px]">
        <section>
          {filterGroups
            .filter((group) => inlineFilterKeys.has(group.key))
            .map((group) => (
            <div
              key={group.key}
              className="px-4 py-4"
            >
              <div className="flex items-center gap-4">
                <div className="shrink-0 text-sm text-muted-foreground/86">
                  {group.label}:
                </div>
                <div className="relative min-w-0 flex-1">
                  <div className="scrollbar-hide flex gap-2.5 overflow-x-auto whitespace-nowrap pr-10">
                    {group.options.map((option) => {
                      const isSelected = selectedFilters[group.key] === option;

                      return (
                        <button
                          key={option}
                          onClick={() =>
                            setSelectedFilters((current) => ({
                              ...current,
                              [group.key]: option,
                            }))
                          }
                          className={`shrink-0 rounded-full px-4 py-2 text-sm transition-all ${
                            isSelected
                              ? 'bg-primary-gradient text-white shadow-[0_10px_24px_rgba(97,102,240,0.24)]'
                              : 'text-foreground/86 hover:bg-muted/78'
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>

                  <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-background via-background/92 to-transparent" />
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="mt-5">
          <div className="px-4 py-4">
            <div className="grid grid-cols-4 gap-2">
              {filterGroups
                .filter((group) => dropdownFilterKeys.has(group.key))
                .map((group) => (
                  <Select
                    key={group.key}
                    value={selectedFilters[group.key]}
                    onValueChange={(value) =>
                      setSelectedFilters((current) => ({
                        ...current,
                        [group.key]: value,
                      }))
                    }
                  >
                    <SelectTrigger className="h-9 min-w-0 rounded-xl border-white/8 bg-muted/48 px-3 text-xs text-foreground/88">
                      <SelectValue placeholder={group.label} />
                    </SelectTrigger>
                    <SelectContent className="border-white/8 bg-card text-foreground">
                      {group.options.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ))}

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-9 min-w-0 rounded-xl border-white/8 bg-muted/48 px-3 text-xs text-foreground/88">
                  <SelectValue placeholder="排序方式" />
                </SelectTrigger>
                <SelectContent className="border-white/8 bg-card text-foreground">
                  {sortOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-3 px-3 py-1">
            {visibleItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onOpenDetail?.(buildDetailData(item))}
                className="w-full overflow-hidden rounded-[22px] border border-white/8 bg-[#1b1b2f] p-3 text-left shadow-[0_14px_32px_rgba(0,0,0,0.18)] transition-all active:scale-[0.99]"
              >
                {(() => {
                  const badgeSrc =
                    item.badge === 'vip'
                      ? vipBadge
                      : item.badge === 'coin'
                        ? coinBadge
                        : item.badge === 'level'
                          ? levelBadge
                          : null;
                  const badgeAlt =
                    item.badge === 'vip'
                      ? 'VIP'
                      : item.badge === 'coin'
                        ? '金币'
                        : item.badge === 'level'
                          ? '等级'
                          : '';

                  return (
                <div className="flex gap-3">
                  <div className="relative h-[144px] w-[98px] shrink-0 overflow-hidden rounded-[14px] bg-muted">
                    <img
                      src={item.cover}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,20,0.05),transparent_32%,rgba(8,10,20,0.18)_66%,rgba(8,10,20,0.72)_100%)]" />
                    {badgeSrc ? (
                      <img
                        src={badgeSrc}
                        alt={badgeAlt}
                        className="absolute right-1.5 top-1.5 h-6 w-auto max-w-[46px] object-contain"
                      />
                    ) : null}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="line-clamp-2 text-[20px] font-semibold leading-tight text-foreground/96">
                        {item.title}
                      </h2>
                      <SerialStatusBadge status={item.status} className="shrink-0" />
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Eye className="h-3.5 w-3.5" />
                        {item.views}
                      </span>
                      <span>{item.updatedAt}</span>
                    </div>

                    <p className="mt-3 truncate text-sm leading-7 text-muted-foreground">
                      {item.desc}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-primary-gradient-soft text-primary inline-flex rounded-md px-1.5 py-0.5 text-[11px]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-3 text-[12px] text-muted-foreground/84">
                      {item.words}
                    </div>
                  </div>
                </div>
                  );
                })()}
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
