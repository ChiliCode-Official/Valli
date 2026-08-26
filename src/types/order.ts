export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  pricingType: "retail" | "wholesale";
  unitPrice: number;
  unitCost: number;
  lineRevenue: number;
  lineCost: number;
  image?: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  businessName?: string;
  isWholesaleOrder: boolean;
  items: OrderItem[];
  subtotal: number;
  totalRevenue: number;
  totalCost: number;
  grossProfit: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  createdAt: any;
  updatedAt: any;
}
