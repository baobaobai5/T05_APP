import { useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  MessageCircleMore,
  Moon,
  Search,
  Settings2,
  Share2,
  SquareLibrary,
} from 'lucide-react';
import { Slider } from './ui/slider';

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

function badgeLabel(badge?: ReaderChapterData['badge']) {
  if (badge === 'vip') return 'VIP章节';
  if (badge === 'level') return '等级章节';
  if (badge === 'coin') return '金币章节';
  return '正文';
}

export function ReadingPage({ novel, chapter, onBack }: ReadingPageProps) {
  const [progress, setProgress] = useState([18]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_top,rgba(88,96,210,0.14),rgba(20,22,36,0.08)_24%,rgba(8,9,15,0.98)_58%,rgba(7,8,14,1)_100%)]" />

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

          <article className="mt-10 space-y-6 text-[16px] leading-9 text-white/78">
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
          <button className="flex flex-col items-center gap-2 py-1 text-white/72 transition-colors active:scale-95">
            <SquareLibrary className="h-5 w-5" />
            <span className="text-[13px]">目录</span>
          </button>
          <button className="flex flex-col items-center gap-2 py-1 text-white/72 transition-colors active:scale-95">
            <MessageCircleMore className="h-5 w-5" />
            <span className="text-[13px]">讨论</span>
          </button>
          <button className="flex flex-col items-center gap-2 py-1 text-white/72 transition-colors active:scale-95">
            <Moon className="h-5 w-5" />
            <span className="text-[13px]">夜间</span>
          </button>
          <button className="flex flex-col items-center gap-2 py-1 text-white/72 transition-colors active:scale-95">
            <Settings2 className="h-5 w-5" />
            <span className="text-[13px]">阅读设置</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
