"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import ProductCard from "@/components/product/ProductCard";
import { products, categories, Product } from "@/data/products";

type SortOption = "price-asc" | "price-desc" | "rating" | "newest";

export default function CatalogPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState<string>("");
  const [priceMax, setPriceMax] = useState<string>("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const brands = useMemo(() => {
    const uniqueBrands = Array.from(new Set(products.map((p) => p.brand))).sort();
    return uniqueBrands;
  }, []);

  const minProductPrice = Math.min(...products.map((p) => p.price));
  const maxProductPrice = Math.max(...products.map((p) => p.price));

  useEffect(() => {
    const category = searchParams.get("category") || "";
    const brands = searchParams.get("brands")?.split(",").filter(Boolean) || [];
    const min = searchParams.get("minPrice") || "";
    const max = searchParams.get("maxPrice") || "";
    const stock = searchParams.get("inStock") === "true";
    const sort = (searchParams.get("sort") as SortOption) || "newest";

    setSelectedCategory(category);
    setSelectedBrands(brands);
    setPriceMin(min);
    setPriceMax(max);
    setInStockOnly(stock);
    setSortBy(sort);
  }, [searchParams]);

  const updateURL = (params: Record<string, string | string[] | boolean>) => {
    const newParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.length > 0) newParams.set(key, value.join(","));
      } else if (value !== "" && value !== false && value !== "newest") {
        newParams.set(key, String(value));
      }
    });

    const queryString = newParams.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  };

  const handleCategoryChange = (categoryId: string) => {
    const newCategory = selectedCategory === categoryId ? "" : categoryId;
    setSelectedCategory(newCategory);
    updateURL({
      category: newCategory,
      brands: selectedBrands,
      minPrice: priceMin,
      maxPrice: priceMax,
      inStock: inStockOnly,
      sort: sortBy,
    });
  };

  const handleBrandToggle = (brand: string) => {
    const newBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];
    setSelectedBrands(newBrands);
    updateURL({
      category: selectedCategory,
      brands: newBrands,
      minPrice: priceMin,
      maxPrice: priceMax,
      inStock: inStockOnly,
      sort: sortBy,
    });
  };

  const handlePriceChange = (type: "min" | "max", value: string) => {
    if (type === "min") setPriceMin(value);
    else setPriceMax(value);
  };

  const applyPriceFilter = () => {
    updateURL({
      category: selectedCategory,
      brands: selectedBrands,
      minPrice: priceMin,
      maxPrice: priceMax,
      inStock: inStockOnly,
      sort: sortBy,
    });
  };

  const handleInStockToggle = () => {
    const newValue = !inStockOnly;
    setInStockOnly(newValue);
    updateURL({
      category: selectedCategory,
      brands: selectedBrands,
      minPrice: priceMin,
      maxPrice: priceMax,
      inStock: newValue,
      sort: sortBy,
    });
  };

  const handleSortChange = (value: SortOption) => {
    setSortBy(value);
    updateURL({
      category: selectedCategory,
      brands: selectedBrands,
      minPrice: priceMin,
      maxPrice: priceMax,
      inStock: inStockOnly,
      sort: value,
    });
  };

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedBrands([]);
    setPriceMin("");
    setPriceMax("");
    setInStockOnly(false);
    setSortBy("newest");
    router.push(pathname);
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }

    if (priceMin) {
      result = result.filter((p) => p.price >= Number(priceMin));
    }

    if (priceMax) {
      result = result.filter((p) => p.price <= Number(priceMax));
    }

    if (inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.reverse();
        break;
    }

    return result;
  }, [selectedCategory, selectedBrands, priceMin, priceMax, inStockOnly, sortBy]);

  const activeFilterCount =
    (selectedCategory ? 1 : 0) +
    selectedBrands.length +
    (priceMin || priceMax ? 1 : 0) +
    (inStockOnly ? 1 : 0);

  const FilterSidebar = () => (
    <div className="space-y-8">
      <div>
        <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-white mb-4">
          Categories
        </h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? "bg-primary/20 text-primary border border-primary/40"
                  : "text-text-secondary hover:text-white hover:bg-surface-light border border-transparent"
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-white mb-4">
          Brand
        </h3>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
          {brands.map((brand) => (
            <label
              key={brand}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="relative">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleBrandToggle(brand)}
                  className="peer sr-only"
                />
                <div className="h-4 w-4 rounded border border-primary/30 bg-surface peer-checked:bg-primary peer-checked:border-primary transition-all" />
                <svg
                  className="absolute top-0.5 left-0.5 h-3 w-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm text-text-secondary group-hover:text-white transition-colors">
                {brand}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-white mb-4">
          Price Range (NPR)
        </h3>
        <div className="flex items-center gap-2 mb-3">
          <input
            type="number"
            value={priceMin}
            onChange={(e) => handlePriceChange("min", e.target.value)}
            placeholder={minProductPrice.toLocaleString()}
            className="w-full rounded-lg bg-surface border border-primary/20 px-3 py-2 text-sm text-white placeholder:text-text-secondary/50 focus:border-primary focus:outline-none transition-colors"
          />
          <span className="text-text-secondary">-</span>
          <input
            type="number"
            value={priceMax}
            onChange={(e) => handlePriceChange("max", e.target.value)}
            placeholder={maxProductPrice.toLocaleString()}
            className="w-full rounded-lg bg-surface border border-primary/20 px-3 py-2 text-sm text-white placeholder:text-text-secondary/50 focus:border-primary focus:outline-none transition-colors"
          />
        </div>
        <button
          onClick={applyPriceFilter}
          className="w-full rounded-lg bg-primary/20 border border-primary/40 px-3 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-white transition-all"
        >
          Apply
        </button>
      </div>

      <div>
        <label className="flex items-center gap-3 cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={handleInStockToggle}
              className="peer sr-only"
            />
            <div className="h-5 w-9 rounded-full bg-surface peer-checked:bg-primary transition-all border border-primary/20 peer-checked:border-primary" />
            <div className="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-all peer-checked:translate-x-4 shadow" />
          </div>
          <span className="text-sm font-medium text-text-secondary peer-checked:text-white transition-colors">
            In Stock Only
          </span>
        </label>
      </div>

      {activeFilterCount > 0 && (
        <button
          onClick={clearFilters}
          className="w-full rounded-lg border border-red-500/30 px-3 py-2 text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all"
        >
          Clear All Filters ({activeFilterCount})
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight">
              SHOP ALL PRODUCTS
            </h1>
            <p className="mt-2 text-text-secondary">
              {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} found
              {activeFilterCount > 0 && (
                <span className="text-primary"> ({activeFilterCount} filter{activeFilterCount !== 1 ? "s" : ""} active)</span>
              )}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden flex items-center gap-2 rounded-lg bg-surface border border-primary/20 px-4 py-2 text-sm font-medium text-white hover:bg-surface-light transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5" />
              </svg>
              Filters
              {activeFilterCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value as SortOption)}
              className="rounded-lg bg-surface border border-primary/20 px-4 py-2 text-sm font-medium text-white focus:border-primary focus:outline-none transition-colors cursor-pointer"
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        <div className="flex gap-8">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 rounded-2xl bg-surface border border-primary/10 p-6">
              <FilterSidebar />
            </div>
          </aside>

          <main className="flex-1">
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                {selectedCategory && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/30 px-3 py-1 text-xs font-medium text-primary">
                    {categories.find((c) => c.id === selectedCategory)?.icon}
                    {categories.find((c) => c.id === selectedCategory)?.name}
                    <button
                      onClick={() => handleCategoryChange(selectedCategory)}
                      className="hover:text-white transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-3 w-3"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                )}
                {selectedBrands.map((brand) => (
                  <span
                    key={brand}
                    className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/30 px-3 py-1 text-xs font-medium text-primary"
                  >
                    {brand}
                    <button
                      onClick={() => handleBrandToggle(brand)}
                      className="hover:text-white transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-3 w-3"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
                {(priceMin || priceMax) && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/30 px-3 py-1 text-xs font-medium text-primary">
                    NPR {priceMin || "0"} - {priceMax || maxProductPrice.toLocaleString()}
                    <button
                      onClick={() => {
                        setPriceMin("");
                        setPriceMax("");
                        updateURL({
                          category: selectedCategory,
                          brands: selectedBrands,
                          minPrice: "",
                          maxPrice: "",
                          inStock: inStockOnly,
                          sort: sortBy,
                        });
                      }}
                      className="hover:text-white transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-3 w-3"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                )}
                {inStockOnly && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/30 px-3 py-1 text-xs font-medium text-primary">
                    In Stock Only
                    <button
                      onClick={handleInStockToggle}
                      className="hover:text-white transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-3 w-3"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                )}
              </div>
            )}

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="text-6xl mb-4 opacity-20">🔍</div>
                <h3 className="font-heading font-bold text-xl text-white mb-2">
                  No products found
                </h3>
                <p className="text-text-secondary mb-6 max-w-md">
                  Try adjusting your filters or browse all our products to find what you&apos;re looking for.
                </p>
                <button
                  onClick={clearFilters}
                  className="rounded-xl bg-primary px-6 py-3 font-heading font-bold text-white uppercase tracking-wide hover:bg-primary-hover transition-colors shadow-[0_0_20px_rgba(123,44,191,0.3)]"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-80 max-w-[85vw] bg-background border-r border-primary/20 shadow-2xl transform transition-transform duration-300 ease-out">
            <div className="flex items-center justify-between p-4 border-b border-primary/10">
              <h2 className="font-display font-bold text-lg text-white">Filters</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="rounded-lg p-2 text-text-secondary hover:text-white hover:bg-surface-light transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 overflow-y-auto h-[calc(100%-64px)]">
              <FilterSidebar />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
