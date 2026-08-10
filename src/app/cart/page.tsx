"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";

export default function CartPage() {
  const { state, removeItem, updateQuantity, totalPrice } = useCart();
  const [isInsideRingRoad, setIsInsideRingRoad] = useState(false);
  const items = state.items;

  const subtotal = totalPrice;
  const shippingInsideRingRoad = subtotal > 0 ? 200 : 0;
  const shippingOutsideRingRoad = subtotal > 0 ? 500 : 0;

  const shippingCost = isInsideRingRoad ? shippingInsideRingRoad : shippingOutsideRingRoad;
  const total = subtotal + shippingCost;

  const isEmpty = items.length === 0;

  return (
    <div className="min-h-screen py-8 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-8">
          YOUR CART
        </h1>

        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="relative w-32 h-32 mb-8">
              <div className="absolute inset-0 rounded-full bg-primary/10 blur-xl" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-full h-full text-primary/50"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </div>
            <h2 className="font-display text-2xl font-bold text-white mb-3">
              Your cart is empty
            </h2>
            <p className="text-text-secondary max-w-md mb-8">
              Looks like you haven&apos;t added any gaming gear yet. Explore our catalog and find your perfect setup.
            </p>
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 font-heading font-bold text-white uppercase tracking-wide hover:bg-primary-hover transition-all shadow-[0_0_30px_rgba(123,44,191,0.4)] hover:shadow-[0_0_50px_rgba(123,44,191,0.6)]"
            >
              Start Shopping
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
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="rounded-2xl bg-surface border border-primary/10 overflow-hidden">
                <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-4 border-b border-primary/10 text-xs font-heading font-bold uppercase tracking-wider text-text-secondary">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>

                {items.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-5 border-b border-primary/10 last:border-b-0 items-center"
                  >
                    <div className="md:col-span-6 flex items-center gap-4">
                      <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-xl overflow-hidden bg-surface-light flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-heading font-semibold text-white text-sm sm:text-base line-clamp-1">
                          {item.name}
                        </h3>
                        {item.specifications && (
                          <p className="text-xs text-text-secondary mt-1 line-clamp-1">
                            {Object.entries(item.specifications)
                              .slice(0, 2)
                              .map(([key, val]) => `${key}: ${val}`)
                              .join(" | ")}
                          </p>
                        )}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="mt-2 text-xs text-red-400 hover:text-red-300 transition-colors font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="md:col-span-2 text-center">
                      <span className="md:hidden text-xs text-text-secondary mr-2">Price:</span>
                      <span className="font-display font-bold text-white text-sm">
                        NPR {item.price.toLocaleString()}
                      </span>
                    </div>

                    <div className="md:col-span-2">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity > 1 ? item.quantity - 1 : 1)
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-light border border-primary/20 text-white hover:bg-primary/20 transition-colors"
                        >
                          -
                        </button>
                        <span className="font-display font-bold text-white w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-light border border-primary/20 text-white hover:bg-primary/20 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="md:col-span-2 text-right">
                      <span className="md:hidden text-xs text-text-secondary mr-2">Total:</span>
                      <span className="font-display font-bold text-primary text-sm sm:text-base">
                        NPR {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="rounded-2xl bg-surface border border-primary/10 p-6 sticky top-24">
                <h2 className="font-display text-xl font-bold text-white mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Subtotal</span>
                    <span className="font-display font-bold text-white">
                      NPR {subtotal.toLocaleString()}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <span className="text-sm text-text-secondary">Shipping</span>
                    <div className="flex flex-col gap-2 pl-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="shipping"
                          checked={isInsideRingRoad}
                          onChange={() => setIsInsideRingRoad(true)}
                          className="accent-primary"
                        />
                        <span className="text-sm text-white">
                          Inside Ring Road (Kathmandu)
                        </span>
                        <span className="text-sm text-text-secondary ml-auto">
                          NPR {shippingInsideRingRoad}
                        </span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="shipping"
                          checked={!isInsideRingRoad}
                          onChange={() => setIsInsideRingRoad(false)}
                          className="accent-primary"
                        />
                        <span className="text-sm text-white">
                          Outside Ring Road
                        </span>
                        <span className="text-sm text-text-secondary ml-auto">
                          NPR {shippingOutsideRingRoad}
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="border-t border-primary/20 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-heading font-bold text-white uppercase tracking-wide">
                        Total
                      </span>
                      <span className="font-display text-2xl font-black text-primary text-glow">
                        NPR {total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  className="w-full rounded-xl bg-primary py-4 font-heading font-bold text-white uppercase tracking-wide hover:bg-primary-hover transition-all shadow-[0_0_30px_rgba(123,44,191,0.4)] hover:shadow-[0_0_50px_rgba(123,44,191,0.6)] mb-4"
                >
                  Proceed to Checkout
                </button>

                <Link
                  href="/catalog"
                  className="flex items-center justify-center gap-2 font-heading text-sm font-medium text-primary hover:text-primary-hover transition-colors"
                >
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
                      d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                    />
                  </svg>
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
