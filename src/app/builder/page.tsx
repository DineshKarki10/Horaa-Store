"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { pcComponents, PCComponent, categories } from "@/data/products";

type ComponentCategory = "cpu" | "motherboard" | "gpu" | "ram" | "storage" | "psu" | "cooler" | "case";

const categoryLabels: Record<ComponentCategory, string> = {
  cpu: "CPU",
  motherboard: "Motherboard",
  gpu: "Graphics Card",
  ram: "RAM",
  storage: "Storage",
  psu: "Power Supply",
  cooler: "CPU Cooler",
  case: "Case",
};

const categoryDescriptions: Record<ComponentCategory, string> = {
  cpu: "Choose your processor - the brain of your rig",
  motherboard: "Select a motherboard compatible with your CPU",
  gpu: "Pick your graphics card for gaming performance",
  ram: "Memory for multitasking and gaming",
  storage: "Fast NVMe storage for your OS and games",
  psu: "Reliable power supply - must support total wattage",
  cooler: "Keep your CPU cool under pressure",
  case: "The final piece - style and airflow",
};

export default function BuilderPage() {
  const [selectedComponents, setSelectedComponents] = useState<Record<ComponentCategory, PCComponent | null>>({
    cpu: null,
    motherboard: null,
    gpu: null,
    ram: null,
    storage: null,
    psu: null,
    cooler: null,
    case: null,
  });
  const [activeStep, setActiveStep] = useState<ComponentCategory>("cpu");
  const { addItem, toggleCart } = useCart();

  const steps: ComponentCategory[] = ["cpu", "motherboard", "gpu", "ram", "storage", "psu", "cooler", "case"];

  const currentStepIndex = steps.indexOf(activeStep);

  const compatibilityWarnings = useMemo(() => {
    const warnings: string[] = [];
    const cpu = selectedComponents.cpu;
    const mb = selectedComponents.motherboard;
    const psu = selectedComponents.psu;

    if (cpu && mb) {
      if (cpu.specifications.socket && mb.specifications.socket && cpu.specifications.socket !== mb.specifications.socket) {
        warnings.push(`Socket mismatch: CPU uses ${cpu.specifications.socket}, but motherboard has ${mb.specifications.socket}`);
      }
    }

    const totalWattage =
      (cpu?.specifications.tdp ? Number(cpu.specifications.tdp) * 1.2 : 0) +
      (selectedComponents.gpu?.specifications.wattage ? Number(selectedComponents.gpu.specifications.wattage) : 0) +
      100;

    if (psu && psu.specifications.wattage && totalWattage > psu.specifications.wattage) {
      warnings.push(`PSU wattage insufficient: System draws ~${Math.round(totalWattage)}W, but PSU is only ${psu.specifications.wattage}W`);
    }

    return warnings;
  }, [selectedComponents]);

  const totalPrice = useMemo(() => {
    return Object.values(selectedComponents).reduce((sum, comp) => sum + (comp?.price || 0), 0);
  }, [selectedComponents]);

  const totalWattage = useMemo(() => {
    const cpu = selectedComponents.cpu;
    const baseLoad = 100;
    const cpuWattage = cpu?.specifications.tdp ? Math.round(Number(cpu.specifications.tdp) * 1.2) : 0;
    const gpuWattage = selectedComponents.gpu?.specifications.wattage || 0;
    const psuHeadroom = selectedComponents.psu?.specifications.wattage || 0;
    return {
      estimated: cpuWattage + gpuWattage + baseLoad,
      psuCapacity: psuHeadroom,
    };
  }, [selectedComponents]);

  const handleSelectComponent = (component: PCComponent) => {
    setSelectedComponents((prev) => ({ ...prev, [component.category]: component }));
    const currentIndex = steps.indexOf(component.category);
    if (currentIndex < steps.length - 1) {
      setActiveStep(steps[currentIndex + 1]);
    }
  };

  const handleClearBuild = () => {
    setSelectedComponents({
      cpu: null,
      motherboard: null,
      gpu: null,
      ram: null,
      storage: null,
      psu: null,
      cooler: null,
      case: null,
    });
    setActiveStep("cpu");
  };

  const handleAddToCart = () => {
    const buildName = `Custom Rig - ${selectedComponents.cpu?.name || "Custom Build"}`;
    const buildId = `build-${Date.now()}`;
    const components = Object.values(selectedComponents).filter((c): c is PCComponent => c !== null);

    addItem({
      id: buildId,
      type: "pc-build",
      name: buildName,
      price: totalPrice,
      image: selectedComponents.cpu?.image || "/images/products/pc-1.jpg",
      quantity: 1,
      components,
      specifications: {
        "Total Price": `NPR ${totalPrice.toLocaleString()}`,
        "Estimated Wattage": `${totalWattage.estimated}W`,
        "PSU Capacity": `${totalWattage.psuCapacity}W`,
      },
    });
    toggleCart();
  };

  const isComplete = Object.values(selectedComponents).every((c) => c !== null);
  const selectedCount = Object.values(selectedComponents).filter((c) => c !== null).length;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            RIG BUILDER
          </h1>
          <p className="mt-4 text-text-secondary max-w-2xl mx-auto text-lg">
            Build your dream gaming PC with real-time compatibility checks and instant NPR pricing.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {steps.map((step, index) => (
                  <div key={step} className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveStep(step)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-heading font-medium whitespace-nowrap transition-all ${
                        activeStep === step
                          ? "bg-primary text-white shadow-[0_0_20px_rgba(123,44,191,0.4)]"
                          : selectedComponents[step]
                          ? "bg-primary/20 text-primary border border-primary/30"
                          : "bg-surface text-text-secondary border border-primary/10 hover:border-primary/30"
                      }`}
                    >
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-current text-[10px] font-bold">
                        {selectedComponents[step] ? "✓" : index + 1}
                      </span>
                      {categoryLabels[step]}
                    </button>
                    {index < steps.length - 1 && (
                      <svg className="h-4 w-4 text-primary/30 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={handleClearBuild}
                className="text-xs font-medium text-red-400 hover:text-red-300 transition-colors whitespace-nowrap"
              >
                Clear All
              </button>
            </div>

            <div className="mb-6">
              <h2 className="font-heading text-xl font-bold text-white mb-2">
                {categoryLabels[activeStep]}
              </h2>
              <p className="text-sm text-text-secondary">{categoryDescriptions[activeStep]}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {pcComponents
                .filter((c) => c.category === activeStep)
                .map((component) => {
                  const isSelected = selectedComponents[activeStep]?.id === component.id;
                  return (
                    <button
                      key={component.id}
                      onClick={() => handleSelectComponent(component)}
                      className={`text-left rounded-2xl border p-4 transition-all duration-300 ${
                        isSelected
                          ? "bg-primary/10 border-primary shadow-[0_0_30px_rgba(123,44,191,0.2)]"
                          : "bg-surface border-primary/10 hover:border-primary/40 hover:shadow-[0_0_20px_rgba(123,44,191,0.1)]"
                      }`}
                    >
                      <div className="relative h-40 bg-surface-light rounded-xl mb-4 overflow-hidden">
                        <Image
                          src={component.image}
                          alt={component.name}
                          fill
                          className="object-cover"
                        />
                        {isSelected && (
                          <div className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <h3 className="font-heading font-semibold text-white text-sm mb-1">{component.name}</h3>
                      <p className="text-xs text-text-secondary mb-3">{component.brand}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {Object.entries(component.specifications)
                          .slice(0, 3)
                          .map(([key, val]) => (
                            <span key={key} className="px-2 py-0.5 rounded bg-surface-light text-[10px] text-text-secondary">
                              {key}: {String(val)}
                            </span>
                          ))}
                      </div>
                      <p className="font-display font-bold text-primary">NPR {component.price.toLocaleString()}</p>
                    </button>
                  );
                })}
            </div>
          </div>

          <div className="lg:w-80 flex-shrink-0">
            <div className="lg:sticky lg:top-24 space-y-6">
              <div className="rounded-2xl bg-surface border border-primary/10 p-6">
                <h3 className="font-display text-xl font-bold text-white mb-4">
                  Build Summary ({selectedCount}/8)
                </h3>
                <div className="space-y-3 mb-6">
                  {steps.map((step) => {
                    const component = selectedComponents[step];
                    return (
                      <div
                        key={step}
                        className={`flex items-center justify-between p-3 rounded-xl border ${
                          component
                            ? "bg-surface-light border-primary/20"
                            : "bg-surface border-primary/10 border-dashed"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-medium text-text-secondary uppercase tracking-wider w-20">
                            {categoryLabels[step]}
                          </span>
                          {component ? (
                            <span className="text-sm text-white font-medium">{component.name}</span>
                          ) : (
                            <span className="text-sm text-text-secondary/50 italic">Not selected</span>
                          )}
                        </div>
                        {component && (
                          <span className="text-sm font-display font-bold text-primary">
                            NPR {component.price.toLocaleString()}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-primary/10 pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Estimated Wattage</span>
                    <span className={`font-medium ${totalWattage.estimated > (totalWattage.psuCapacity || 9999) ? "text-red-400" : "text-white"}`}>
                      {totalWattage.estimated}W
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">PSU Capacity</span>
                    <span className="font-medium text-white">
                      {totalWattage.psuCapacity ? `${totalWattage.psuCapacity}W` : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-primary/10">
                    <span className="font-heading font-bold text-white uppercase tracking-wide">Total</span>
                    <span className="font-display text-2xl font-black text-primary text-glow">
                      NPR {totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                {compatibilityWarnings.length > 0 && (
                  <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                    <div className="flex items-start gap-2">
                      <svg className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                      </svg>
                      <div>
                        <h4 className="text-sm font-bold text-red-400 mb-1">Compatibility Warnings</h4>
                        <ul className="space-y-1">
                          {compatibilityWarnings.map((warning, index) => (
                            <li key={index} className="text-xs text-red-300">{warning}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {isComplete && compatibilityWarnings.length === 0 && (
                  <div className="mt-4 p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                    <div className="flex items-center gap-2">
                      <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm font-medium text-green-400">Build is compatible!</span>
                    </div>
                  </div>
                )}

                <div className="mt-6 space-y-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={!isComplete || compatibilityWarnings.length > 0}
                    className="w-full rounded-xl bg-primary py-4 font-heading font-bold text-white uppercase tracking-wide hover:bg-primary-hover transition-all shadow-[0_0_30px_rgba(123,44,191,0.4)] hover:shadow-[0_0_50px_rgba(123,44,191,0.6)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-[0_0_30px_rgba(123,44,191,0.4)]"
                  >
                    Add Build to Cart
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
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
