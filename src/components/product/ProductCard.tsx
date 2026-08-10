import Link from "next/link";
import Image from "next/image";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="group block rounded-2xl bg-surface border border-primary/10 overflow-hidden hover:border-primary/40 hover:shadow-[0_0_30px_rgba(123,44,191,0.15)] transition-all duration-300"
    >
      <div className="relative h-48 bg-surface-light overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.originalPrice && (
          <span className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-red-500/90 text-xs font-bold text-white">
            SALE
          </span>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="font-heading font-bold text-white uppercase tracking-wide">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <span className="text-[10px] font-medium uppercase tracking-wider text-primary">
          {product.brand}
        </span>
        <h3 className="font-heading font-semibold text-white mt-1 line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 mt-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                stroke="currentColor"
                className={`h-3.5 w-3.5 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400"
                    : "text-text-secondary/30"
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
          <span className="text-xs text-text-secondary ml-1">
            ({product.reviews})
          </span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div>
            <span className="font-display font-bold text-lg text-white">
              NPR {product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="block text-xs text-text-secondary line-through">
                NPR {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <button className="rounded-xl bg-primary p-2 text-white hover:bg-primary-hover transition-colors shadow-[0_0_15px_rgba(123,44,191,0.3)]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </div>
      </div>
    </Link>
  );
}
