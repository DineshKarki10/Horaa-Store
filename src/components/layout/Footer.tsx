"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-primary/20 bg-surface/50 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="relative h-10 w-10 rounded-lg overflow-hidden shadow-[0_0_15px_rgba(123,44,191,0.5)]">
                <Image
                  src="/HoraStore.jpeg"
                  alt="HORRA STORE Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="font-display font-bold text-lg tracking-wider text-white block">
                  HORRA STORE
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-primary">
                  Gaming Gear & Custom PCs
                </span>
              </div>
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed">
              Official retail arm of HORRA ESPORTS. Premium gaming hardware and custom PC builds in Kathmandu, Nepal.
            </p>
          </div>

          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-white mb-4">
              Shop
            </h3>
            <ul className="space-y-2">
              {["Custom PCs", "Laptops", "Keyboards", "Audio", "Cables", "Streaming"].map((item) => (
                <li key={item}>
                  <Link
                    href="/catalog"
                    className="text-sm text-text-secondary hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-white mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <span className="text-sm text-text-secondary">
                  📍 Kathmandu, Nepal
                </span>
              </li>
              <li>
                <span className="text-sm text-text-secondary">
                  📞 +977-1-XXXXXXX
                </span>
              </li>
              <li>
                <span className="text-sm text-text-secondary">
                  ✉️ support@horrastore.com
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-white mb-4">
              Payment Methods
            </h3>
            <div className="flex flex-wrap gap-2">
              {["eSewa", "Khalti", "ConnectIPS", "COD"].map((method) => (
                <span
                  key={method}
                  className="px-3 py-1 rounded-lg bg-surface-light text-xs font-medium text-text-secondary border border-primary/20"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-text-secondary/70">
            © 2025 HORRA ESPORTS. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-text-secondary/70 hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs text-text-secondary/70 hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-xs text-text-secondary/70 hover:text-primary transition-colors">
              Shipping Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
