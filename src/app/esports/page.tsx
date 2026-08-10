"use client";

import Image from "next/image";
import ProductCard from "@/components/product/ProductCard";
import { products } from "@/data/products";

const merchProducts = products.filter((p) => p.category === "merch");

const teamRoster = [
  { name: "NoFear", role: "Fragger", avatar: "/images/team/player-1.jpg" },
  { name: "Sleepy", role: "Fragger", avatar: "/images/team/player-2.jpg" },
  { name: "Jiggle", role: "IGL", avatar: "/images/team/player-3.jpg" },
  { name: "Sky", role: "Entry Fragger", avatar: "/images/team/player-4.jpg" },
  { name: "HaitDami", role: "Substitute", avatar: "/images/team/player-5.jpg" },
  { name: "Device", role: "Coach", avatar: "/images/team/player-6.jpg" },
];

const tournaments = [
  {
    id: 1,
    title: "HORRA Cup Season 3",
    date: "Aug 15 - Aug 20, 2026",
    game: "CS2",
    prize: "NPR 150,000",
    status: "Registration Open",
    statusColor: "bg-green-500/20 text-green-400 border-green-500/30",
  },
  {
    id: 2,
    title: "NPL Qualifier - Kathmandu",
    date: "Sep 2, 2026",
    game: "Valorant",
    prize: "NPR 80,000",
    status: "Coming Soon",
    statusColor: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  },
  {
    id: 3,
    title: "Weekend Scrims #42",
    date: "Every Saturday",
    game: "All Games",
    prize: "Practice / ELO",
    status: "Ongoing",
    statusColor: "bg-primary/20 text-primary border-primary/30",
  },
];

export default function EsportsPage() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(123,44,191,0.2),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(123,44,191,0.1),transparent_50%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                Official Esports Arm
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-white leading-[1.1]">
              HORRA ESPORTS
              <span className="block text-primary text-glow">HUB</span>
            </h1>
            <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Compete. Represent. Dominate. Join Nepal&apos;s premier gaming community and wear the badge.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a
                href="#tournaments"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 font-heading font-bold text-white uppercase tracking-wide hover:bg-primary-hover transition-all shadow-[0_0_30px_rgba(123,44,191,0.4)] hover:shadow-[0_0_50px_rgba(123,44,191,0.6)]"
              >
                View Tournaments
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
              </a>
              <a
                href="#merch"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-surface border border-primary/30 px-8 py-4 font-heading font-bold text-white uppercase tracking-wide hover:bg-surface-light hover:border-primary/60 transition-all"
              >
                Shop Merch
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-primary/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              TEAM ROSTER
            </h2>
            <p className="mt-3 text-text-secondary max-w-2xl mx-auto">
              Meet the players representing HORRA ESPORTS on the national stage.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {teamRoster.map((player) => (
              <div
                key={player.name}
                className="group rounded-2xl bg-surface border border-primary/10 overflow-hidden hover:border-primary/40 hover:shadow-[0_0_30px_rgba(123,44,191,0.15)] transition-all duration-300"
              >
                <div className="relative h-40 sm:h-48 bg-surface-light overflow-hidden">
                  <Image
                    src={player.avatar}
                    alt={player.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-heading font-bold text-white text-sm group-hover:text-primary transition-colors">
                    {player.name}
                  </h3>
                  <span className="text-xs text-primary uppercase tracking-wider font-medium">
                    {player.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="tournaments" className="py-16 bg-surface/30 border-t border-primary/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              TOURNAMENTS
            </h2>
            <p className="mt-3 text-text-secondary max-w-2xl mx-auto">
              Compete in our official tournaments and climb the leaderboard.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tournaments.map((tournament) => (
              <div
                key={tournament.id}
                className="rounded-2xl bg-surface border border-primary/10 p-6 hover:border-primary/40 hover:shadow-[0_0_30px_rgba(123,44,191,0.15)] transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    {tournament.game}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border ${tournament.statusColor}`}
                  >
                    {tournament.status}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-2">
                  {tournament.title}
                </h3>
                <p className="text-sm text-text-secondary mb-4">{tournament.date}</p>
                <div className="flex items-center justify-between pt-4 border-t border-primary/10">
                  <span className="text-xs text-text-secondary uppercase tracking-wider">
                    Prize Pool
                  </span>
                  <span className="font-display font-bold text-primary text-lg">
                    {tournament.prize}
                  </span>
                </div>
                {tournament.status === "Registration Open" && (
                  <button className="w-full mt-4 rounded-xl bg-primary py-3 font-heading font-bold text-white text-sm uppercase tracking-wide hover:bg-primary-hover transition-all shadow-[0_0_15px_rgba(123,44,191,0.3)]">
                    Register Now
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="merch" className="py-16 border-t border-primary/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              HORRA MERCH
            </h2>
            <p className="mt-3 text-text-secondary max-w-2xl mx-auto">
              Rep the brand. Official HORRA ESPORTS apparel and gear.
            </p>
          </div>

          {merchProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {merchProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-text-secondary">No merchandise available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-surface/30 border-t border-primary/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
              JOIN THE SQUAD
            </h2>
            <p className="text-text-secondary mb-8">
              Subscribe to get tournament updates, merch drops, and exclusive offers straight to your inbox.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thanks for subscribing!");
              }}
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="flex-1 rounded-xl bg-surface border border-primary/20 px-4 py-3 text-white placeholder:text-text-secondary/50 focus:outline-none focus:border-primary transition-colors"
              />
              <button
                type="submit"
                className="rounded-xl bg-primary px-8 py-3 font-heading font-bold text-white uppercase tracking-wide hover:bg-primary-hover transition-all shadow-[0_0_30px_rgba(123,44,191,0.4)] hover:shadow-[0_0_50px_rgba(123,44,191,0.6)]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
