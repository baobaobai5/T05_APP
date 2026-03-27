import { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  AppWindow,
  BookCheck,
  BookOpen,
  CircleCheckBig,
  Crown,
  Flame,
  Grid2x2,
  Sparkles,
} from 'lucide-react';

interface CategoryItem {
  id: number;
  name: string;
  icon: LucideIcon;
  tint: string;
  glow: string;
}

interface CategoryTabsProps {
  onOpenCategoryPage?: (page: 'category' | 'allWorks' | 'finished' | 'free' | 'vip') => void;
}

const categories: CategoryItem[] = [
  { id: 1, name: '作品分类', icon: Grid2x2, tint: '#4D8DFF', glow: 'rgba(77, 141, 255, 0.32)' },
  { id: 2, name: '全部作品', icon: BookOpen, tint: '#9A6DFF', glow: 'rgba(154, 109, 255, 0.3)' },
  { id: 3, name: '排行榜', icon: Flame, tint: '#FF8A3D', glow: 'rgba(255, 138, 61, 0.3)' },
  { id: 4, name: '完本小说', icon: CircleCheckBig, tint: '#43D48A', glow: 'rgba(67, 212, 138, 0.28)' },
  { id: 5, name: '免费小说', icon: BookCheck, tint: '#F0B232', glow: 'rgba(240, 178, 50, 0.28)' },
  { id: 6, name: 'VIP专区', icon: Crown, tint: '#F6A523', glow: 'rgba(246, 165, 35, 0.28)' },
  { id: 7, name: 'AI创作', icon: Sparkles, tint: '#7A86FF', glow: 'rgba(122, 134, 255, 0.28)' },
  { id: 8, name: '客户端', icon: AppWindow, tint: '#8D96A8', glow: 'rgba(141, 150, 168, 0.24)' },
];

export function CategoryTabs({ onOpenCategoryPage }: CategoryTabsProps) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="px-4 py-3">
      <div className="grid grid-cols-4 gap-x-3 gap-y-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = active === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => {
                if (cat.id === 1) {
                  setActive(cat.id);
                  onOpenCategoryPage?.('category');
                  return;
                }

                if (cat.id === 2) {
                  setActive(cat.id);
                  onOpenCategoryPage?.('allWorks');
                  return;
                }

                if (cat.id === 4) {
                  setActive(cat.id);
                  onOpenCategoryPage?.('finished');
                  return;
                }

                if (cat.id === 5) {
                  setActive(cat.id);
                  onOpenCategoryPage?.('free');
                  return;
                }

                if (cat.id === 6) {
                  setActive(cat.id);
                  onOpenCategoryPage?.('vip');
                  return;
                }

                setActive(isActive ? null : cat.id);
              }}
              className="group flex flex-col items-center gap-2 active:scale-95 transition-transform"
            >
              <div
                className={`relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-[18px] border border-white/10 backdrop-blur-xl transition-all duration-300 ${
                  isActive ? 'scale-105 border-white/18 shadow-lg' : 'shadow-md'
                }`}
                style={{
                  background: `linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.06) 100%), linear-gradient(135deg, ${cat.glow} 0%, rgba(13, 14, 30, 0.12) 100%)`,
                  boxShadow: isActive
                    ? `0 12px 24px ${cat.glow}, inset 0 1px 0 rgba(255,255,255,0.22)`
                    : `0 8px 18px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.16)`,
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

              <span
                className="text-[11px] leading-tight text-center transition-colors duration-300"
                style={{ color: isActive ? '#ffffff' : 'rgba(255,255,255,0.92)' }}
              >
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
