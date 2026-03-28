import { useState } from 'react';
import { Header } from './components/Header';
import { FeaturedSection } from './components/FeaturedSection';
import { AdSection } from './components/AdSection';
import { BottomNav } from './components/BottomNav';
import { CategoryTabs } from './components/CategoryTabs';
import { PromoGrid } from './components/PromoGrid';
import { WeeklyPicks } from './components/WeeklyPicks';
import { TopCharts } from './components/TopCharts';
import { HotRecommendations } from './components/HotRecommendations';
import { SlimAdBanner } from './components/SlimAdBanner';
import { EditorPicks } from './components/EditorPicks';
import { CategoryHighlights } from './components/CategoryHighlights';
import { FreeNovelGrid } from './components/FreeNovelGrid';
import { RecentUpdates } from './components/RecentUpdates';
import { AllCategoriesFloat } from './components/AllCategoriesFloat';
import { CategoryBrowsePage } from './components/CategoryBrowsePage';
import { NovelDetailPage } from './components/NovelDetailPage';
import { ReadingPage } from './components/ReadingPage';
import { RankingPage } from './components/RankingPage';
import type { NovelDetailData } from './components/NovelDetailPage';
import type { ReaderChapterData } from './components/ReadingPage';

function buildReaderChapterFromNovel(novel: NovelDetailData): ReaderChapterData {
  return {
    title: `第1章 她该清醒了`,
    updatedAt: novel.updatedAt,
    badge: 'vip',
    content: [
      '容桥抵达国机场时，已经晚上九点多了。',
      '今天是她生日。',
      '她打开手机时，收到了一堆生日祝福。',
      '都是同事和朋友发过来的，封庭深这边却一点消息都没有。',
      '容桥笑容淡了下来，夜色里只剩下机场广播声和她的脚步声。',
    ],
  };
}

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [currentPage, setCurrentPage] = useState<
    'home' | 'category' | 'allWorks' | 'ranking' | 'finished' | 'free' | 'vip' | 'detail' | 'reader'
  >('home');
  const [detailSourcePage, setDetailSourcePage] = useState<
    'home' | 'category' | 'allWorks' | 'ranking' | 'finished' | 'free' | 'vip'
  >('home');
  const [selectedNovel, setSelectedNovel] = useState<NovelDetailData | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<ReaderChapterData | null>(null);

  const openDetailPage = (
    novel: NovelDetailData,
    source: 'home' | 'category' | 'allWorks' | 'ranking' | 'finished' | 'free' | 'vip',
  ) => {
    setSelectedNovel(novel);
    setDetailSourcePage(source);
    setCurrentPage('detail');
  };

  const openReaderPage = (chapter: ReaderChapterData) => {
    setSelectedChapter(chapter);
    setCurrentPage('reader');
  };

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-background text-foreground">
        {/* Mobile Container */}
        <div className="max-w-[430px] mx-auto bg-background min-h-screen relative overflow-hidden">
          {currentPage === 'reader' && selectedNovel && selectedChapter ? (
            <ReadingPage
              novel={{
                title: selectedNovel.title,
                author: selectedNovel.author,
                cover: selectedNovel.cover,
              }}
              chapter={selectedChapter}
              onBack={() => setCurrentPage('detail')}
            />
          ) : currentPage === 'detail' && selectedNovel ? (
            <NovelDetailPage
              novel={selectedNovel}
              onBack={() => setCurrentPage(detailSourcePage)}
              onOpenChapter={openReaderPage}
              onStartReading={() => openReaderPage(buildReaderChapterFromNovel(selectedNovel))}
            />
          ) : currentPage === 'ranking' ? (
            <RankingPage
              onBack={() => setCurrentPage('home')}
              onOpenDetail={(novel) => openDetailPage(novel, 'ranking')}
            />
          ) : currentPage !== 'home' ? (
            <CategoryBrowsePage
              key={currentPage}
              variant={currentPage}
              onBack={() => setCurrentPage('home')}
              onOpenDetail={(novel) => openDetailPage(novel, currentPage)}
            />
          ) : (
            <>

              {/* ── 1. 顶部粘性导航 ── */}
              <Header />

              {/* ── 主滚动区域 ── */}
              <main className="pt-[86px] pb-24">

                {/* ── 2. Banner 轮播 ── */}
                <FeaturedSection />

                {/* ── 3. 分类导航 ── */}
                <div className="mt-1">
                  <CategoryTabs onOpenCategoryPage={setCurrentPage} />
                </div>

                {/* ── 4. 金刚区下广告位 ── */}
                <div className="mb-3">
                  <PromoGrid />
                </div>

                {/* ── 5. 本周强推 ── */}
                <div className="mb-2">
                  <WeeklyPicks />
                </div>

                {/* ── 6. 排行榜 ── */}
                <div className="mb-2">
                  <TopCharts />
                </div>

                {/* ── 7. 热门推荐 ── */}
                <div className="mb-2">
                  <HotRecommendations />
                </div>

                {/* ── 8. 细横幅广告 ── */}
                <div className="mb-2">
                  <SlimAdBanner />
                </div>

                {/* ── 9. 总编推荐 ── */}
                <div className="mb-2">
                  <EditorPicks />
                </div>

                {/* ── 10. 分类切换内容 ── */}
                <div className="mb-2">
                  <CategoryHighlights />
                </div>

                {/* ── 10.1 古代情缘下广告位 ── */}
                <div className="mb-2">
                  <AdSection variant="banner" />
                </div>

                {/* ── 10.2 免费小说入口 ── */}
                <div className="mb-2">
                  <FreeNovelGrid />
                </div>

                {/* ── 10.3 最近更新 ── */}
                <div className="mb-2">
                  <RecentUpdates />
                </div>

              </main>

              <AllCategoriesFloat />

              {/* ── 底部导航栏 ── */}
              <BottomNav />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
