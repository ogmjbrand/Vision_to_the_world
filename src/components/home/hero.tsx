import SearchWidget from "@/components/search/search-widget";
import Container from "@/components/ui/container";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-700">
      <div className="bg-grid absolute inset-0 opacity-40" aria-hidden />
      <div
        className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent-500/20 blur-3xl"
        aria-hidden
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
