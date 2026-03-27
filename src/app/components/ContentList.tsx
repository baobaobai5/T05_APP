import { ChevronRight, MessageCircle, Eye, Heart, Clock } from 'lucide-react';

interface ContentListProps {
  title: string;
  showMore?: boolean;
}

const contentItems = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1668243074547-28f9d7d30b31?w=200&q=80',
    tag: '推荐',
    tagColor: 'text-violet-500 bg-violet-500/10',
    title: '小优推荐的5个实用技巧，用完效率翻倍',
    author: '技术达人',
    views: '2.3万',
    likes: '1.2k',
    comments: 156,
    time: '2小时前',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1758577675644-076b0ddca611?w=200&q=80',
    tag: '热门',
    tagColor: 'text-red-500 bg-red-500/10',
    title: '2026年最值得入手的数码设备盘点合集',
    author: '数码评测',
    views: '1.8万',
    likes: '987',
    comments: 89,
    time: '4小时前',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1760278041881-e64e501d009c?w=200&q=80',
    tag: '精选',
    tagColor: 'text-emerald-500 bg-emerald-500/10',
    title: 'UI 设计趋势解析：极简主义的回归与演变',
    author: 'UI设计师',
    views: '3.1万',
    likes: '2.3k',
    comments: 234,
    time: '6小时前',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1738511538160-e6a783d751d9?w=200&q=80',
    tag: '游戏',
    tagColor: 'text-blue-500 bg-blue-500/10',
    title: '独立游戏开发心路历程：从零到一百万下载',
    author: '游戏创作者',
    views: '1.5万',
    likes: '876',
    comments: 67,
    time: '8小时前',
  },
];

export function ContentList({ title, showMore = false }: ContentListProps) {
  return (
    <section className="px-4">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="bg-primary-gradient w-1 h-4 rounded-full"></div>
          <h3 className="text-base">{title}</h3>
        </div>
        {showMore && (
          <button className="flex items-center gap-0.5 text-xs text-muted-foreground hover:text-primary transition-colors">
            更多
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Content Cards */}
      <div className="space-y-2.5">
        {contentItems.slice(0, showMore ? 4 : 3).map((item) => (
          <article
            key={item.id}
            className="p-3 bg-card rounded-2xl border border-border/40 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all active:scale-[0.99] cursor-pointer"
          >
            <div className="flex gap-3">
              {/* Thumbnail */}
              <div className="flex-shrink-0 w-20 h-[72px] rounded-[10px] overflow-hidden bg-muted">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className={`text-xs px-1.5 py-0.5 rounded ${item.tagColor}`}>
                      {item.tag}
                    </span>
                  </div>
                  <h4 className="text-sm leading-snug line-clamp-2 hover:text-primary transition-colors">
                    {item.title}
                  </h4>
                </div>

                {/* Meta Info */}
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1.5">
                  <span className="text-muted-foreground/70">{item.author}</span>
                  <span className="flex items-center gap-0.5">
                    <Eye className="w-3 h-3" />
                    {item.views}
                  </span>
                  <span className="flex items-center gap-0.5">
                    <Heart className="w-3 h-3" />
                    {item.likes}
                  </span>
                  <span className="flex items-center gap-0.5 ml-auto">
                    <Clock className="w-3 h-3" />
                    {item.time}
                  </span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
