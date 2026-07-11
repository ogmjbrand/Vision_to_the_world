import SearchWidget from "@/components/search/search-widget";
import Container from "@/components/ui/container";
import VideoBackground from "@/components/home/video-background";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-950">
      <VideoBackground
        src="/media/hero/hero-clip-1.mp4"
        poster="/media/gallery/vineyard-lake-sunset.jpg"
      />
      <Container className="relative py-20 sm:py-28">
        <div className="max-w-2xl">
          <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-accent-200 ring-1 ring-white/20">
            Self-service travel, done right
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Your Journey. <span className="text-accent-400">Your Choice.</span>{" "}
            Your World.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-brand-100">
            Search, compare, book, and manage flights, hotels, car rentals,
            transfers, and complete travel packages — all from one seamless
            digital platform, with expert help whenever you need it.
          </p>
        </div>

        <div className="mt-10">
          <SearchWidget />
        </div>
      </Container>
    </section>
  );
}
