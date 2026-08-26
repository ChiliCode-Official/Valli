import { Product } from "@/types/product";
import { OrderItem } from "@/types/order";

/**
 * Service to centralize wholesale & retail price determination.
 * Note: In production, this same logic will be mirrored / verified in Cloud Functions.
 */
export interface PricingResult {
  unitPrice: number;
  pricingType: "retail" | "wholesale";
  isWholesaleApplied: boolean;
  savingsPerUnit: number;
  totalSavings: number;
  subtotal: number;
}

export function isWholesaleEligible(product: Product, quantity: number): boolean {
  if (!product.wholesaleAvailable) return false;
  if (product.wholesaleMinimumQuantity === null || product.wholesaleMinimumQuantity === undefined) {
    return false;
  }
  return quantity >= product.wholesaleMinimumQuantity;
}

export function getApplicableUnitPrice(product: Product, quantity: number): PricingResult {
  const isWholesale = isWholesaleEligible(product, quantity);
  const unitPrice = isWholesale ? product.wholesalePrice : product.retailPrice;
  const savingsPerUnit = isWholesale ? Math.max(0, product.retailPrice - product.wholesalePrice) : 0;
  const subtotal = unitPrice * quantity;
  const totalSavings = savingsPerUnit * quantity;

  return {
    unitPrice,
    pricingType: isWholesale ? "wholesale" : "retail",
    isWholesaleApplied: isWholesale,
    savingsPerUnit,
    totalSavings,
    subtotal,
  };
}

export function createOrderItem(product: Product, quantity: number): OrderItem {
  const pricing = getApplicableUnitPrice(product, quantity);
  const unitCost = product.costPrice || 0;
  const lineRevenue = pricing.subtotal;
  const lineCost = unitCost * quantity;

  return {
    productId: product.id,
    name: product.name,
    quantity,
    pricingType: pricing.pricingType,
    unitPrice: pricing.unitPrice,
    unitCost,
    lineRevenue,
    lineCost,
    image: product.images?.[0],
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
  }).format(amount);
}
