import { useState } from 'react';
import {
  ArrowLeft,
  BookMarked,
  BookOpen,
  Check,
  ChevronRight,
  LibraryBig,
  Search,
  Settings2,
  Share2,
  SquareLibrary,
  X,
} from 'lucide-react';
import vipBadge from '../../assets/vip-badge.svg';
import coinBadge from '../../assets/coin-badge.svg';
import levelBadge from '../../assets/level-badge.svg';
import { Slider } from './ui/slider';
import { Sheet, SheetClose, SheetContent, SheetTitle } from './ui/sheet';

export interface ReaderChapterData {
  title: string;
  updatedAt: string;
  badge?: 'vip' | 'level' | 'coin';
  content: string[];
}

interface ReadingPageProps {
  novel: {
    title: string;
    author?: string;
    cover: string;
  };
  chapter: ReaderChapterData;
  onBack: () => void;
}

interface ReadingTheme {
  id: string;
  name: string;
  swatch: string;
  background: string;
}

function badgeLabel(badge?: ReaderChapterData['badge']) {
  if (badge === 'vip') return 'VIP章节';
  if (badge === 'level') return '等级章节';
  if (badge === 'coin') return '金币章节';
  return '正文';
}

function buildChapterCatalog(chapter: ReaderChapterData) {
  const matchedIndex = chapter.title.match(/第(\d+)章/);
  const currentIndex = matchedIndex ? Number(matchedIndex[1]) : 1;
  const suffix = chapter.title.replace(/^第\d+章\s*/, '') || '正文';

  return Array.from({ length: 12 }, (_, index) => {
    const chapterNumber = Math.max(1, currentIndex - 5 + index);
    const offset = chapterNumber - currentIndex;
    const title =
      offset === 0
        ? chapter.title
        : `第${chapterNumber}章 ${suffix}${offset > 0 ? `（续${offset}）` : `（前篇${Math.abs(offset)}）`}`;

    return {
      id: `${chapterNumber}-${index}`,
      title,
      active: chapterNumber === currentIndex,
      badge:
        chapterNumber % 3 === 1
          ? 'vip'
          : chapterNumber % 3 === 2
            ? 'level'
            : 'coin',
    };
  });
}

const readingThemes: ReadingTheme[] = [
  {
    id: 'default',
    name: '默认',
    swatch: '#1b1f31',
    background:
      'radial-gradient(circle at top, rgba(88,96,210,0.14), rgba(20,22,36,0.08) 24%, rgba(8,9,15,0.98) 58%, rgba(7,8,14,1) 100%)',
  },
  {
    id: 'navy',
    name: '深海',
    swatch: '#24324d',
    background:
      'radial-gradient(circle at top, rgba(92,132,214,0.18), rgba(24,33,54,0.24) 28%, rgba(10,13,22,0.98) 60%, rgba(8,10,18,1) 100%)',
  },
  {
    id: 'sand',
    name: '暖砂',
    swatch: '#6e6341',
    background:
      'radial-gradient(circle at top, rgba(204,176,90,0.18), rgba(49,42,25,0.22) 28%, rgba(14,12,10,0.98) 60%, rgba(10,9,8,1) 100%)',
  },
  {
    id: 'sage',
    name: '松雾',
    swatch: '#485f4a',
    background:
      'radial-gradient(circle at top, rgba(132,184,128,0.18), rgba(27,39,28,0.24) 28%, rgba(9,14,11,0.98) 60%, rgba(8,10,9,1) 100%)',
  },
  {
    id: 'plum',
    name: '暗莓',
    swatch: '#5e4558',
    background:
      'radial-gradient(circle at top, rgba(180,126,174,0.18), rgba(35,22,33,0.26) 28%, rgba(10,9,15,0.98) 60%, rgba(8,8,11,1) 100%)',
  },
  {
    id: 'black',
    name: '极夜',
    swatch: '#141414',
    background:
      'radial-gradient(circle at top, rgba(255,255,255,0.05), rgba(18,18,18,0.3) 22%, rgba(8,8,8,0.98) 58%, rgba(5,5,5,1) 100%)',
  },
];

