import React from "react";
import Link from "next/link";
import { BRAND } from "@/config/brand";
import { Button } from "@/components/ui/Button";

export default function NosotrosPage() {
  return (
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <div className="max-w-3xl space-y-4">
        <div className="text-xs uppercase font-bold tracking-widest text-valli-clay">
          NOSOTROS
        </div>
        <h1 className="text-4xl sm:text-6xl font-display font-medium text-valli-ink leading-[1.1]">
          {BRAND.name}
        </h1>
        <p className="text-xl font-display italic text-valli-clay">
          {BRAND.tagline}
        </p>
        <p className="text-base text-valli-stone leading-relaxed">
          {BRAND.positioning}. Desarrollamos la infraestructura que conecta productos con arraigo y calidad superior directamente con los profesionales de la gastronomía y comercios de todo México.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-valli-sand/40">
        <div className="p-6 bg-valli-white rounded-lg border border-valli-sand/40 space-y-2">
          <h3 className="text-lg font-display font-medium text-valli-ink">Precisión</h3>
          <p className="text-xs text-valli-stone leading-relaxed">
            Gramajes exactos, frescura controlada y especificaciones claras para cada entrega.
          </p>
        </div>

        <div className="p-6 bg-valli-white rounded-lg border border-valli-sand/40 space-y-2">
          <h3 className="text-lg font-display font-medium text-valli-ink">Selección</h3>
          <p className="text-xs text-valli-stone leading-relaxed">
            Solo productos con valor diferencial y potencial comercial real.
          </p>
        </div>

        <div className="p-6 bg-valli-white rounded-lg border border-valli-sand/40 space-y-2">
          <h3 className="text-lg font-display font-medium text-valli-ink">Confianza</h3>
          <p className="text-xs text-valli-stone leading-relaxed">
            Suministro continuo y comunicación directa sin fricción.
          </p>
        </div>
      </div>

      <div className="pt-8">
        <Link href="/productos">
          <Button variant="primary" size="lg">
            Explorar catálogo
          </Button>
        </Link>
      </div>
    </div>
  );
}
