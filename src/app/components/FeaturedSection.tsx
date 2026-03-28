import { useEffect, useRef, useState } from 'react';
import { BookOpen, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=420&q=80',
    title: '雾港回响',
    desc: '失踪案与旧灯塔同时苏醒，她在潮汐与谎言之间追查真相。',
    btn: '立即阅读',
    accent: '#8b72ff',
    background:
      'linear-gradient(135deg, rgba(31,19,88,0.96) 0%, rgba(16,16,38,0.96) 52%, rgba(8,11,24,0.98) 100%)',
  },
  {
    id: 2,
    cover: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?auto=format&fit=crop&w=420&q=80',
    title: '长夜列车',
    desc: '午夜终点站后，多出的一节车厢里，藏着所有乘客不愿提起的秘密。',
    btn: '开始阅读',
    accent: '#ff8f66',
    background:
      'linear-gradient(135deg, rgba(60,21,24,0.96) 0%, rgba(26,19,39,0.96) 48%, rgba(9,12,24,0.98) 100%)',
  },
  {
    id: 3,
    cover: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=420&q=80',
    title: '月海书局',
    desc: '每一本被翻开的旧书，都会把读者带往另一段尚未完成的人生。',
    btn: '去阅读',
    accent: '#49d8b8',
    background:
      'linear-gradient(135deg, rgba(7,52,67,0.95) 0%, rgba(14,26,45,0.97) 52%, rgba(8,12,23,0.99) 100%)',
  },
];

export function FeaturedSection() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartX = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent(index);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const next = () => goTo((current + 1) % slides.length);
  const prev = () => goTo((current - 1 + slides.length) % slides.length);

  useEffect(() => {
    timerRef.current = setInterval(next, 4000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [current]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
  };

  const slide = slides[current];

  return (
    <div className="px-4 pt-4">
      <div
        className="relative overflow-hidden rounded-[10px] border border-white/6 shadow-2xl shadow-primary/15 select-none"
        style={{ height: 184 }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((s, i) => (
          <div
            key={s.id}
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              opacity: i === current ? 1 : 0,
              pointerEvents: i === current ? 'auto' : 'none',
              background: s.background,
            }}
          >
            <div
              className="absolute -left-10 top-5 h-32 w-32 rounded-full blur-3xl"
              style={{ backgroundColor: `${s.accent}45` }}
            />
            <div
              className="absolute left-28 bottom-0 h-24 w-24 rounded-full blur-3xl"
              style={{ backgroundColor: `${s.accent}22` }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_25%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_28%)]" />

            <div className="relative flex h-full items-center gap-3 px-3 py-3">
              <div className="min-w-0 flex-1">
                <div className="mt-1">
                  <h2 className="text-[24px] font-semibold leading-none tracking-tight text-white">
                    {s.title}
                  </h2>
                  <p className="mt-2.5 max-w-[180px] text-[11px] leading-4.5 text-white/68">
                    {s.desc}
                  </p>
                </div>

                <button
                  className="mt-3.5 inline-flex h-11 items-center gap-1.5 rounded-full px-4 text-[13px] font-medium text-[#111322] shadow-lg transition-all hover:scale-[1.02] active:scale-95"
                  style={{ backgroundColor: '#f8f7fb' }}
                >
                  <BookOpen className="h-4 w-4" />
                  {s.btn}
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <div className="relative flex w-[104px] shrink-0 justify-end">
                <div
                  className="absolute -inset-1 rounded-[26px] blur-2xl"
                  style={{ backgroundColor: `${s.accent}40` }}
                />
                <div className="relative overflow-hidden rounded-[10px] border border-white/15 bg-white/8 p-1.5 shadow-[0_18px_36px_rgba(0,0,0,0.32)] backdrop-blur-sm">
                  <img
                    src={s.cover}
                    alt={`${s.title} 小说封面`}
                    className="h-[148px] w-[96px] rounded-[10px] object-cover"
                  />
                  <div className="pointer-events-none absolute inset-1.5 rounded-[10px] bg-[linear-gradient(180deg,rgba(255,255,255,0.18),transparent_28%,transparent_72%,rgba(0,0,0,0.2))]" />
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="absolute top-4 right-4 flex items-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current ? 'h-1.5 w-4 bg-white' : 'h-1.5 w-1.5 bg-white/45'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