export function ReadingPage({ novel, chapter, onBack }: ReadingPageProps) {
  const [progress, setProgress] = useState([18]);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [themeId, setThemeId] = useState<ReadingTheme['id']>('default');
  const catalogItems = buildChapterCatalog(chapter);
  const activeTheme =
    readingThemes.find((theme) => theme.id === themeId) ?? readingThemes[0];

  const resetReadingSettings = () => {
    setFontSize(16);
    setThemeId('default');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="fixed inset-0 z-0" style={{ background: activeTheme.background }} />

      <header className="fixed left-1/2 top-0 z-[90] w-full max-w-[430px] -translate-x-1/2 border-b border-white/8 bg-[#0b0d17]/88 backdrop-blur-2xl">
        <div className="flex items-center justify-between px-4 pb-3 pt-4">
          <button
            onClick={onBack}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/84 transition-all active:scale-95"
            aria-label="返回"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/84 transition-all active:scale-95"
              aria-label="搜索"
            >
              <Search className="h-4.5 w-4.5" />
            </button>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/84 transition-all active:scale-95"
              aria-label="分享"
            >
              <Share2 className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 px-5 pb-44 pt-[88px]">
        <section className="px-5 py-7">
          <div className="flex flex-col items-center">
            <div className="overflow-hidden rounded-[12px] border border-white/10 bg-card shadow-[0_16px_30px_rgba(0,0,0,0.22)]">
              <img
                src={novel.cover}
                alt={novel.title}
                className="h-[168px] w-[108px] object-cover"
              />
            </div>

            <div className="mt-5 max-w-[280px] text-center">
              <h1 className="line-clamp-1 text-[18px] font-semibold text-white">
                {novel.title}
              </h1>
              <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-primary-gradient px-2.5 py-1 text-[11px] font-medium text-white">
                <BookOpen className="h-3.5 w-3.5" />
                {badgeLabel(chapter.badge)}
              </div>
              <p className="mt-2 text-[12px] text-white/48">作者：{novel.author ?? '未知作者'}</p>
            </div>
          </div>

          <div className="mt-9 text-center">
            <h2 className="text-[17px] font-semibold text-white">{chapter.title}</h2>
            <div className="mt-3 text-[11px] leading-6 text-white/40">
              <span>书名：{novel.title}</span>
              <span className="mx-2">·</span>
              <span>作者：{novel.author ?? '未知作者'}</span>
              <span className="mx-2">·</span>
              <span>字数约：2286</span>
            </div>
            <div className="mt-1 text-[11px] text-white/34">更新时间：{chapter.updatedAt}</div>
          </div>

          <article
            className="mt-10 space-y-6 text-white/78"
            style={{ fontSize: `${fontSize}px`, lineHeight: `${Math.round(fontSize * 2.15)}px` }}
          >
            {chapter.content.map((paragraph, index) => (
              <p key={`${chapter.title}-${index}`}>{paragraph}</p>
            ))}
          </article>
        </section>
      </main>

      <footer className="fixed bottom-0 left-1/2 z-[90] w-full max-w-[430px] -translate-x-1/2 border-t border-white/8 bg-[#0b0d17]/92 px-4 pb-[calc(env(safe-area-inset-bottom)+18px)] pt-4 backdrop-blur-2xl">
        <div className="flex items-center gap-3 text-[15px] text-white/68">
          <button className="shrink-0 transition-colors active:scale-95">上一章</button>
          <Slider
            value={progress}
            onValueChange={setProgress}
            max={100}
            step={1}
            className="flex-1"
          />
          <button className="shrink-0 transition-colors active:scale-95">下一章</button>
        </div>

        <div className="mt-5 grid grid-cols-4 gap-2">
          <button
            onClick={() => setIsCatalogOpen(true)}
            className="flex flex-col items-center gap-2 py-1 text-white/72 transition-colors active:scale-95"
          >
            <SquareLibrary className="h-5 w-5" />
            <span className="text-[13px]">目录</span>
          </button>
          <button className="flex flex-col items-center gap-2 py-1 text-white/72 transition-colors active:scale-95">
            <BookMarked className="h-5 w-5" />
            <span className="text-[13px]">加入书架</span>
          </button>
          <button className="flex flex-col items-center gap-2 py-1 text-white/72 transition-colors active:scale-95">
            <LibraryBig className="h-5 w-5" />
            <span className="text-[13px]">我的书架</span>
          </button>
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="flex flex-col items-center gap-2 py-1 text-white/72 transition-colors active:scale-95"
          >
            <Settings2 className="h-5 w-5" />
            <span className="text-[13px]">阅读设置</span>
          </button>
        </div>
      </footer>

      <Sheet open={isCatalogOpen} onOpenChange={setIsCatalogOpen}>
        <SheetContent
          side="bottom"
          className="inset-x-auto left-1/2 h-[72vh] w-full max-w-[430px] -translate-x-1/2 rounded-t-[28px] border border-white/8 bg-card/98 px-0 pb-0 pt-0 text-white shadow-[0_-18px_50px_rgba(0,0,0,0.38)] backdrop-blur-2xl [&>button[data-slot=sheet-close]]:hidden"
        >
          <SheetClose asChild>
            <button
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-foreground/68 transition-colors active:scale-95"
              aria-label="关闭目录"
            >
              <X className="h-4 w-4" />
            </button>
          </SheetClose>

          <div className="px-4 pt-2.5">
            <div className="mx-auto h-1.5 w-12 rounded-full bg-white/12" />
          </div>

          <div className="border-b border-white/8 px-4 pb-3.5 pt-3">
            <div className="flex items-center justify-between">
              <div>
                <SheetTitle className="text-left text-[17px] text-foreground/96">
                  目录
                </SheetTitle>
                <p className="mt-0.5 text-[13px] text-muted-foreground">{novel.title}</p>
              </div>
              <div className="rounded-full border border-white/10 bg-white/6 px-2.5 py-0.5 text-[12px] text-foreground/68">
                共 {catalogItems.length} 章
              </div>
            </div>
          </div>

          <div className="h-[calc(72vh-78px)] overflow-y-auto px-4 pb-6 pt-3">
            <div className="space-y-3">
              {catalogItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setIsCatalogOpen(false)}
                  className={`flex w-full items-center justify-between rounded-[18px] border px-4 py-4 text-left transition-all active:scale-[0.99] ${
                    item.active
                      ? 'border-primary/28 bg-primary/10 shadow-[0_12px_28px_rgba(97,102,240,0.14)]'
                      : 'border-white/8 bg-white/[0.04]'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <div
                        className={`line-clamp-1 text-[15px] font-medium ${
                          item.active ? 'text-foreground/96' : 'text-foreground/84'
                        }`}
                      >
                        {item.title}
                      </div>
                      <img
                        src={
                          item.badge === 'vip'
                            ? vipBadge
                            : item.badge === 'level'
                              ? levelBadge
                              : coinBadge
                        }
                        alt={
                          item.badge === 'vip'
                            ? 'VIP'
                            : item.badge === 'level'
                              ? '等级'
                              : '金币'
                        }
                        className="h-5 w-auto shrink-0 object-contain"
                      />
                    </div>
                    <div className="mt-1 text-[12px] text-muted-foreground/80">
                      {item.active ? '当前阅读章节' : '点击跳转本章'}
                    </div>
                  </div>
                  <ChevronRight
                    className={`ml-4 h-4 w-4 shrink-0 ${
                      item.active ? 'text-primary-light' : 'text-muted-foreground/60'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <SheetContent
          side="bottom"
          className="inset-x-auto left-1/2 w-full max-w-[430px] -translate-x-1/2 rounded-t-[28px] border border-white/8 bg-card/98 px-0 pb-0 pt-0 text-white shadow-[0_-18px_50px_rgba(0,0,0,0.38)] backdrop-blur-2xl [&>button[data-slot=sheet-close]]:hidden"
        >
          <SheetClose asChild>
            <button
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-foreground/68 transition-colors active:scale-95"
              aria-label="关闭阅读设置"
            >
              <X className="h-4 w-4" />
            </button>
          </SheetClose>

          <div className="px-4 pt-2.5">
            <div className="mx-auto h-1.5 w-12 rounded-full bg-white/12" />
          </div>

          <div className="border-b border-white/8 px-4 pb-3.5 pt-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <SheetTitle className="text-left text-[17px] text-foreground/96">
                  阅读设置
                </SheetTitle>
                <p className="mt-0.5 text-[13px] text-muted-foreground">调节背景与字体大小</p>
              </div>
              <button
                onClick={resetReadingSettings}
                className="rounded-full bg-primary-gradient px-4 py-2 text-[13px] font-medium text-white shadow-[0_10px_22px_rgba(97,102,240,0.24)] transition-transform active:scale-95"
              >
                恢复默认
              </button>
            </div>
          </div>

          <div className="space-y-6 px-4 pb-[calc(env(safe-area-inset-bottom)+18px)] pt-5">
            <div>
              <div className="text-[14px] font-medium text-foreground/90">阅读背景</div>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                {readingThemes.map((theme) => {
                  const selected = theme.id === themeId;
                  return (
                    <button
                      key={theme.id}
                      onClick={() => setThemeId(theme.id)}
                      className={`flex h-12 w-12 items-center justify-center rounded-full border transition-all active:scale-95 ${
                        selected ? 'border-white/36 shadow-[0_10px_22px_rgba(0,0,0,0.18)]' : 'border-white/10'
                      }`}
                      style={{ background: theme.swatch }}
                      aria-label={theme.name}
                    >
                      {selected ? <Check className="h-5 w-5 text-white" strokeWidth={3} /> : null}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="text-[14px] font-medium text-foreground/90">字体大小</div>
              <div className="mt-4 flex overflow-hidden rounded-[18px] border border-white/8 bg-white/[0.04]">
                <button
                  onClick={() => setFontSize((value) => Math.max(14, value - 1))}
                  className="flex h-12 flex-1 items-center justify-center text-[17px] font-medium text-foreground/88 transition-colors active:bg-white/8"
                >
                  A-
                </button>
                <div className="flex h-12 w-[106px] items-center justify-center border-x border-white/8 text-[20px] font-semibold text-white">
                  {fontSize}
                </div>
                <button
                  onClick={() => setFontSize((value) => Math.min(24, value + 1))}
                  className="flex h-12 flex-1 items-center justify-center text-[17px] font-medium text-foreground/88 transition-colors active:bg-white/8"
                >
                  A+
                </button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
