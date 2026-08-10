"use client";

import { useCart } from "@/components/cart/CartProvider";
import Image from "next/image";
import Link from "next/link";

export default function CartDrawer() {
  const { state, toggleCart, removeItem, updateQuantity, totalPrice } = useCart();

  if (!state.isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
        onClick={toggleCart}
      />
      <div className="fixed right-0 top-0 z-[70] h-full w-full max-w-md border-l border-primary/20 bg-background shadow-2xl flex flex-col">
        <div className="flex items-center justify-between border-b border-primary/20 px-6 py-4">
          <h2 className="font-display text-lg font-bold tracking-wide text-white">
            YOUR CART
          </h2>
          <button
            onClick={toggleCart}
            className="rounded-lg p-2 text-text-secondary hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="h-16 w-16 text-text-secondary/30 mb-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              <p className="font-heading text-lg text-text-secondary">
                Your cart is empty
              </p>
              <p className="text-sm text-text-secondary/70 mt-1">
                Add some gaming gear to get started!
              </p>
            </div>
          ) : (
            state.items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 rounded-xl bg-surface p-3 border border-primary/10"
              >
                <div className="h-20 w-20 flex-shrink-0 rounded-lg bg-surface-light overflow-hidden relative">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-semibold text-sm text-white truncate">
                    {item.name}
                  </h3>
                  <p className="text-primary font-bold text-sm mt-1">
                    NPR {item.price.toLocaleString()}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      className="h-7 w-7 rounded-lg bg-surface-light flex items-center justify-center text-text-secondary hover:text-white border border-primary/20 transition-colors"
                    >
                      -
                    </button>
                    <span className="text-sm font-medium text-white w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="h-7 w-7 rounded-lg bg-surface-light flex items-center justify-center text-text-secondary hover:text-white border border-primary/20 transition-colors"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-auto text-xs text-red-400 hover:text-red-300 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {state.items.length > 0 && (
          <div className="border-t border-primary/20 px-6 py-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Subtotal</span>
              <span className="font-medium text-white">
                NPR {totalPrice.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Shipping</span>
              <span className="font-medium text-white">Calculated at checkout</span>
            </div>
            <div className="flex justify-between text-base pt-2 border-t border-primary/10">
              <span className="font-heading font-bold text-white">Total</span>
              <span className="font-display font-bold text-primary">
                NPR {totalPrice.toLocaleString()}
              </span>
            </div>
            <Link
              href="/cart"
              onClick={toggleCart}
              className="block w-full text-center rounded-xl bg-primary py-3 font-heading font-bold text-white uppercase tracking-wide hover:bg-primary-hover transition-colors shadow-[0_0_20px_rgba(123,44,191,0.4)]"
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
