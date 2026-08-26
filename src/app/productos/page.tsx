"use client";

import React, { useState, useMemo } from "react";
import { INITIAL_PRODUCTS } from "@/data/initialProducts";
import ProductCard from "@/components/products/ProductCard";
import { ProductCategory } from "@/types/product";

const CATEGORIES: { label: string; value: ProductCategory | "todas" }[] = [
  { label: "Todo el catálogo", value: "todas" },
  { label: "Carnes artesanales", value: "carnes" },
  { label: "Quesos tradicionales", value: "quesos" },
];

export default function ProductosPage() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "todas">("todas");
  const [onlyWholesale, setOnlyWholesale] = useState(false);

  const filteredProducts = useMemo(() => {
    return INITIAL_PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === "todas" || product.category === selectedCategory;
      const matchesWholesale = !onlyWholesale || product.wholesaleAvailable;
      return matchesCategory && matchesWholesale;
    });
  }, [selectedCategory, onlyWholesale]);

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="border-b border-valli-sand/40 pb-8 mb-10">
        <div className="text-xs font-bold uppercase tracking-widest text-valli-clay mb-2">
          CATÁLOGO OFICIAL · VALLI
        </div>
        <h1 className="text-4xl sm:text-5xl font-display font-medium text-valli-ink">
          Nuestra selección.
        </h1>
        <p className="text-sm sm:text-base text-valli-stone mt-2 max-w-2xl">
          Productos elegidos por calidad, procedencia y potencial comercial. Precios para venta unitaria y condiciones para pedidos de mayoreo.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-1.5 text-xs font-semibold rounded transition-colors ${
                selectedCategory === cat.value
                  ? "bg-valli-ink text-valli-bone"
                  : "bg-valli-white text-valli-ink border border-valli-sand/60 hover:border-valli-ink"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <label className="flex items-center space-x-2 text-xs font-medium text-valli-ink cursor-pointer select-none">
          <input
            type="checkbox"
            checked={onlyWholesale}
            onChange={(e) => setOnlyWholesale(e.target.checked)}
            className="w-4 h-4 rounded text-valli-clay focus:ring-valli-clay border-valli-sand"
          />
          <span>Mostrar solo mayoreo disponible</span>
        </label>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center bg-valli-white rounded-lg border border-valli-sand/40">
          <p className="text-sm text-valli-stone">
            Estamos preparando la siguiente selección.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
