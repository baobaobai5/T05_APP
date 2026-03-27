import { Users, Eye, MessageSquare, Heart } from 'lucide-react';

const stats = [
  {
    icon: Users,
    label: '在线用户',
    value: '12.5万',
    trend: '+8.2%',
    color: '#6659e6',
    bg: 'from-[#4950de]/15 to-[#775af0]/6',
  },
  {
    icon: Eye,
    label: '今日浏览',
    value: '358万',
    trend: '+12.5%',
    color: '#3b82f6',
    bg: 'from-blue-500/15 to-blue-400/5',
  },
  {
    icon: MessageSquare,
    label: '互动数',
    value: '45.2万',
    trend: '+6.8%',
    color: '#10b981',
    bg: 'from-emerald-500/15 to-emerald-400/5',
  },
  {
    icon: Heart,
    label: '点赞数',
    value: '89.6万',
    trend: '+15.3%',
    color: '#ef4444',
    bg: 'from-red-500/15 to-red-400/5',
  },
];

export function StatsCard() {
  return (
    <section className="px-4">
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`p-4 rounded-2xl bg-gradient-to-br ${stat.bg} border border-border/50 hover:border-border transition-all active:scale-98`}
            >
              <div className="flex items-center justify-between mb-2.5">
                <div
                  className="w-9 h-9 flex items-center justify-center rounded-xl"
                  style={{ background: `${stat.color}20` }}
                >
                  <Icon className="w-4.5 h-4.5" style={{ color: stat.color, width: 18, height: 18 }} />
                </div>
                <span className="text-xs text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded-md">
                  {stat.trend}
                </span>
              </div>
              <div className="text-xl mb-0.5" style={{ color: stat.color, fontWeight: 700 }}>
                {stat.value}
              </div>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
