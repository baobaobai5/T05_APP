import { Download, Menu } from 'lucide-react';
import logo from '../../assets/logo.svg';

interface TopBrandBarProps {
}

export function TopBrandBar(_: TopBrandBarProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <img src={logo} alt="小优 logo" className="h-7 w-auto object-contain" />
      </div>

      <div className="flex items-center gap-1.5">
        <button className="relative flex h-8 w-8 items-center justify-center rounded-[10px] bg-muted/60 text-foreground/80 transition-all hover:bg-muted active:scale-95">
          <Download className="h-[17px] w-[17px]" />
          <span className="absolute right-1.5 top-1 h-1.5 w-1.5 rounded-full bg-red-500 shadow shadow-red-500/50"></span>
        </button>
        <button className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-[10px] bg-muted/60 text-foreground/80 transition-all hover:bg-muted active:scale-95">
          <img
            src="https://images.unsplash.com/photo-1740102075520-fe22a53035cf?w=80&q=80"
            alt="avatar"
            className="h-full w-full rounded-[10px] object-cover"
          />
        </button>
        <button className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-muted/60 text-foreground/80 transition-all hover:bg-muted active:scale-95">
          <Menu className="h-[16px] w-[16px]" />
        </button>
      </div>
    </div>
  );
}
