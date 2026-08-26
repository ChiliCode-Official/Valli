import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { BRAND } from "@/config/brand";

export default function OrigenPage() {
  return (
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      {/* Hero Origen */}
      <div className="max-w-3xl space-y-4">
        <div className="text-xs uppercase font-bold tracking-widest text-valli-clay">
          FILOSOFÍA DE SOURCING
        </div>
        <h1 className="text-4xl sm:text-6xl font-display font-medium text-valli-ink leading-[1.1]">
          La procedencia no debería ser letra pequeña.
        </h1>
        <p className="text-base sm:text-lg text-valli-stone leading-relaxed">
          Nuestra primera selección proviene de Oaxaca. Trabajamos para construir relaciones de abastecimiento que permitan ofrecer productos con origen claro, calidad consistente y disponibilidad comercial.
        </p>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-valli-sand/60 bg-valli-sand/10">
          <Image
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=1200"
            alt="Maestría y elaboración artesanal"
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-6 text-sm sm:text-base text-valli-ink/80 leading-relaxed">
          <h2 className="text-2xl sm:text-3xl font-display font-medium text-valli-ink">
            Sourcing con criterio comercial
          </h2>
          <p>
            En el mercado abundan intermediarios que encarecen el producto y complican la logística. En {BRAND.name}, seleccionamos talleres y productores consolidados, estandarizamos empaques al vacío y aseguramos una cadena de frío estricta.
          </p>
          <p>
            No buscamos un catálogo infinito de miles de referencias dispersas. Seleccionamos pocas piezas emblemáticas con alto rendimiento para el negocio restaurantero y el consumidor exigente.
          </p>
          <div className="pt-2">
            <Link href="/productos">
              <Button variant="primary" size="md">
                Ver selección de productos
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
