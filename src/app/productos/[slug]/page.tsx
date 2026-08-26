import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, PackageCheck, Truck, ShieldAlert } from "lucide-react";
import { INITIAL_PRODUCTS } from "@/data/initialProducts";
import { formatCurrency } from "@/services/pricing.service";
import ProductDetailActions from "@/components/products/ProductDetailActions";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return INITIAL_PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const product = INITIAL_PRODUCTS.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  const isLowStock = product.stock > 0 && product.stock <= 5;
  const isOutOfStock = product.stock === 0;

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back button */}
      <div className="mb-8">
        <Link
          href="/productos"
          className="inline-flex items-center text-xs font-semibold text-valli-stone hover:text-valli-ink transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1" />
          <span>Volver al catálogo</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Product Images Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-valli-sand/10 border border-valli-sand/40">
            {product.images?.[0] && (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            )}
          </div>

          {product.images.length > 1 && (
            <div className="grid grid-cols-3 gap-4">
              {product.images.slice(1).map((img, idx) => (
                <div
                  key={idx}
                  className="relative aspect-square rounded overflow-hidden bg-valli-sand/10 border border-valli-sand/40"
                >
                  <Image
                    src={img}
                    alt={`${product.name} - detalle ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="20vw"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Details & Purchase Form */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
          <div>
            {/* Header info */}
            <div className="text-xs uppercase font-bold tracking-wider text-valli-clay mb-1">
              {product.origin} · {product.category}
            </div>

            <h1 className="text-3xl sm:text-4xl font-display font-medium text-valli-ink">
              {product.name}
            </h1>

            <p className="text-sm text-valli-stone mt-1">
              Presentación: {product.unit} {product.weight ? `de ${product.weight} ${product.weightUnit || ""}` : ""}
            </p>

            {/* Price display */}
            <div className="mt-4 p-4 bg-valli-white rounded-lg border border-valli-sand/40">
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-valli-ink">
                  {formatCurrency(product.retailPrice)}
                </span>
                <span className="text-xs text-valli-stone">MXN precio unitario</span>
              </div>

              {/* Stock microcopy */}
              <div className="mt-2 text-xs">
                {isOutOfStock ? (
                  <span className="text-valli-wine font-semibold">Temporalmente agotado</span>
                ) : isLowStock ? (
                  <span className="text-valli-clay font-semibold">Últimas unidades ({product.stock} disponibles)</span>
                ) : (
                  <span className="text-emerald-700 font-medium">En stock ({product.stock} unidades)</span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mt-6 space-y-3 text-sm text-valli-ink/80 leading-relaxed border-t border-valli-sand/40 pt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-valli-stone">
                Descripción & Características
              </h3>
              <p>{product.description}</p>
            </div>

            {/* SECTION 24: SECCIÓN COMPRA POR MAYOREO */}
            {product.wholesaleAvailable && (
              <div className="mt-6 p-5 bg-valli-sand/15 rounded-lg border border-valli-sand/60 space-y-3">
                <div className="flex items-center space-x-2">
                  <PackageCheck className="w-4 h-4 text-valli-clay" />
                  <h4 className="text-xs font-bold uppercase tracking-widest text-valli-ink">
                    Compra por mayoreo
                  </h4>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-3 bg-valli-white rounded border border-valli-sand/40">
                    <div className="text-valli-stone">Precio individual</div>
                    <div className="text-sm font-bold text-valli-ink mt-0.5">
                      {formatCurrency(product.retailPrice)} MXN
                    </div>
                  </div>

                  <div className="p-3 bg-valli-white rounded border border-valli-clay/40 bg-valli-clay/5">
                    <div className="text-valli-clay font-semibold">Precio mayoreo</div>
                    <div className="text-sm font-bold text-valli-clay mt-0.5">
                      {formatCurrency(product.wholesalePrice)} MXN
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-valli-stone pt-1">
                  <span>Pedido mínimo mayoreo:</span>
                  <span className="font-bold text-valli-ink">
                    {product.wholesaleMinimumQuantity || 1} unidades
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Dynamic Add to Cart and Quantity Form */}
          <div className="border-t border-valli-sand/40 pt-6">
            <ProductDetailActions product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
