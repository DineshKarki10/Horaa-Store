import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/product/ProductCard";
import { products, categories } from "@/data/products";

export default function Home() {
  const featuredProducts = products.filter((p) => p.inStock).slice(0, 4);
  const saleProducts = products.filter((p) => p.originalPrice && p.inStock).slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(123,44,191,0.15),transparent_50%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-sm font-medium text-primary uppercase tracking-wider">
                  Official Store — Kathmandu, Nepal
                </span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-white leading-[1.1]">
                LEVEL UP YOUR
                <span className="block text-glow text-primary">GAME</span>
              </h1>
              <p className="text-lg sm:text-xl text-text-secondary max-w-xl leading-relaxed">
                Premium gaming hardware, custom PC builds, and esports gear from HORRA ESPORTS. Built for gamers, by gamers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/catalog"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 font-heading font-bold text-white uppercase tracking-wide hover:bg-primary-hover transition-all shadow-[0_0_30px_rgba(123,44,191,0.4)] hover:shadow-[0_0_50px_rgba(123,44,191,0.6)]"
                >
                  Shop Now
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
                <Link
                  href="/builder"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-surface border border-primary/30 px-8 py-4 font-heading font-bold text-white uppercase tracking-wide hover:bg-surface-light hover:border-primary/60 transition-all"
                >
                  Build Your PC
                </Link>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div>
                  <span className="block font-display text-2xl font-bold text-white">2+</span>
                  <span className="text-xs text-text-secondary uppercase tracking-wider">Years Warranty</span>
                </div>
                <div className="h-8 w-px bg-primary/20" />
                <div>
                  <span className="block font-display text-2xl font-bold text-white">Local</span>
                  <span className="text-xs text-text-secondary uppercase tracking-wider">Pickup in KTM</span>
                </div>
                <div className="h-8 w-px bg-primary/20" />
                <div>
                  <span className="block font-display text-2xl font-bold text-white">COD</span>
                  <span className="text-xs text-text-secondary uppercase tracking-wider">Cash on Delivery</span>
                </div>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 rounded-full bg-primary/10 blur-3xl" />
                <div className="relative h-full w-full rounded-full border border-primary/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-8xl font-display font-black text-primary/20">HS</div>
                    <div className="font-heading text-xl font-bold text-white -mt-4">
                      HORRA ESPORTS
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center animate-pulse">
                  <span className="text-3xl">🎮</span>
                </div>
                <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center animate-pulse" style={{ animationDelay: "1s" }}>
                  <span className="text-2xl">🖥️</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 border-t border-primary/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              SHOP BY CATEGORY
            </h2>
            <p className="mt-3 text-text-secondary max-w-2xl mx-auto">
              From custom PC builds to essential accessories, find everything you need to dominate the game.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/catalog?category=${category.id}`}
                className="group flex flex-col items-center gap-3 rounded-2xl bg-surface border border-primary/10 p-6 hover:border-primary/40 hover:shadow-[0_0_20px_rgba(123,44,191,0.15)] transition-all duration-300"
              >
                <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </span>
                <span className="font-heading font-semibold text-sm text-white text-center group-hover:text-primary transition-colors">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-surface/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
                FEATURED PRODUCTS
              </h2>
              <p className="mt-2 text-text-secondary">
                Handpicked gaming gear for the serious player
              </p>
            </div>
            <Link
              href="/catalog"
              className="hidden sm:flex items-center gap-2 font-heading text-sm font-medium text-primary hover:text-primary-hover transition-colors"
            >
              View All
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Sale Banner */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-primary-hover p-8 sm:p-12 lg:p-16">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
            <div className="relative grid lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-bold text-white uppercase tracking-wider">
                  Limited Time Offer
                </span>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                  BUILD YOUR DREAM RIG
                </h2>
                <p className="text-white/80 text-lg max-w-lg">
                  Use our interactive PC Builder to configure your perfect setup. Get real-time compatibility checks and instant NPR pricing.
                </p>
                <Link
                  href="/builder"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-heading font-bold text-primary uppercase tracking-wide hover:bg-gray-100 transition-colors shadow-lg"
                >
                  Start Building
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              </div>
              <div className="hidden lg:flex justify-center">
                <div className="relative">
                  <div className="text-[120px] font-display font-black text-white/10">PC</div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl">🖥️</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* On Sale */}
      {saleProducts.length > 0 && (
        <section className="py-16 bg-surface/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
                🔥 ON SALE NOW
              </h2>
              <p className="mt-2 text-text-secondary">
                Limited-time deals on premium gaming gear
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {saleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trust Badges */}
      <section className="py-16 border-t border-primary/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "🚚",
                title: "Free Local Delivery",
                desc: "Inside Kathmandu Valley",
              },
              {
                icon: "🛡️",
                title: "Official Warranty",
                desc: "Authorized dealer warranty",
              },
              {
                icon: "💳",
                title: "Multiple Payments",
                desc: "eSewa, Khalti, ConnectIPS, COD",
              },
              {
                icon: "🏪",
                title: "Physical Store",
                desc: "Visit us in Kathmandu",
              },
            ].map((badge) => (
              <div
                key={badge.title}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-surface border border-primary/10"
              >
                <span className="text-3xl mb-3">{badge.icon}</span>
                <h3 className="font-heading font-bold text-white text-sm">
                  {badge.title}
                </h3>
                <p className="text-xs text-text-secondary mt-1">{badge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
