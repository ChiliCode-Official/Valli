"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, Plus, Minus, ArrowRight, CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatCurrency, getApplicableUnitPrice } from "@/services/pricing.service";
import { Button } from "@/components/ui/Button";

export default function CartDrawer() {
  const {
    isOpen,
    closeCart,
    items,
    updateQuantity,
    removeItem,
    subtotal,
    totalSavings,
    totalItemsCount,
  } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-valli-ink/60 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-valli-bone text-valli-ink shadow-2xl flex flex-col border-l border-valli-sand/40">
          {/* Header */}
          <div className="p-6 border-b border-valli-sand/40 flex items-center justify-between">
            <div className="flex items-baseline space-x-2">
              <h2 className="text-xl font-display font-medium text-valli-ink">
                Tu Pedido
              </h2>
              <span className="text-xs text-valli-stone">
                ({totalItemsCount} {totalItemsCount === 1 ? "artículo" : "artículos"})
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 text-valli-stone hover:text-valli-ink rounded transition-colors"
              aria-label="Cerrar carrito"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <p className="text-base text-valli-stone mb-4">
                  Estamos preparando la siguiente selección.
                </p>
                <Link href="/productos" onClick={closeCart}>
                  <Button variant="secondary" size="sm">
                    Ver catálogo
                  </Button>
                </Link>
              </div>
            ) : (
              items.map(({ product, quantity }) => {
                const pricing = getApplicableUnitPrice(product, quantity);
                const needsMoreForWholesale =
                  product.wholesaleAvailable &&
                  product.wholesaleMinimumQuantity &&
                  quantity < product.wholesaleMinimumQuantity;
                const unitsNeeded = needsMoreForWholesale
                  ? (product.wholesaleMinimumQuantity ?? 0) - quantity
                  : 0;

                return (
                  <div
                    key={product.id}
                    className="flex space-x-4 pb-6 border-b border-valli-sand/30 last:border-0"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-20 h-20 bg-valli-sand/20 rounded overflow-hidden flex-shrink-0">
                      {product.images?.[0] ? (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-valli-stone">
                          Valli
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <h3 className="text-sm font-semibold text-valli-ink truncate">
                            {product.name}
                          </h3>
                          <button
                            onClick={() => removeItem(product.id)}
                            className="text-valli-stone hover:text-valli-wine p-1 ml-2 transition-colors"
                            title="Eliminar producto"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-valli-stone">
                          {product.origin} · {product.unit} {product.weight ? `(${product.weight} ${product.weightUnit || ""})` : ""}
                        </p>

                        {/* Wholesale Tier Indicator */}
                        {pricing.isWholesaleApplied ? (
                          <div className="mt-1 inline-flex items-center space-x-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Precio de mayoreo aplicado</span>
                          </div>
                        ) : needsMoreForWholesale ? (
                          <p className="mt-1 text-[11px] text-valli-clay">
                            Agrega {unitsNeeded} más para precio mayoreo ({formatCurrency(product.wholesalePrice)} c/u)
                          </p>
                        ) : null}
                      </div>

                      {/* Quantity and Price */}
                      <div className="flex items-center justify-between mt-3 pt-2">
                        <div className="flex items-center border border-valli-sand/80 rounded bg-valli-white">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="p-1 text-valli-stone hover:text-valli-ink"
                            aria-label="Disminuir cantidad"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2.5 text-xs font-semibold text-valli-ink">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="p-1 text-valli-stone hover:text-valli-ink"
                            aria-label="Aumentar cantidad"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="text-sm font-semibold text-valli-ink">
                            {formatCurrency(pricing.subtotal)}
                          </span>
                          <div className="text-[11px] text-valli-stone">
                            {formatCurrency(pricing.unitPrice)} c/u
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-6 border-t border-valli-sand/40 bg-valli-sand/10 space-y-4">
              {totalSavings > 0 && (
                <div className="flex items-center justify-between text-xs font-semibold text-emerald-800 bg-emerald-100/70 p-2.5 rounded">
                  <span>Ahorro por mayoreo</span>
                  <span>-{formatCurrency(totalSavings)}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-base font-semibold text-valli-ink">
                <span>Subtotal estimado</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>

              <p className="text-[11px] text-valli-stone leading-tight">
                Impuestos y costos de envío y distribución mayorista calculados al confirmar entrega.
              </p>

              <div className="space-y-2 pt-2">
                <Link href="/checkout" onClick={closeCart} className="block">
                  <Button variant="primary" fullWidth size="lg" className="flex items-center justify-center space-x-2">
                    <span>Proceder al pedido</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/productos" onClick={closeCart} className="block text-center">
                  <span className="text-xs text-valli-stone hover:text-valli-ink underline transition-colors">
                    Seguir explorando catálogo
                  </span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
