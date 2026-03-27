interface SlimAdBannerProps {
  imageSrc?: string;
}

export function SlimAdBanner({ imageSrc }: SlimAdBannerProps) {
  return (
    <section className="px-4 py-2">
      <div className="h-[90px] overflow-hidden rounded-[10px] border border-white/8 bg-card/92 shadow-lg shadow-black/8">
        <img
          src={imageSrc ?? 'https://picsum.photos/seed/codex-random-banner/1280/720'}
          alt="广告横幅"
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  );
}
