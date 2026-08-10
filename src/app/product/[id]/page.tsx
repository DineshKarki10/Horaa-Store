"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import ProductCard from "@/components/product/ProductCard";
import { products, categories } from "@/data/products";
import { useCart } from "@/components/cart/CartProvider";
import { Product } from "@/data/products";

function StarRating({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={i < Math.floor(rating) ? "currentColor" : "none"}
            stroke="currentColor"
            className={`h-5 w-5 ${
              i < Math.floor(rating) ? "text-yellow-400" : "text-text-secondary/30"
            }`}
          >
            <path
              fillRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
              clipRule="evenodd"
            />
          </svg>
        ))}
      </div>
      <span className="text-sm text-text-secondary ml-1">
        {rating} ({reviews} reviews)
      </span>
    </div>
  );
}

function ProductImage({ product }: { product: Product }) {
  const [imgError, setImgError] = useState(false);
  const initials = product.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-gradient-to-br from-primary/30 via-surface to-surface-light border border-primary/10">
      {!imgError && (
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          onError={() => setImgError(true)}
        />
      )}
      {imgError && (
        <div className="flex flex-col items-center justify-center h-full text-primary/60">
          <span className="text-8xl font-display font-black">{initials}</span>
          <span className="font-heading text-xl font-bold mt-4 text-white/40">{product.brand}</span>
        </div>
      )}
      {product.originalPrice && (
        <span className="absolute top-4 left-4 px-3 py-1 rounded-xl bg-red-500/90 text-xs font-bold text-white uppercase tracking-wider shadow-lg">
          Sale
        </span>
      )}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-xl font-heading font-bold text-sm uppercase tracking-wider transition-all duration-300 ${
        active
          ? "bg-primary text-white shadow-[0_0_20px_rgba(123,44,191,0.4)]"
          : "bg-surface text-text-secondary hover:text-white hover:bg-surface-light border border-primary/10"
      }`}
    >
      {children}
    </button>
  );
}

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"specs" | "description" | "warranty">("specs");

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-6">
          <h1 className="font-display text-6xl font-black text-primary text-glow">404</h1>
          <h2 className="font-heading text-2xl font-bold text-white">Product Not Found</h2>
          <p className="text-text-secondary max-w-md">
            The product you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 font-heading font-bold text-white uppercase tracking-wide hover:bg-primary-hover transition-all shadow-[0_0_30px_rgba(123,44,191,0.4)]"
          >
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
            Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  const category = categories.find((c) => c.id === product.category);
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      type: "product",
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
      specifications: product.specifications,
    });
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8">
          <Link href="/" className="text-text-secondary hover:text-primary transition-colors">
            Home
          </Link>
          <span className="text-primary/40">›</span>
          <Link href="/catalog" className="text-text-secondary hover:text-primary transition-colors">
            Catalog
          </Link>
          <span className="text-primary/40">›</span>
          {category && (
            <>
              <span className="text-text-secondary">{category.name}</span>
              <span className="text-primary/40">›</span>
            </>
          )}
          <span className="text-white font-medium truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* Main Product Section */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Left: Product Image */}
          <div className="sticky top-24 h-fit">
            <ProductImage product={product} />
          </div>

          {/* Right: Product Info */}
          <div className="space-y-6">
            <div>
              <span className="inline-block px-3 py-1 rounded-lg bg-primary/10 border border-primary/30 text-xs font-bold text-primary uppercase tracking-wider mb-3">
                {product.brand}
              </span>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                {product.name}
              </h1>
            </div>

            <StarRating rating={product.rating} reviews={product.reviews} />

            <div className="flex items-baseline gap-4">
              <span className="font-display text-4xl sm:text-5xl font-black text-white">
                NPR {product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-text-secondary line-through">
                  NPR {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-text-secondary text-base leading-relaxed">{product.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-lg bg-surface-light border border-primary/10 text-xs text-text-secondary uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="font-heading font-bold text-white text-sm uppercase tracking-wider">
                Quantity:
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 rounded-xl bg-surface border border-primary/20 flex items-center justify-center text-white hover:bg-surface-light hover:border-primary/40 transition-all"
                >
                  -
                </button>
                <span className="w-12 text-center font-display font-bold text-white text-lg">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 rounded-xl bg-surface border border-primary/20 flex items-center justify-center text-white hover:bg-surface-light hover:border-primary/40 transition-all"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`w-full rounded-2xl py-4 px-8 font-heading font-bold text-lg uppercase tracking-wide transition-all duration-300 ${
                product.inStock
                  ? "bg-primary text-white hover:bg-primary-hover shadow-[0_0_30px_rgba(123,44,191,0.4)] hover:shadow-[0_0_50px_rgba(123,44,191,0.6)]"
                  : "bg-surface-light text-text-secondary cursor-not-allowed border border-primary/10"
              }`}
            >
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </button>

            {/* Warranty Badge */}
            {product.warranty && product.warranty !== "N/A" && (
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-surface border border-primary/10">
                <span className="text-3xl">🛡️</span>
                <div>
                  <span className="block font-heading font-bold text-white text-sm uppercase tracking-wider">
                    Warranty
                  </span>
                  <span className="text-text-secondary text-sm">{product.warranty}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mb-16">
          <div className="flex flex-wrap gap-3 mb-8">
            <TabButton active={activeTab === "specs"} onClick={() => setActiveTab("specs")}>
              Specifications
            </TabButton>
            <TabButton active={activeTab === "description"} onClick={() => setActiveTab("description")}>
              Description
            </TabButton>
            <TabButton active={activeTab === "warranty"} onClick={() => setActiveTab("warranty")}>
              Warranty
            </TabButton>
          </div>

          <div className="bg-surface rounded-3xl border border-primary/10 p-6 sm:p-8">
            {activeTab === "specs" && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <tbody>
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <tr key={key} className="border-b border-primary/10 last:border-0">
                        <td className="py-4 pr-6 font-heading font-bold text-primary uppercase text-sm tracking-wider whitespace-nowrap">
                          {key}
                        </td>
                        <td className="py-4 text-text-secondary">{String(value)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "description" && (
              <div className="prose prose-invert max-w-none">
                <p className="text-text-secondary text-base leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            )}

            {activeTab === "warranty" && (
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-6 rounded-2xl bg-surface-light border border-primary/10">
                  <span className="text-4xl">🛡️</span>
                  <div>
                    <h3 className="font-heading font-bold text-white text-lg mb-2">
                      Warranty Information
                    </h3>
                    <p className="text-text-secondary">
                      {product.warranty === "N/A"
                        ? "This product does not come with a manufacturer warranty. Please contact the store for more information."
                        : product.warranty}
                    </p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-surface-light border border-primary/10 text-center">
                    <span className="block font-display font-bold text-2xl text-white">✓</span>
                    <span className="text-xs text-text-secondary mt-1 block">Genuine Product</span>
                  </div>
                  <div className="p-4 rounded-xl bg-surface-light border border-primary/10 text-center">
                    <span className="block font-display font-bold text-2xl text-white">✓</span>
                    <span className="text-xs text-text-secondary mt-1 block">Authorized Dealer</span>
                  </div>
                  <div className="p-4 rounded-xl bg-surface-light border border-primary/10 text-center">
                    <span className="block font-display font-bold text-2xl text-white">✓</span>
                    <span className="text-xs text-text-secondary mt-1 block">Easy Claim Process</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mb-20">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  RELATED PRODUCTS
                </h2>
                <p className="mt-2 text-text-secondary">
                  You might also like these products from the same category
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Sticky Add to Cart - Mobile */}
      {product.inStock && (
        <div className="fixed bottom-0 left-0 right-0 lg:hidden z-50 p-4 bg-surface/90 backdrop-blur-lg border-t border-primary/10">
          <div className="flex items-center gap-4 max-w-7xl mx-auto">
            <div className="flex-1">
              <span className="block font-display font-bold text-xl text-white">
                NPR {product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-text-secondary line-through">
                  NPR {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-1 rounded-xl bg-primary py-3.5 font-heading font-bold text-white uppercase tracking-wide hover:bg-primary-hover transition-all shadow-[0_0_20px_rgba(123,44,191,0.4)]"
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
