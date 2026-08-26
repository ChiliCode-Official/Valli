"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Product } from "@/types/product";
import { formatCurrency } from "@/services/pricing.service";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const isLowStock = product.stock > 0 && product.stock <= 5;
  const isOutOfStock = product.stock === 0;

  return (
    <div className="group flex flex-col bg-valli-white border border-valli-sand/40 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md hover:border-valli-sand">
      {/* Image Container */}
      <Link href={`/productos/${product.slug}`} className="relative aspect-[4/3] w-full bg-valli-sand/10 overflow-hidden block">
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-valli-stone">
            Valli
          </div>
        )}

        {/* Microcopy Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.wholesaleAvailable && (
            <span className="bg-valli-ink text-valli-bone text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-sm">
              Mayoreo disponible
            </span>
          )}
          {isLowStock && (
            <span className="bg-valli-clay text-valli-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-sm">
              Últimas unidades
            </span>
          )}
          {isOutOfStock && (
            <span className="bg-valli-wine text-valli-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-sm">
              Temporalmente agotado
            </span>
          )}
        </div>
      </Link>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Origin & Category Label */}
          <div className="text-[11px] uppercase tracking-wider font-semibold text-valli-stone mb-1">
            {product.origin.split(",")[0]} · {product.category}
          </div>

          {/* Title */}
          <Link href={`/productos/${product.slug}`}>
            <h3 className="text-lg font-medium text-valli-ink group-hover:text-valli-clay transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Short Description */}
          <p className="text-xs text-valli-stone mt-1.5 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Pricing and Action Section */}
        <div className="mt-5 pt-4 border-t border-valli-sand/30 flex items-end justify-between">
          <div>
            <div className="text-xs text-valli-stone">
              {product.weight ? `${product.weight} ${product.weightUnit || ""}` : product.unit}
            </div>
            <div className="text-base font-semibold text-valli-ink">
              {formatCurrency(product.retailPrice)} <span className="text-[10px] text-valli-stone font-normal">MXN</span>
            </div>

            {/* Wholesale Tier Notice */}
            {product.wholesaleAvailable && product.wholesaleMinimumQuantity && (
              <div className="text-[11px] text-valli-clay font-medium mt-0.5">
                Mayoreo desde {product.wholesaleMinimumQuantity} uds ({formatCurrency(product.wholesalePrice)})
              </div>
            )}
          </div>

          {/* Quick Add Button */}
          <Button
            variant="primary"
            size="sm"
            disabled={isOutOfStock}
            onClick={() => addItem(product, 1)}
            className="flex items-center space-x-1"
            title="Agregar al pedido"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Agregar</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
