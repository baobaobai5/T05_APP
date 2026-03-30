import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ChevronRight,
  Clock3,
  Eye,
  Heart,
  List,
  Search,
  Share2,
  Sparkles,
  Star,
} from 'lucide-react';
import promoBanner from '../../assets/promo-sale-banner.png';
import { HeatCount } from './ui/heat-count';
import { SerialStatusBadge } from './ui/serial-status-badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import type { ReaderChapterData } from './ReadingPage';

export interface NovelDetailData {
  id: number;
  title: string;
  cover: string;
  views: string;
  status: string;
  words: string;
  tags: string[];
  updatedAt: string;
  intro: string;
  latestChapter: string;
  chapterCount: number;
  reads: string;
  favorites: string;
  author?: string;
  score?: string;
  ratingCount?: string;
  liveReaders?: string;
  totalReads?: string;
}

interface NovelDetailPageProps {
  novel: NovelDetailData;
  onBack: () => void;
  onOpenChapter?: (chapter: ReaderChapterData) => void;
  onStartReading?: () => void;
}

type DetailTab = 'intro' | 'chapters';

function formatChapterCount(count: number) {
  return `${count}章`;
}

function AdaptationBanner() {
  return (
    <div className="mt-8">
      <div
        className="relative overflow-hidden rounded-[10px] border border-white/6 shadow-2xl shadow-primary/15"
        style={{ height: 184 }}
      >
        <img
          src="https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=80"
          alt="版权改编"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,18,36,0.88)_0%,rgba(12,16,33,0.76)_55%,rgba(7,10,22,0.92)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.06),transparent_30%)]" />

        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
          <h3 className="text-[28px] font-semibold tracking-[0.02em] text-white">
            版权改编
          </h3>
          <p className="mt-3 max-w-[280px] text-[13px] leading-6 text-white/62">
            热门版权动漫、影视现正在万象出品，来万象，追精品 IP 原著小说
          </p>
          <button className="mt-5 inline-flex h-11 items-center gap-1 rounded-full bg-primary-gradient px-6 text-[15px] font-semibold text-white shadow-[0_14px_28px_rgba(97,102,240,0.28)]">
            查看全部
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function FinderPanel({
  finderFilters,
  setFinderFilters,
}: {
  finderFilters: {
    category: string;
    status: string;
    price: string;
    score: string;
  };
  setFinderFilters: React.Dispatch<
    React.SetStateAction<{
      category: string;
      status: string;
      price: string;
      score: string;
    }>
  >;
}) {
  return (
    <div className="mt-8 rounded-[20px] border border-white/8 bg-card/78 p-4 shadow-[0_12px_28px_rgba(0,0,0,0.16)]">
      <div className="text-center text-[13px] text-white/48">
        没有找到？试试这里
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Select
          value={finderFilters.category}
          onValueChange={(value) =>
            setFinderFilters((current) => ({ ...current, category: value }))
          }
        >
          <SelectTrigger className="h-11 rounded-xl border-white/8 bg-white/[0.04] px-3 text-[14px] text-white/84">
            <SelectValue placeholder="标签分类" />
          </SelectTrigger>
          <SelectContent className="border-white/8 bg-card text-foreground">
            {['标签分类', '都市', '玄幻', '言情', '历史'].map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={finderFilters.status}
          onValueChange={(value) =>
            setFinderFilters((current) => ({ ...current, status: value }))
          }
        >
          <SelectTrigger className="h-11 rounded-xl border-white/8 bg-white/[0.04] px-3 text-[14px] text-white/84">
            <SelectValue placeholder="连载" />
          </SelectTrigger>
          <SelectContent className="border-white/8 bg-card text-foreground">
            {['连载', '完本'].map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={finderFilters.price}
          onValueChange={(value) =>
            setFinderFilters((current) => ({ ...current, price: value }))
          }
        >
          <SelectTrigger className="h-11 rounded-xl border-white/8 bg-white/[0.04] px-3 text-[14px] text-white/84">
            <SelectValue placeholder="免费" />
          </SelectTrigger>
          <SelectContent className="border-white/8 bg-card text-foreground">
            {['免费', 'VIP', '金币', '等级'].map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={finderFilters.score}
          onValueChange={(value) =>
            setFinderFilters((current) => ({ ...current, score: value }))
          }
        >
          <SelectTrigger className="h-11 rounded-xl border-white/8 bg-white/[0.04] px-3 text-[14px] text-white/84">
            <SelectValue placeholder="9.5分以上" />
          </SelectTrigger>
          <SelectContent className="border-white/8 bg-card text-foreground">
            {['9.5分以上', '9.0分以上', '8.5分以上'].map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <button className="mt-4 h-11 w-full rounded-[14px] bg-primary-gradient text-[16px] font-semibold text-white shadow-[0_14px_28px_rgba(97,102,240,0.28)]">
        按条件找书
      </button>
    </div>
  );
}

export function NovelDetailPage({
  novel,
  onBack,
  onOpenChapter,
  onStartReading,
}: NovelDetailPageProps) {
  const [activeTab, setActiveTab] = useState<DetailTab>('intro');
  const [introExpanded, setIntroExpanded] = useState(false);
  const [isHeaderSolid, setIsHeaderSolid] = useState(false);
  const [finderFilters, setFinderFilters] = useState({
    category: '标签分类',
    status: '连载',
    price: '免费',
    score: '9.5分以上',
  });
  const author = novel.author ?? '沙拉薯条';

  const chapterPreview = useMemo(
    () => [
      {
        title: `第${novel.chapterCount - 2}章 风雪尽头的回声`,
        badge: 'vip' as const,
        updatedAt: novel.updatedAt,
        content: [
          '容桥抵达国机场时，已经晚上九点多了。',
          '今天是她生日。',
          '她打开手机时，收到了一堆生日祝福。',
          '都是同事和朋友发过来的，封庭深这边却一点消息都没有。',
          '容桥笑容淡了下来，夜色里只剩下机场广播声和她的脚步声。',
        ],
      },
      {
        title: `第${novel.chapterCount - 1}章 灯塔之外的真相`,
        badge: 'level' as const,
        updatedAt: novel.updatedAt,
        content: [
          '风从海面吹来，带着一点湿冷的盐味。',
          '她站在灯塔的阴影下，终于意识到所有线索其实从一开始就指向同一个人。',
          '那些被她忽略掉的细枝末节，此刻正一点点拼回完整的真相。',
          '而真相之外，更让她难以面对的，是那个人始终没有说出口的答案。',
        ],
      },
      {
        title: `第${novel.chapterCount}章 你听见海面之下了吗`,
        badge: 'coin' as const,
        updatedAt: novel.updatedAt,
        content: [
          '海潮一层层涌上来，像是在吞没所有迟疑。',
          '她抬起头，看见远处灯火映在水面，破碎得像一场尚未结束的梦。',
          '如果答案真的藏在海面之下，那她也只能继续往前。',
          '因为这一次，她已经没有退路。',
        ],
      },
    ],
    [novel.chapterCount, novel.updatedAt],
  );

  const guessYouLike = useMemo(
    () => [
      {
        id: 1,
        title: `${novel.tags[0] ?? '都市'}秘闻录`,
        author: '北岸星河',
        desc: '风格接近当前阅读，节奏明快，反转和情绪推进都很顺。',
        score: 9.4,
        reads: '12.6万',
        tag: novel.tags[0] ?? '都市',
        status: '连载中',
        cover: novel.cover,
      },
      {
        id: 2,
        title: '月港来信',
        author: '未迟',
        desc: '偏治愈向的都市故事，人物关系克制但很有后劲。',
        score: 9.2,
        reads: '8.9万',
        tag: novel.tags[1] ?? '言情',
        status: '完本',
        cover:
          'https://images.unsplash.com/photo-1495640388908-05fa85288e61?auto=format&fit=crop&w=500&q=80',
      },
      {
        id: 3,
        title: '深夜书局',
        author: '回声',
        desc: '设定干净，氛围感足，适合喜欢沉浸式阅读的读者。',
        score: 9.1,
        reads: '7.4万',
        tag: novel.tags[2] ?? '悬疑',
        status: '连载中',
        cover:
          'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=500&q=80',
      },
      {
        id: 4,
        title: '半城风雪',
        author: '阿照',
        desc: '剧情推进很稳，情绪层层递进，读起来会比较上头。',
        score: 9.3,
        reads: '10.2万',
        tag: novel.tags[0] ?? '都市',
        status: '连载中',
        cover:
          'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=500&q=80',
      },
    ],
    [novel.cover, novel.tags],
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderSolid(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_top,rgba(98,96,242,0.28),rgba(61,72,176,0.12)_26%,rgba(11,12,24,0.96)_56%,rgba(8,9,15,1)_100%)]" />
      <div className="fixed inset-0 z-0 opacity-70 bg-[radial-gradient(circle_at_20%_12%,rgba(255,255,255,0.1),transparent_22%),radial-gradient(circle_at_80%_28%,rgba(104,98,255,0.14),transparent_20%),radial-gradient(circle_at_15%_80%,rgba(76,97,255,0.08),transparent_22%)]" />

      <header
        className={`fixed left-1/2 top-0 z-[80] w-full max-w-[430px] -translate-x-1/2 transition-all duration-300 ${
          isHeaderSolid
            ? 'border-b border-white/8 bg-[#0b0d17]/88 shadow-[0_10px_28px_rgba(0,0,0,0.28)] backdrop-blur-2xl'
            : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-4 pb-3 pt-4">
          <button
            onClick={onBack}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/84 transition-all backdrop-blur-md active:scale-95"
            aria-label="返回"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/84 transition-all backdrop-blur-md active:scale-95"
              aria-label="搜索"
            >
              <Search className="h-4.5 w-4.5" />
            </button>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/84 transition-all backdrop-blur-md active:scale-95"
              aria-label="分享"
            >
              <Share2 className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 pb-28 pt-[76px]">
        <section className="px-5 pb-6 pt-8">
          <div className="mx-auto flex max-w-[320px] flex-col items-center">
            <div className="relative overflow-hidden rounded-[18px] border border-white/10 bg-card shadow-[0_22px_42px_rgba(0,0,0,0.28)]">
              <img
                src={novel.cover}
                alt={novel.title}
                className="h-[168px] w-[120px] object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(18,20,44,0.12)_68%,rgba(10,11,18,0.32)_100%)]" />
            </div>

            <h1 className="mt-6 text-center text-[18px] font-semibold tracking-[0.01em] text-white">
              {novel.title}
            </h1>

            <div className="mt-3 text-[13px] text-white/56">
              {author} · {novel.status}
            </div>

            <div className="mt-6 grid w-full grid-cols-3 gap-3">
              <div className="text-center">
                <div className="text-[16px] font-semibold text-white">{novel.reads}</div>
                <div className="mt-1 text-[11px] text-white/52">阅读量</div>
              </div>
              <div className="text-center">
                <div className="text-[16px] font-semibold text-white">{novel.favorites}</div>
                <div className="mt-1 text-[11px] text-white/52">收藏量</div>
              </div>
              <div className="text-center">
                <div className="text-[16px] font-semibold text-white">{novel.words}</div>
                <div className="mt-1 text-[11px] text-white/52">字数</div>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              {novel.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex rounded-md bg-primary-gradient-soft px-1.5 py-0.5 text-[11px] text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-5 w-full rounded-[18px] border border-white/8 bg-card/78 px-4 py-3 text-[12px] text-white/58">
              <div className="flex items-start gap-2">
                <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                <div className="min-w-0">
                  <div className="truncate text-white/84">{novel.latestChapter}</div>
                  <div className="mt-1 text-[11px] text-white/52">{novel.updatedAt}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5">
          <div className="flex items-center gap-8 border-b border-white/8">
            <button
              onClick={() => setActiveTab('intro')}
              className={`relative pb-4 text-[16px] transition-colors ${
                activeTab === 'intro' ? 'font-semibold text-white' : 'text-white/52'
              }`}
            >
              作品介绍
              {activeTab === 'intro' ? (
                <span className="absolute bottom-0 left-0 h-[3px] w-12 rounded-full bg-primary" />
              ) : null}
            </button>
            <button
              onClick={() => setActiveTab('chapters')}
              className={`relative pb-4 text-[16px] transition-colors ${
                activeTab === 'chapters' ? 'font-semibold text-white' : 'text-white/52'
              }`}
            >
              作品目录 {formatChapterCount(novel.chapterCount)}
              {activeTab === 'chapters' ? (
                <span className="absolute bottom-0 left-0 h-[3px] w-12 rounded-full bg-primary" />
              ) : null}
            </button>
          </div>

          {activeTab === 'intro' ? (
            <div className="pt-6">
              <h2 className="text-[16px] font-semibold text-white">简介</h2>
              <div className="mt-4">
                <p
                  className={`text-[15px] leading-8 text-white/72 ${
                    introExpanded ? '' : 'line-clamp-4'
                  }`.trim()}
                >
                  {novel.intro}
                </p>
                <button
                  onClick={() => setIntroExpanded((current) => !current)}
                  className="mt-2 text-[14px] text-white/44"
                >
                  {introExpanded ? '收起' : '更多'}
                </button>
              </div>

              <div className="mx-auto mt-5 h-[90px] max-w-[343px] overflow-hidden rounded-[10px] border border-white/8 bg-card/72 shadow-[0_12px_24px_rgba(0,0,0,0.16)]">
                <img
                  src={promoBanner}
                  alt="广告"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="mt-8">
                <div className="mb-3">
                  <h3 className="text-base font-medium text-white">猜你喜欢</h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {guessYouLike.map((item) => (
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
                        <p className="mt-1 text-xs text-muted-foreground">{item.author}</p>
                        <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-muted-foreground">
                          {item.desc}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <AdaptationBanner />
              <FinderPanel finderFilters={finderFilters} setFinderFilters={setFinderFilters} />

            </div>
          ) : (
            <div className="pt-6">
              <div className="space-y-3">
                {chapterPreview.map((chapter) => (
                  <button
                    key={chapter.title}
                    onClick={() => onOpenChapter?.(chapter)}
                    className="flex w-full items-center justify-between rounded-[18px] border border-white/8 bg-card/72 px-4 py-4 text-left shadow-[0_10px_22px_rgba(0,0,0,0.16)] transition-all active:scale-[0.99]"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="text-[15px] text-white/88">{chapter.title}</div>
                      </div>
                    </div>
                    <List className="h-4.5 w-4.5 text-white/48" />
                  </button>
                ))}
              </div>

              <AdaptationBanner />
              <FinderPanel finderFilters={finderFilters} setFinderFilters={setFinderFilters} />
            </div>
          )}
        </section>
      </main>

      <footer className="fixed bottom-0 left-1/2 z-[80] flex w-full max-w-[430px] -translate-x-1/2 gap-3 border-t border-white/8 bg-background/86 px-4 pb-[calc(env(safe-area-inset-bottom)+14px)] pt-3 backdrop-blur-xl">
        <button className="h-11 flex-1 rounded-[18px] border border-white/10 bg-white/[0.04] text-[15px] font-medium text-white/84 shadow-[0_10px_18px_rgba(0,0,0,0.12)]">
          加入书架
        </button>
        <button
          onClick={onStartReading}
          className="h-11 flex-[1.4] rounded-[18px] bg-primary-gradient text-[15px] font-semibold text-white shadow-[0_12px_26px_rgba(97,102,240,0.28)]"
        >
          立即阅读
        </button>
      </footer>
    </div>
  );
}
