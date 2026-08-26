"use client";

import React, { useState } from "react";
import { Plus, Minus, CheckCircle2, ShoppingBag } from "lucide-react";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { getApplicableUnitPrice, formatCurrency } from "@/services/pricing.service";
import { Button } from "@/components/ui/Button";

interface ProductDetailActionsProps {
  product: Product;
}

export default function ProductDetailActions({ product }: ProductDetailActionsProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const pricing = getApplicableUnitPrice(product, quantity);
  const isOutOfStock = product.stock === 0;

  const handleAddToCart = () => {
    if (quantity > 0) {
      addItem(product, quantity);
    }
  };

  const handleSetWholesaleMOQ = () => {
    if (product.wholesaleMinimumQuantity) {
      setQuantity(product.wholesaleMinimumQuantity);
    }
  };

  return (
    <div className="space-y-4">
      {/* Real-time price breakdown based on selected quantity */}
      <div className="flex items-center justify-between p-3 bg-valli-white rounded border border-valli-sand/40">
        <div>
          <div className="text-xs text-valli-stone">Total estimado ({quantity} uds)</div>
          <div className="text-xl font-bold text-valli-ink">
            {formatCurrency(pricing.subtotal)}
          </div>
        </div>

        <div className="text-right">
          {pricing.isWholesaleApplied ? (
            <div className="inline-flex items-center text-xs font-semibold text-emerald-800 bg-emerald-100/80 px-2 py-1 rounded">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
              <span>Precio mayoreo aplicado ({formatCurrency(pricing.unitPrice)} c/u)</span>
            </div>
          ) : (
            <div className="text-xs text-valli-stone">
              Precio unitario: {formatCurrency(pricing.unitPrice)}
            </div>
          )}
        </div>
      </div>

      {/* Suggest wholesale MOQ shortcut */}
      {product.wholesaleAvailable &&
        product.wholesaleMinimumQuantity &&
        quantity < product.wholesaleMinimumQuantity && (
          <button
            type="button"
            onClick={handleSetWholesaleMOQ}
            className="text-xs text-valli-clay hover:underline font-medium block text-left"
          >
            → Ajustar a {product.wholesaleMinimumQuantity} unidades para obtener tarifa mayorista de {formatCurrency(product.wholesalePrice)} c/u
          </button>
        )}

      {/* Quantity & CTA */}
      <div className="flex items-center gap-4">
        {/* Quantity selector */}
        <div className="flex items-center border border-valli-sand rounded bg-valli-white h-12 px-2">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1 || isOutOfStock}
            className="p-2 text-valli-stone hover:text-valli-ink disabled:opacity-30"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-12 text-center font-bold text-sm text-valli-ink">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            disabled={isOutOfStock || quantity >= product.stock}
            className="p-2 text-valli-stone hover:text-valli-ink disabled:opacity-30"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Add Button */}
        <Button
          variant="primary"
          size="lg"
          fullWidth
          disabled={isOutOfStock}
          onClick={handleAddToCart}
          className="flex items-center justify-center space-x-2"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Agregar al pedido</span>
        </Button>
      </div>
    </div>
  );
}
