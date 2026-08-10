import { Suspense } from "react";
import CatalogClient from "./CatalogClient";

function CatalogSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="h-10 w-64 bg-surface rounded-xl animate-pulse mb-8" />
        <div className="flex gap-8">
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 rounded-2xl bg-surface border border-primary/10 p-6 space-y-6">
              <div className="h-6 w-32 bg-surface-light rounded animate-pulse" />
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-10 bg-surface-light rounded-lg animate-pulse" />
                ))}
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-2xl bg-surface border border-primary/10 overflow-hidden">
                  <div className="h-48 bg-surface-light animate-pulse" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 w-20 bg-surface-light rounded animate-pulse" />
                    <div className="h-5 w-full bg-surface-light rounded animate-pulse" />
                    <div className="h-5 w-24 bg-surface-light rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<CatalogSkeleton />}>
      <CatalogClient />
    </Suspense>
  );
}
