import { Search, Download, SlidersHorizontal, Menu } from 'lucide-react';
import logo from '../../assets/logo.svg';

export function Header() {
  return (
    <header className="fixed top-0 left-1/2 z-[70] w-full max-w-[430px] -translate-x-1/2 bg-background/92 backdrop-blur-2xl border-b border-border/40">
      <div className="px-4 pt-3 pb-2.5">
        {/* Top Row */}
        <div className="flex items-center justify-between mb-3">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src={logo}
              alt="小优 logo"
              className="h-7 w-auto object-contain"
            />
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-1.5">
            <button className="w-8 h-8 flex items-center justify-center rounded-[10px] bg-muted/60 hover:bg-muted transition-all active:scale-95 relative">
              <Download className="w-[17px] h-[17px] text-foreground/80" />
              <span className="absolute top-1 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full shadow shadow-red-500/50"></span>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-[10px] bg-muted/60 hover:bg-muted transition-all active:scale-95">
              <img
                src="https://images.unsplash.com/photo-1740102075520-fe22a53035cf?w=80&q=80"
                alt="avatar"
                className="w-full h-full rounded-[10px] object-cover"
              />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-[10px] bg-muted/60 hover:bg-muted transition-all active:scale-95">
              <Menu className="w-[17px] h-[17px] text-foreground/80" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="搜索感兴趣的内容..."
            className="w-full h-9 pl-10 pr-10 bg-muted/60 border border-border/40 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all placeholder:text-muted-foreground/70"
          />
          <button className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center">
            <SlidersHorizontal className="w-3.5 h-3.5 text-muted-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
}
