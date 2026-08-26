import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { INITIAL_PRODUCTS } from "@/data/initialProducts";
import ProductCard from "@/components/products/ProductCard";
import { Button } from "@/components/ui/Button";
import { BRAND } from "@/config/brand";

export default function HomePage() {
  const featuredProducts = INITIAL_PRODUCTS.filter((p) => p.featured);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO PRINCIPAL */}
      <section className="relative bg-valli-ink text-valli-bone py-20 lg:py-28 overflow-hidden border-b border-valli-stone/20">
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-luminosity">
          <Image
            src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=2000"
            alt="Sourcing artesanal de alimentos"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            {/* Eyebrow */}
            <div className="inline-block text-xs font-bold uppercase tracking-widest text-valli-sand bg-valli-stone/20 px-3 py-1 rounded-sm border border-valli-stone/30">
              PROVEEDOR MAYORISTA · PRODUCTO DE ORIGEN
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-normal text-valli-bone leading-[1.08] tracking-tight">
              Productos con origen. <br />
              <span className="italic">Abastecimiento que funciona.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-valli-sand/90 font-light leading-relaxed max-w-2xl">
              Valli selecciona y distribuye productos artesanales mexicanos para restaurantes, comercios y compradores que buscan calidad, consistencia y procedencia real.
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-4">
              <Link href="/productos">
                <Button variant="dark" size="lg" className="w-full sm:w-auto font-medium">
                  Ver catálogo
                </Button>
              </Link>
              <Link href="/mayoreo">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto text-valli-bone border-valli-bone/60 hover:bg-valli-bone/10"
                >
                  Comprar por mayoreo
                </Button>
              </Link>
            </div>

            {/* Microcopy */}
            <div className="pt-2 text-xs text-valli-stone flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-valli-clay inline-block" />
              <span>Primera selección disponible desde Oaxaca.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECCIÓN PRODUCTOS DESTACADOS */}
      <section className="py-20 lg:py-24 bg-valli-bone">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-valli-sand/40 pb-6">
            <div>
              <div className="text-xs uppercase font-bold tracking-widest text-valli-clay mb-2">
                CATÁLOGO DE ORIGEN
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-medium text-valli-ink">
                Nuestra selección.
              </h2>
              <p className="text-sm text-valli-stone mt-2 max-w-lg">
                Productos elegidos por calidad, procedencia y potencial comercial.
              </p>
            </div>
            <Link href="/productos" className="mt-4 md:mt-0 inline-flex items-center text-sm font-semibold text-valli-ink hover:text-valli-clay transition-colors group">
              <span>Explorar todo el catálogo</span>
              <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. PROPUESTA DE VALOR / MANIFIESTO */}
      <section className="py-20 bg-valli-white border-y border-valli-sand/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="text-xs uppercase font-bold tracking-widest text-valli-stone">
                PROPUESTA DE VALOR
              </div>
              <h3 className="text-3xl sm:text-4xl font-display text-valli-ink leading-tight">
                No necesitas otro catálogo infinito.
              </h3>
              <p className="text-lg font-display italic text-valli-clay">
                Necesitas buenos productos que puedas volver a pedir.
              </p>
              <p className="text-sm text-valli-stone leading-relaxed">
                Seleccionamos producto artesanal con potencial comercial real. Sin intermediarios innecesarios, sin adornos folklóricos que inflen costos, con origen claro y disponibilidad continua.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 bg-valli-bone rounded-lg border border-valli-sand/40 space-y-2">
                <div className="w-8 h-8 rounded bg-valli-ink text-valli-bone flex items-center justify-center font-mono text-xs font-bold">
                  01
                </div>
                <h4 className="text-base font-semibold text-valli-ink">Precisión de producto</h4>
                <p className="text-xs text-valli-stone leading-relaxed">
                  Cortes, gramajes, perfiles de grasa y curados estandarizados para integrarse sin sorpresas a tu cocina u anaquel.
                </p>
              </div>

              <div className="p-6 bg-valli-bone rounded-lg border border-valli-sand/40 space-y-2">
                <div className="w-8 h-8 rounded bg-valli-ink text-valli-bone flex items-center justify-center font-mono text-xs font-bold">
                  02
                </div>
                <h4 className="text-base font-semibold text-valli-ink">Origen transparente</h4>
                <p className="text-xs text-valli-stone leading-relaxed">
                  Procedencia directa de valles y regiones productoras con trazabilidad garantizada desde el productor.
                </p>
              </div>

              <div className="p-6 bg-valli-bone rounded-lg border border-valli-sand/40 space-y-2">
                <div className="w-8 h-8 rounded bg-valli-ink text-valli-bone flex items-center justify-center font-mono text-xs font-bold">
                  03
                </div>
                <h4 className="text-base font-semibold text-valli-ink">Precios por volumen</h4>
                <p className="text-xs text-valli-stone leading-relaxed">
                  Escalas de precios transparentes y márgenes de ganancia competitivos diseñados para negocios gastronómicos.
                </p>
              </div>

              <div className="p-6 bg-valli-bone rounded-lg border border-valli-sand/40 space-y-2">
                <div className="w-8 h-8 rounded bg-valli-ink text-valli-bone flex items-center justify-center font-mono text-xs font-bold">
                  04
                </div>
                <h4 className="text-base font-semibold text-valli-ink">Abastecimiento seguro</h4>
                <p className="text-xs text-valli-stone leading-relaxed">
                  Capacidad de surtir pedidos recurrentes con inventarios controlados y logística de cadena fría confiable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECCIÓN MAYOREO (B2B ESTRATÉGICA) */}
      <section className="py-24 bg-valli-bone border-b border-valli-sand/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-valli-sand/20 rounded-xl p-8 sm:p-12 lg:p-16 border border-valli-sand/60">
            <div className="max-w-3xl space-y-6">
              <div className="text-xs uppercase font-bold tracking-widest text-valli-clay">
                PARA NEGOCIOS
              </div>

              <h2 className="text-3xl sm:text-5xl font-display font-medium text-valli-ink leading-tight">
                Tu proveedor debería facilitarte vender, no complicarte comprar.
              </h2>

              <p className="text-base sm:text-lg text-valli-stone leading-relaxed">
                Trabajamos con restaurantes, tiendas y negocios que necesitan producto consistente, precios claros y capacidad de volver a abastecerse.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 border-t border-valli-sand/40">
                <div>
                  <div className="text-xs text-valli-stone font-semibold uppercase">Enfoque</div>
                  <div className="text-sm font-bold text-valli-ink mt-0.5">B2B & Gastronómico</div>
                </div>
                <div>
                  <div className="text-xs text-valli-stone font-semibold uppercase">Mínimos (MOQ)</div>
                  <div className="text-sm font-bold text-valli-ink mt-0.5">Desde 5 a 10 kg / uds</div>
                </div>
                <div>
                  <div className="text-xs text-valli-stone font-semibold uppercase">Cobertura</div>
                  <div className="text-sm font-bold text-valli-ink mt-0.5">República Mexicana</div>
                </div>
                <div>
                  <div className="text-xs text-valli-stone font-semibold uppercase">Facturación</div>
                  <div className="text-sm font-bold text-valli-ink mt-0.5">CFDI 4.0 inmediata</div>
                </div>
              </div>

              <div className="pt-4">
                <Link href="/mayoreo">
                  <Button variant="primary" size="lg">
                    Consultar precios de mayoreo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ORIGEN */}
      <section className="py-20 lg:py-24 bg-valli-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="text-xs uppercase font-bold tracking-widest text-valli-clay">
                ORIGEN
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-medium text-valli-ink leading-tight">
                La procedencia no debería ser letra pequeña.
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-valli-stone leading-relaxed">
                <p>
                  Nuestra primera selección proviene de Oaxaca.
                </p>
                <p>
                  Trabajamos para construir relaciones de abastecimiento que permitan ofrecer productos con origen claro, calidad consistente y disponibilidad comercial.
                </p>
                <p>
                  Valli no es una tienda de souvenirs. Es una infraestructura de distribución que conecta talleres y ranchos que producen con maestría con negocios que exigen excelencia en sus materias primas.
                </p>
              </div>

              <div className="pt-2">
                <Link href="/origen">
                  <Button variant="secondary" size="md">
                    Conocer nuestra filosofía de origen
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-valli-sand shadow-sm bg-valli-sand/10">
                <Image
                  src="https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&q=80&w=1200"
                  alt="Origen y elaboración artesanal"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PROCESO DE ABASTECIMIENTO */}
      <section className="py-20 bg-valli-bone border-t border-valli-sand/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <div className="text-xs uppercase font-bold tracking-widest text-valli-stone">
              CÓMO OPERAMOS
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-medium text-valli-ink">
              De origen a tu negocio.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="p-8 bg-valli-white border border-valli-sand/40 rounded-lg space-y-4">
              <div className="text-xs uppercase font-bold tracking-widest text-valli-clay">
                01 — SELECCIONAMOS
              </div>
              <h3 className="text-xl font-display font-medium text-valli-ink">
                Filtro de calidad comercial
              </h3>
              <p className="text-xs text-valli-stone leading-relaxed">
                Buscamos productos que tengan calidad y sentido comercial. Evaluamos rendimiento, conservación y estandarización de lotes.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-8 bg-valli-white border border-valli-sand/40 rounded-lg space-y-4">
              <div className="text-xs uppercase font-bold tracking-widest text-valli-clay">
                02 — ABASTECEMOS
              </div>
              <h3 className="text-xl font-display font-medium text-valli-ink">
                Gestión centralizada
              </h3>
              <p className="text-xs text-valli-stone leading-relaxed">
                Gestionamos disponibilidad y catálogo desde una sola plataforma. Consolidamos pedidos y coordinamos envíos fríos con puntualidad.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-8 bg-valli-white border border-valli-sand/40 rounded-lg space-y-4">
              <div className="text-xs uppercase font-bold tracking-widest text-valli-clay">
                03 — TÚ VENDES
              </div>
              <h3 className="text-xl font-display font-medium text-valli-ink">
                Operación sin fricción
              </h3>
              <p className="text-xs text-valli-stone leading-relaxed">
                Recibes producto listo para integrarlo a tu operación. Con margen de utilidad real y la tranquilidad de poder volver a pedir.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA B2B FINAL (ALTO CONTRASTE) */}
      <section className="py-20 lg:py-28 bg-valli-ink text-valli-bone">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-xs uppercase font-bold tracking-widest text-valli-sand">
              VALLI MAYOREO
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-medium text-valli-bone">
              ¿Necesitas producto para tu negocio?
            </h2>
            <p className="text-base sm:text-lg text-valli-sand font-light">
              Consulta nuestra selección, precios y disponibilidad de mayoreo.
            </p>
            <div className="pt-4">
              <Link href="/mayoreo">
                <Button variant="dark" size="lg" className="px-10">
                  Ver catálogo mayorista
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
