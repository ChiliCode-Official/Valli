export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: "carnes" | "quesos" | "salsas" | "dulces" | "bebidas" | "otros";
  origin: string;
  unit: string;
  weight?: number;
  weightUnit?: "g" | "kg" | "ml" | "l";
  retailPrice: number;
  wholesalePrice: number;
  costPrice: number;
  wholesaleMinimumQuantity: number | null;
  stock: number;
  images: string[];
  featured: boolean;
  wholesaleAvailable: boolean;
  active: boolean;
  createdAt: any;
  updatedAt: any;
}

export type ProductCategory = Product["category"];
