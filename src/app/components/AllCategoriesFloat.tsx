import type { LucideIcon } from 'lucide-react';
import {
  BookOpenText,
  Building2,
  Compass,
  Gamepad2,
  Heart,
  Landmark,
  LayoutGrid,
  Orbit,
  Search,
  Shield,
  Sparkles,
  Star,
  Trophy,
} from 'lucide-react';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from './ui/sheet';

interface CategoryItem {
  id: number;
  name: string;
  count: number;
  icon: LucideIcon;
  tint: string;
  glow: string;
}

const categories: CategoryItem[] = [
  { id: 1, name: '玄幻', count: 2836, icon: Sparkles, tint: '#8A7BFF', glow: 'rgba(138, 123, 255, 0.28)' },
  { id: 2, name: '武侠', count: 1542, icon: BookOpenText, tint: '#A0A8BC', glow: 'rgba(160, 168, 188, 0.22)' },
  { id: 3, name: '言情', count: 3271, icon: Star, tint: '#C4B5FF', glow: 'rgba(196, 181, 255, 0.22)' },
  { id: 4, name: '科幻', count: 986, icon: Orbit, tint: '#8B95FF', glow: 'rgba(139, 149, 255, 0.24)' },
  { id: 5, name: '都市', count: 2158, icon: Building2, tint: '#9AA6FF', glow: 'rgba(154, 166, 255, 0.22)' },
  { id: 6, name: '历史', count: 1127, icon: Landmark, tint: '#FF9D68', glow: 'rgba(255, 157, 104, 0.24)' },
  { id: 7, name: '悬疑', count: 874, icon: Search, tint: '#A4AEFF', glow: 'rgba(164, 174, 255, 0.22)' },
  { id: 8, name: '冒险', count: 1463, icon: Compass, tint: '#9B89FF', glow: 'rgba(155, 137, 255, 0.22)' },
  { id: 9, name: '仙侠', count: 1895, icon: Star, tint: '#C6B8FF', glow: 'rgba(198, 184, 255, 0.22)' },
  { id: 10, name: '游戏', count: 763, icon: Gamepad2, tint: '#7C8CFF', glow: 'rgba(124, 140, 255, 0.22)' },
  { id: 11, name: '军事', count: 1216, icon: Shield, tint: '#FFAE73', glow: 'rgba(255, 174, 115, 0.24)' },
  { id: 12, name: '竞技', count: 834, icon: Trophy, tint: '#97A7FF', glow: 'rgba(151, 167, 255, 0.22)' },
];

export function AllCategoriesFloat() {
  return (
    <div className="pointer-events-none fixed left-1/2 top-[56%] z-[65] w-full max-w-[430px] -translate-x-1/2">
      <div className="flex justify-end px-2">
        <Sheet>
          <SheetTrigger asChild>
            <button className="pointer-events-auto flex min-h-[72px] w-[76px] flex-col items-center justify-center gap-1 rounded-[18px] border border-white/10 bg-card/92 px-2 py-3 shadow-[0_12px_30px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition-all hover:border-primary/25 hover:shadow-[0_12px_32px_rgba(97,102,240,0.18)] active:scale-95">
              <div className="bg-primary-gradient-soft flex h-8 w-8 items-center justify-center rounded-full border border-white/8">
                <LayoutGrid className="h-4 w-4 text-primary" strokeWidth={2.2} />
              </div>
              <span className="whitespace-nowrap text-center text-[11px] leading-none text-foreground/92">
                全部分类
              </span>
            </button>
          </SheetTrigger>

          <SheetContent
            side="bottom"
            className="inset-x-auto left-1/2 w-full max-w-[430px] -translate-x-1/2 rounded-t-[28px] border border-white/8 bg-card/98 px-0 pt-0 pb-safe shadow-[0_-18px_50px_rgba(0,0,0,0.38)]"
          >
            <div className="px-4 pt-3">
              <div className="mx-auto h-1.5 w-12 rounded-full bg-white/12" />
            </div>

            <div className="px-4 pb-5 pt-4">
              <div className="mb-4 pr-8">
                <SheetTitle className="text-[17px] text-foreground/96">
                  全部分类
                </SheetTitle>
                <p className="mt-1 text-sm text-muted-foreground">
                  选择想看的分类入口
                </p>
              </div>

              <div className="grid grid-cols-4 gap-x-3 gap-y-4">
                {categories.map((cat) => {
                  const Icon = cat.icon;

                  return (
                    <button
                      key={cat.id}
                      className="group flex flex-col items-center gap-2 active:scale-95 transition-transform"
                    >
                      <div
                        className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-[18px] border border-white/10 backdrop-blur-xl shadow-md"
                        style={{
                          background: `linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.06) 100%), linear-gradient(135deg, ${cat.glow} 0%, rgba(13, 14, 30, 0.12) 100%)`,
                          boxShadow: `0 8px 18px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.16)`,
                        }}
                      >
                        <div className="absolute inset-x-2 top-1.5 h-4 rounded-full bg-white/18 blur-md" />
                        <div
                          className="absolute inset-0 opacity-70"
                          style={{
                            background: `radial-gradient(circle at 30% 20%, rgba(255,255,255,0.2) 0%, transparent 48%), radial-gradient(circle at 70% 75%, ${cat.glow} 0%, transparent 42%)`,
                          }}
                        />
                        <Icon
                          className="relative z-10 h-[22px] w-[22px] transition-transform duration-300 group-hover:scale-105"
                          style={{ color: cat.tint, filter: `drop-shadow(0 3px 10px ${cat.glow})` }}
                        />
                      </div>

                      <div className="text-center">
                        <div className="text-[11px] leading-tight text-foreground/92">
                          {cat.name}
                        </div>
                        <div className="mt-1 text-[11px] leading-none text-muted-foreground/72">
                          {cat.count}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
