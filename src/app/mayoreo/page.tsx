"use client";

import React, { useState } from "react";
import Link from "next/link";
import { INITIAL_PRODUCTS } from "@/data/initialProducts";
import { formatCurrency } from "@/services/pricing.service";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, ShieldCheck, Truck, Building2, PhoneCall } from "lucide-react";
import { BRAND } from "@/config/brand";

export default function MayoreoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    city: "",
    businessType: "restaurante",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      {/* 1. Header Strategic Copy */}
      <div className="max-w-3xl space-y-4">
        <div className="text-xs uppercase font-bold tracking-widest text-valli-clay">
          PARA NEGOCIOS
        </div>
        <h1 className="text-4xl sm:text-6xl font-display font-medium text-valli-ink leading-[1.1]">
          Tu proveedor debería facilitarte vender, no complicarte comprar.
        </h1>
        <p className="text-base sm:text-lg text-valli-stone leading-relaxed">
          Trabajamos con restaurantes, tiendas y negocios que necesitan producto consistente, precios claros y capacidad de volver a abastecerse.
        </p>
      </div>

      {/* 2. Lista de Precios y Condiciones Mayoristas */}
      <div className="space-y-6">
        <div className="border-b border-valli-sand/40 pb-4">
          <h2 className="text-2xl font-display font-medium text-valli-ink">
            Tarifas de mayoreo por volumen
          </h2>
          <p className="text-xs text-valli-stone mt-1">
            Precios en pesos mexicanos (MXN). Entregas programadas y trazabilidad directa de origen.
          </p>
        </div>

        <div className="overflow-x-auto bg-valli-white rounded-lg border border-valli-sand/40">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-valli-sand/20 text-valli-ink font-semibold uppercase tracking-wider text-[11px] border-b border-valli-sand/40">
              <tr>
                <th className="py-3 px-4">Producto</th>
                <th className="py-3 px-4">Origen</th>
                <th className="py-3 px-4">Presentación</th>
                <th className="py-3 px-4">Precio Retail</th>
                <th className="py-3 px-4 text-valli-clay">Precio Mayoreo</th>
                <th className="py-3 px-4">Pedido Mínimo (MOQ)</th>
                <th className="py-3 px-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-valli-sand/30">
              {INITIAL_PRODUCTS.map((prod) => (
                <tr key={prod.id} className="hover:bg-valli-bone/40 transition-colors">
                  <td className="py-4 px-4 font-semibold text-valli-ink">{prod.name}</td>
                  <td className="py-4 px-4 text-valli-stone">{prod.origin}</td>
                  <td className="py-4 px-4 text-valli-stone">
                    {prod.unit} {prod.weight ? `(${prod.weight} ${prod.weightUnit || ""})` : ""}
                  </td>
                  <td className="py-4 px-4 line-through text-valli-stone">
                    {formatCurrency(prod.retailPrice)}
                  </td>
                  <td className="py-4 px-4 font-bold text-valli-clay">
                    {formatCurrency(prod.wholesalePrice)}
                  </td>
                  <td className="py-4 px-4">
                    <span className="bg-valli-sand/30 text-valli-ink font-medium px-2 py-0.5 rounded text-xs">
                      {prod.wholesaleMinimumQuantity || 1} unidades
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <Link href={`/productos/${prod.slug}`}>
                      <Button variant="outline" size="sm">
                        Ver ficha
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Formulario de Contacto Mayorista B2B */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-valli-white rounded-xl p-8 sm:p-12 border border-valli-sand/60">
        <div className="lg:col-span-5 space-y-6">
          <div className="text-xs uppercase font-bold tracking-widest text-valli-clay">
            CUENTA COMERCIAL
          </div>
          <h2 className="text-3xl font-display font-medium text-valli-ink">
            Abre una línea de abastecimiento
          </h2>
          <p className="text-sm text-valli-stone leading-relaxed">
            Si operas un restaurante, tienda gourmet o grupo gastronómico, completa este formulario para asignarte un ejecutivo de cuenta y coordinar pedidos recurrentes, muestras o logística personalizada.
          </p>

          <div className="space-y-4 pt-4 border-t border-valli-sand/40 text-xs text-valli-ink/80">
            <div className="flex items-center space-x-3">
              <Building2 className="w-4 h-4 text-valli-clay flex-shrink-0" />
              <span>Facturación inmediata CFDI 4.0 con desglose comercial.</span>
            </div>
            <div className="flex items-center space-x-3">
              <Truck className="w-4 h-4 text-valli-clay flex-shrink-0" />
              <span>Logística refrigerada con monitoreo de temperatura.</span>
            </div>
            <div className="flex items-center space-x-3">
              <PhoneCall className="w-4 h-4 text-valli-clay flex-shrink-0" />
              <span>Atención directa: {BRAND.contact.adminEmails[0]}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          {submitted ? (
            <div className="p-8 bg-emerald-50 rounded-lg border border-emerald-200 text-center space-y-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-700 mx-auto" />
              <h3 className="text-lg font-bold text-emerald-900">
                Solicitud comercial recibida
              </h3>
              <p className="text-xs text-emerald-700 max-w-md mx-auto">
                Hemos registrado tus datos. Un asesor de abastecimiento de {BRAND.name} se comunicará contigo hoy mismo.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-valli-ink uppercase tracking-wider mb-1">
                    Negocio / Restaurante *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="Ej. Restaurante Sabor de Origen"
                    className="w-full bg-valli-bone/40 border border-valli-sand rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-valli-clay"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-valli-ink uppercase tracking-wider mb-1">
                    Nombre del contacto *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    placeholder="Ej. Juan Pérez"
                    className="w-full bg-valli-bone/40 border border-valli-sand rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-valli-clay"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-valli-ink uppercase tracking-wider mb-1">
                    Correo electrónico *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="compras@negocio.com"
                    className="w-full bg-valli-bone/40 border border-valli-sand rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-valli-clay"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-valli-ink uppercase tracking-wider mb-1">
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+52 55 1234 5678"
                    className="w-full bg-valli-bone/40 border border-valli-sand rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-valli-clay"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-valli-ink uppercase tracking-wider mb-1">
                    Ciudad / Estado *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Ej. CDMX / Monterrey / Guadalajara"
                    className="w-full bg-valli-bone/40 border border-valli-sand rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-valli-clay"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-valli-ink uppercase tracking-wider mb-1">
                    Giro comercial *
                  </label>
                  <select
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    className="w-full bg-valli-bone/40 border border-valli-sand rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-valli-clay"
                  >
                    <option value="restaurante">Restaurante / Taquería / Parrilla</option>
                    <option value="tienda">Tienda Gourmet / Cremería</option>
                    <option value="distribuidor">Distribuidor / Mayorista</option>
                    <option value="catering">Catering / Eventos</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-valli-ink uppercase tracking-wider mb-1">
                  Productos de interés o volumen estimado semanal
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Ej. Requiero 30 kg de Queso Oaxaca y 20 kg de Cecina semanalmente..."
                  className="w-full bg-valli-bone/40 border border-valli-sand rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-valli-clay"
                />
              </div>

              <div className="pt-2">
                <Button type="submit" variant="primary" size="lg" fullWidth>
                  Solicitar cotización mayorista
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
