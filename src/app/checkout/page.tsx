"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/services/pricing.service";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, ShieldCheck, Truck, ArrowLeft } from "lucide-react";
import { BRAND } from "@/config/brand";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, totalSavings, clearCart, orderItems, hasWholesaleItems } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    notes: "",
  });

  if (items.length === 0 && !submitted) {
    return (
      <div className="py-20 max-w-xl mx-auto text-center px-4">
        <h2 className="text-2xl font-display font-medium text-valli-ink mb-4">
          Tu carrito está vacío
        </h2>
        <Link href="/productos">
          <Button variant="primary" size="md">
            Ver catálogo
          </Button>
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    clearCart();
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link
          href="/productos"
          className="inline-flex items-center text-xs font-semibold text-valli-stone hover:text-valli-ink"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          <span>Volver al catálogo</span>
        </Link>
      </div>

      {submitted ? (
        <div className="max-w-2xl mx-auto bg-valli-white p-8 sm:p-12 rounded-xl border border-valli-sand/60 text-center space-y-4">
          <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto" />
          <h1 className="text-3xl font-display font-medium text-valli-ink">
            Pedido recibido con éxito
          </h1>
          <p className="text-sm text-valli-stone max-w-md mx-auto">
            Hemos registrado tu orden en el sistema de distribución de {BRAND.name}. En breve recibirás la confirmación y fecha estimada de entrega a tu correo <strong>{formData.email}</strong>.
          </p>
          <div className="pt-6">
            <Link href="/productos">
              <Button variant="primary" size="md">
                Regresar al catálogo
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-7 bg-valli-white p-6 sm:p-8 rounded-xl border border-valli-sand/60 space-y-6">
            <div>
              <div className="text-xs uppercase font-bold tracking-wider text-valli-clay mb-1">
                FINALIZAR PEDIDO
              </div>
              <h2 className="text-2xl font-display font-medium text-valli-ink">
                Datos de entrega y facturación
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-valli-ink uppercase tracking-wider mb-1">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-valli-bone/40 border border-valli-sand rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-valli-clay"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-valli-ink uppercase tracking-wider mb-1">
                    Negocio / Razón Social (Opcional)
                  </label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="Para clientes de mayoreo o factura"
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
                    className="w-full bg-valli-bone/40 border border-valli-sand rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-valli-clay"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-valli-ink uppercase tracking-wider mb-1">
                  Dirección de entrega (Calle, Número, Colonia) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  className="w-full bg-valli-bone/40 border border-valli-sand rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-valli-clay"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-valli-ink uppercase tracking-wider mb-1">
                    Ciudad *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-valli-bone/40 border border-valli-sand rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-valli-clay"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-valli-ink uppercase tracking-wider mb-1">
                    Estado *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-valli-bone/40 border border-valli-sand rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-valli-clay"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-valli-ink uppercase tracking-wider mb-1">
                    C.P. *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full bg-valli-bone/40 border border-valli-sand rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-valli-clay"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-valli-ink uppercase tracking-wider mb-1">
                  Notas de entrega u horarios especiales
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Ej. Recibir en área de cocina entre 9am y 12pm..."
                  className="w-full bg-valli-bone/40 border border-valli-sand rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-valli-clay"
                />
              </div>

              <div className="pt-4">
                <Button type="submit" variant="primary" size="lg" fullWidth>
                  Confirmar y solicitar pedido
                </Button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-valli-white p-6 rounded-xl border border-valli-sand/60 space-y-4">
              <h3 className="text-lg font-display font-medium text-valli-ink border-b border-valli-sand/40 pb-3">
                Resumen de compra
              </h3>

              <div className="divide-y divide-valli-sand/30 max-h-80 overflow-y-auto">
                {orderItems.map((item, idx) => (
                  <div key={idx} className="py-3 flex justify-between items-center text-xs">
                    <div>
                      <div className="font-semibold text-valli-ink">{item.name}</div>
                      <div className="text-valli-stone">
                        {item.quantity} × {formatCurrency(item.unitPrice)}
                        {item.pricingType === "wholesale" && (
                          <span className="text-emerald-700 font-bold ml-1">(Mayoreo)</span>
                        )}
                      </div>
                    </div>
                    <div className="font-bold text-valli-ink">
                      {formatCurrency(item.lineRevenue)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-valli-sand/40 space-y-2 text-xs">
                {totalSavings > 0 && (
                  <div className="flex justify-between text-emerald-800 font-semibold bg-emerald-50 p-2 rounded">
                    <span>Ahorro por mayoreo</span>
                    <span>-{formatCurrency(totalSavings)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-valli-ink pt-2">
                  <span>Total estimado</span>
                  <span>{formatCurrency(subtotal)} MXN</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-valli-sand/20 rounded-lg border border-valli-sand/50 text-xs text-valli-ink/80 space-y-2">
              <div className="flex items-center space-x-2 font-semibold">
                <Truck className="w-4 h-4 text-valli-clay" />
                <span>Cadena de frío y entrega profesional</span>
              </div>
              <p className="text-valli-stone leading-relaxed">
                Nuestros productos viajan con control térmico para garantizar la frescura desde el origen hasta tu puerta o negocio.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
