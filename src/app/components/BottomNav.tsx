import { useState } from 'react';
import { Grid2x2, History, Search, Library, WalletCards } from 'lucide-react';

const navItems = [
  { id: 'menu', icon: Grid2x2, label: '菜单' },
  { id: 'history', icon: History, label: '看过' },
  { id: 'search', icon: Search, label: '搜索', isCenter: true },
  { id: 'shelf', icon: Library, label: '书架' },
  { id: 'wallet', icon: WalletCards, label: '充值' },
];

interface BottomNavProps {
  onOpenSearch?: () => void;
  onSelectPage?: (page: 'home' | 'history' | 'shelf' | 'wallet') => void;
  activePage?: 'home' | 'history' | 'shelf' | 'wallet';
}

export function BottomNav({ onOpenSearch, onSelectPage, activePage = 'home' }: BottomNavProps) {
  const [active, setActive] = useState(
    activePage === 'history'
      ? 'history'
      : activePage === 'shelf'
        ? 'shelf'
        : activePage === 'wallet'
          ? 'wallet'
          : 'menu',
  );
  const currentActive =
    activePage === 'history' || activePage === 'shelf' || activePage === 'wallet'
      ? activePage
      : active;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 max-w-[430px] mx-auto">
      <div className="border-t border-white/6 bg-background/96 px-2 pt-1.5 pb-safe backdrop-blur-2xl">
        <div className="flex items-end justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentActive === item.id;

            if (item.isCenter) {
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActive(item.id);
                    onOpenSearch?.();
                  }}
                  className="flex flex-col items-center gap-1 px-3 py-0 -mt-6"
                  aria-label={item.label}
                >
                  <div className="bg-primary-gradient shadow-primary-glow flex h-13 w-13 items-center justify-center rounded-full border-4 border-background transition-all hover:scale-105 active:scale-95">
                    <Search className="h-6 w-6 text-white" strokeWidth={2.4} />
                  </div>
                  <span className="text-[10px] text-transparent">搜索</span>
                </button>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActive(item.id);
                  if (item.id === 'menu') onSelectPage?.('home');
                  if (item.id === 'history') onSelectPage?.('history');
                  if (item.id === 'shelf') onSelectPage?.('shelf');
                  if (item.id === 'wallet') onSelectPage?.('wallet');
                }}
                className="relative flex min-w-[62px] flex-col items-center gap-1 px-2 py-1.5"
              >
                <div className="relative flex h-6 items-center justify-center">
                  <Icon
                    className={`h-[21px] w-[21px] transition-all ${
                      isActive ? 'text-primary' : 'text-muted-foreground/85'
                    }`}
                    strokeWidth={isActive ? 2.35 : 1.9}
                  />
                </div>
                <span
                  className={`text-[11px] leading-none transition-all ${
                    isActive ? 'text-primary' : 'text-muted-foreground/85'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
