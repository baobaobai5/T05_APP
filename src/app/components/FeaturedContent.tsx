import { Star, BookmarkPlus, ChevronRight, Play } from 'lucide-react';

const featured = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1760278041881-e64e501d009c?w=400&q=80',
    category: '设计',
    categoryColor: 'text-violet-500 bg-violet-500/15',
    title: '设计师的日常工作流',
    author: '设计达人',
    rating: 4.8,
    saves: '2.3k',
    duration: null,
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1636312811920-cdfa08331564?w=400&q=80',
    category: '游戏',
    categoryColor: 'text-blue-500 bg-blue-500/15',
    title: '年度最佳独立游戏推荐',
    author: '游戏专家',
    rating: 4.9,
    saves: '3.1k',
    duration: '12:34',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1762951566442-af07db89ab1c?w=400&q=80',
    category: '科技',
    categoryColor: 'text-cyan-500 bg-cyan-500/15',
    title: '探索AI时代的创作边界',
    author: '科技观察',
    rating: 4.7,
    saves: '1.8k',
    duration: '08:22',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1738511538160-e6a783d751d9?w=400&q=80',
    category: '文化',
    categoryColor: 'text-pink-500 bg-pink-500/15',
    title: '二次元文化的破圈之路',
    author: '文化解读',
    rating: 4.6,
    saves: '1.2k',
    duration: null,
  },
];

export function FeaturedContent() {
  return (
    <section className="px-0">
      <div className="flex items-center justify-between mb-3 px-4">
        <div className="flex items-center gap-2">
          <div className="bg-primary-gradient w-1 h-4 rounded-full"></div>
          <h3 className="text-base">编辑精选</h3>
        </div>
        <button className="flex items-center gap-0.5 text-xs text-primary">
          更多推荐 <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex gap-3 overflow-x-auto scrollbar-hide pl-4 pr-2 pb-1">
        {featured.map((item) => (
          <div
            key={item.id}
            className="flex-shrink-0 w-48 bg-card rounded-[10px] border border-border/40 overflow-hidden hover:shadow-xl hover:shadow-primary/10 hover:border-primary/20 transition-all active:scale-[0.98] cursor-pointer group"
          >
            {/* Image */}
            <div className="h-32 relative overflow-hidden bg-muted rounded-[10px]">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {item.duration && (
                <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/70 text-white px-1.5 py-0.5 rounded text-xs">
                  <Play className="w-2.5 h-2.5 fill-white" />
                  {item.duration}
                </div>
              )}
              <span className={`absolute top-2 left-2 px-1.5 py-0.5 text-xs rounded-md ${item.categoryColor}`}>
                {item.category}
              </span>
            </div>

            {/* Content */}
            <div className="p-3">
              <h4 className="text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors leading-snug">
                {item.title}
              </h4>
              <p className="text-xs text-muted-foreground mb-2">{item.author}</p>

              {/* Meta */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span className="text-amber-500">{item.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <BookmarkPlus className="w-3.5 h-3.5" />
                  <span>{item.saves}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
