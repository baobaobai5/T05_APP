import { TrendingUp, Flame, ChevronRight } from 'lucide-react';
import { HeatCount } from './ui/heat-count';

const rankings = [
  {
    rank: 1,
    title: '今日最热话题：小优新版本震撼上线',
    heat: '98.5万',
    trend: '+234%',
    tag: '热',
    tagColor: 'bg-red-500/15 text-red-500',
  },
  {
    rank: 2,
    title: '新功能体验分享：全新AI创作助手',
    heat: '67.2万',
    trend: '+156%',
    tag: '新',
    tagColor: 'bg-blue-500/15 text-blue-500',
  },
  {
    rank: 3,
    title: '实用技巧合集：让工作效率翻三倍',
    heat: '52.8万',
    trend: '+98%',
    tag: '荐',
    tagColor: 'bg-violet-500/15 text-violet-500',
  },
  {
    rank: 4,
    title: '用户故事精选：从普通到优秀的蜕变',
    heat: '41.3万',
    trend: '+67%',
    tag: '',
    tagColor: '',
  },
  {
    rank: 5,
    title: '创意作品展示：年度最佳UX设计案例',
    heat: '38.9万',
    trend: '+45%',
    tag: '',
    tagColor: '',
  },
  {
    rank: 6,
    title: '深度测评：2026年度最强生产力工具',
    heat: '31.2万',
    trend: '+38%',
    tag: '',
    tagColor: '',
  },
];

const rankColors = [
  'from-red-500 to-orange-500',
  'from-orange-500 to-amber-400',
  'from-amber-400 to-yellow-400',
];

export function RankingList() {
  return (
    <section className="px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-orange-500" />
          <h3 className="text-base">实时热榜</h3>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
            实时更新
          </span>
        </div>
        <button className="flex items-center gap-0.5 text-xs text-primary">
          查看全部 <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Ranking Cards */}
      <div className="bg-card rounded-2xl border border-border/40 overflow-hidden divide-y divide-border/30">
        {rankings.map((item) => (
          <div
            key={item.rank}
            className="flex items-center gap-3 px-4 py-3 hover:bg-muted/30 transition-colors active:bg-muted/50 cursor-pointer"
          >
            {/* Rank Badge */}
            <div
              className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-lg text-xs ${
                item.rank <= 3
                  ? `bg-gradient-to-br ${rankColors[item.rank - 1]} text-white shadow-sm`
                  : 'text-muted-foreground'
              }`}
              style={{ fontWeight: item.rank <= 3 ? 700 : 500 }}
            >
              {item.rank}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-sm leading-snug line-clamp-1 hover:text-primary transition-colors">
                  {item.title}
                </span>
                {item.tag && (
                  <span className={`flex-shrink-0 px-1.5 py-0.5 text-xs rounded ${item.tagColor}`}>
                    {item.tag}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
                <HeatCount value={item.heat} iconClassName="w-3 h-3" className="text-xs text-muted-foreground" />
                <span className="flex items-center gap-0.5 text-emerald-500">
                  <TrendingUp className="w-3 h-3" />
                  {item.trend}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
