"use client";

import React, { useState } from "react";
import { INITIAL_PRODUCTS } from "@/data/initialProducts";
import { formatCurrency } from "@/services/pricing.service";
import { Product } from "@/types/product";
import {
  TrendingUp,
  Package,
  ShoppingCart,
  DollarSign,
  AlertTriangle,
  Boxes,
  PieChart,
  Shield,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import { BRAND } from "@/config/brand";
import { Button } from "@/components/ui/Button";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"resumen" | "productos" | "pedidos" | "inventario" | "metricas">("resumen");
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);

  // Mocked operational orders representing B2B wholesale vs retail mix
  const mockOrders = [
    {
      id: "ORD-8941",
      customer: "Restaurante Casa Oaxaca CDMX",
      type: "wholesale",
      items: "20kg Cecina, 30kg Queso Oaxaca",
      revenue: 11150,
      cost: 7800,
      status: "processing",
      date: "Hoy, 11:30 AM",
    },
    {
      id: "ORD-8940",
      customer: "Gourmet Condesa",
      type: "wholesale",
      items: "15kg Chorizo, 20 pzas Queso Ranchero",
      revenue: 5125,
      cost: 3525,
      status: "delivered",
      date: "Ayer",
    },
    {
      id: "ORD-8939",
      customer: "Alberto Morales",
      type: "retail",
      items: "1kg Cecina, 1kg Queso Oaxaca",
      revenue: 620,
      cost: 330,
      status: "delivered",
      date: "25 Ago",
    },
    {
      id: "ORD-8938",
      customer: "Taquería El Pastor Real",
      type: "wholesale",
      items: "25kg Cecina",
      revenue: 7375,
      cost: 5250,
      status: "pending",
      date: "25 Ago",
    },
  ];

  // Calculated Operational KPIs (Section 27 & 28)
  const totalRevenue = mockOrders.reduce((sum, o) => sum + o.revenue, 0);
  const totalCost = mockOrders.reduce((sum, o) => sum + o.cost, 0);
  const grossProfit = totalRevenue - totalCost;
  const grossMargin = totalRevenue > 0 ? (grossProfit / totalRevenue) * 100 : 0;

  const wholesaleOrders = mockOrders.filter((o) => o.type === "wholesale");
  const retailOrders = mockOrders.filter((o) => o.type === "retail");

  const wholesaleRevenue = wholesaleOrders.reduce((sum, o) => sum + o.revenue, 0);
  const retailRevenue = retailOrders.reduce((sum, o) => sum + o.revenue, 0);

  const wholesalePercentage = totalRevenue > 0 ? (wholesaleRevenue / totalRevenue) * 100 : 0;

  const avgWholesaleTicket =
    wholesaleOrders.length > 0 ? wholesaleRevenue / wholesaleOrders.length : 0;
  const avgRetailTicket =
    retailOrders.length > 0 ? retailRevenue / retailOrders.length : 0;

  const pendingOrdersCount = mockOrders.filter((o) => o.status === "pending" || o.status === "processing").length;
  const lowStockProductsCount = products.filter((p) => p.stock > 0 && p.stock <= 5).length;

  return (
    <div className="min-h-screen bg-neutral-100 text-valli-ink pb-16">
      {/* Dense Operational Header */}
      <div className="bg-valli-ink text-valli-bone border-b border-neutral-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center space-x-3">
            <span className="text-lg font-bold font-display tracking-wide">{BRAND.name}</span>
            <span className="text-neutral-500 font-light">/</span>
            <span className="text-xs uppercase tracking-widest text-neutral-300 font-semibold">
              Panel de Administración
            </span>
          </div>
          <div className="text-xs text-neutral-400">
            Operación Mayorista & Retail · {BRAND.market}
          </div>
        </div>
      </div>

      {/* Navigation Sub-header */}
      <div className="bg-white border-b border-neutral-200 px-6">
        <div className="max-w-7xl mx-auto flex space-x-8 overflow-x-auto text-xs font-semibold uppercase tracking-wider py-3">
          <button
            onClick={() => setActiveTab("resumen")}
            className={`pb-1 border-b-2 transition-colors ${
              activeTab === "resumen"
                ? "border-valli-ink text-valli-ink font-bold"
                : "border-transparent text-neutral-500 hover:text-neutral-900"
            }`}
          >
            Resumen
          </button>
          <button
            onClick={() => setActiveTab("productos")}
            className={`pb-1 border-b-2 transition-colors ${
              activeTab === "productos"
                ? "border-valli-ink text-valli-ink font-bold"
                : "border-transparent text-neutral-500 hover:text-neutral-900"
            }`}
          >
            Productos ({products.length})
          </button>
          <button
            onClick={() => setActiveTab("pedidos")}
            className={`pb-1 border-b-2 transition-colors ${
              activeTab === "pedidos"
                ? "border-valli-ink text-valli-ink font-bold"
                : "border-transparent text-neutral-500 hover:text-neutral-900"
            }`}
          >
            Pedidos ({mockOrders.length})
          </button>
          <button
            onClick={() => setActiveTab("inventario")}
            className={`pb-1 border-b-2 transition-colors ${
              activeTab === "inventario"
                ? "border-valli-ink text-valli-ink font-bold"
                : "border-transparent text-neutral-500 hover:text-neutral-900"
            }`}
          >
            Inventario
          </button>
          <button
            onClick={() => setActiveTab("metricas")}
            className={`pb-1 border-b-2 transition-colors ${
              activeTab === "metricas"
                ? "border-valli-ink text-valli-ink font-bold"
                : "border-transparent text-neutral-500 hover:text-neutral-900"
            }`}
          >
            Métricas B2B
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* TAB 1: RESUMEN / OVERVIEW */}
        {activeTab === "resumen" && (
          <div className="space-y-8">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded border border-neutral-200 shadow-sm">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                  Ventas Totales
                </div>
                <div className="text-2xl font-bold text-valli-ink mt-1">
                  {formatCurrency(totalRevenue)}
                </div>
                <div className="text-[11px] text-emerald-600 font-medium mt-1">
                  {wholesaleOrders.length + retailOrders.length} órdenes registradas
                </div>
              </div>

              <div className="bg-white p-4 rounded border border-neutral-200 shadow-sm">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                  Ventas Mayoreo (B2B)
                </div>
                <div className="text-2xl font-bold text-valli-clay mt-1">
                  {formatCurrency(wholesaleRevenue)}
                </div>
                <div className="text-[11px] text-neutral-500 mt-1">
                  {wholesalePercentage.toFixed(1)}% del ingreso total
                </div>
              </div>

              <div className="bg-white p-4 rounded border border-neutral-200 shadow-sm">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                  Utilidad Bruta
                </div>
                <div className="text-2xl font-bold text-emerald-700 mt-1">
                  {formatCurrency(grossProfit)}
                </div>
                <div className="text-[11px] text-neutral-500 mt-1">
                  Margen bruto: {grossMargin.toFixed(1)}%
                </div>
              </div>

              <div className="bg-white p-4 rounded border border-neutral-200 shadow-sm">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                  Costo de Mercancía
                </div>
                <div className="text-2xl font-bold text-neutral-700 mt-1">
                  {formatCurrency(totalCost)}
                </div>
                <div className="text-[11px] text-neutral-500 mt-1">
                  COGS directo a productores
                </div>
              </div>
            </div>

            {/* Operational alert strip */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-amber-50 border border-amber-200 p-4 rounded flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-amber-900">
                      Pedidos Pendientes de Despacho ({pendingOrdersCount})
                    </div>
                    <div className="text-[11px] text-amber-700">
                      Coordinar recolección con transporte refrigerado.
                    </div>
                  </div>
                </div>
                <Button variant="secondary" size="sm" onClick={() => setActiveTab("pedidos")}>
                  Revisar
                </Button>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-4 rounded flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Boxes className="w-5 h-5 text-blue-700 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-blue-900">
                      Ticket Promedio Mayorista
                    </div>
                    <div className="text-[11px] text-blue-700">
                      {formatCurrency(avgWholesaleTicket)} MXN vs {formatCurrency(avgRetailTicket)} MXN retail
                    </div>
                  </div>
                </div>
                <Button variant="secondary" size="sm" onClick={() => setActiveTab("metricas")}>
                  Métricas
                </Button>
              </div>
            </div>

            {/* Recent Orders Overview */}
            <div className="bg-white rounded border border-neutral-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-neutral-200 flex justify-between items-center">
                <h3 className="text-sm font-bold uppercase tracking-wider text-valli-ink">
                  Órdenes Recientes
                </h3>
                <span className="text-xs text-neutral-500">Últimos pedidos B2B y Retail</span>
              </div>
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-50 text-neutral-500 uppercase tracking-wider text-[10px] border-b border-neutral-200">
                  <tr>
                    <th className="py-2.5 px-4">Orden</th>
                    <th className="py-2.5 px-4">Cliente</th>
                    <th className="py-2.5 px-4">Tipo</th>
                    <th className="py-2.5 px-4">Detalle</th>
                    <th className="py-2.5 px-4 text-right">Ingreso</th>
                    <th className="py-2.5 px-4 text-right">Utilidad</th>
                    <th className="py-2.5 px-4 text-center">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 font-mono">
                  {mockOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-neutral-50">
                      <td className="py-3 px-4 font-bold text-valli-ink">{ord.id}</td>
                      <td className="py-3 px-4 font-sans font-medium text-neutral-900">{ord.customer}</td>
                      <td className="py-3 px-4 font-sans">
                        {ord.type === "wholesale" ? (
                          <span className="bg-neutral-900 text-white text-[10px] uppercase font-bold px-1.5 py-0.5 rounded">
                            Mayoreo
                          </span>
                        ) : (
                          <span className="bg-neutral-200 text-neutral-700 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded">
                            Retail
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 font-sans text-neutral-600">{ord.items}</td>
                      <td className="py-3 px-4 text-right font-semibold text-neutral-900">
                        {formatCurrency(ord.revenue)}
                      </td>
                      <td className="py-3 px-4 text-right font-semibold text-emerald-700">
                        {formatCurrency(ord.revenue - ord.cost)}
                      </td>
                      <td className="py-3 px-4 text-center font-sans">
                        <span
                          className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                            ord.status === "delivered"
                              ? "bg-emerald-100 text-emerald-800"
                              : ord.status === "processing"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {ord.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTOS */}
        {activeTab === "productos" && (
          <div className="bg-white rounded border border-neutral-200 shadow-sm overflow-hidden space-y-4 p-4">
            <div className="flex justify-between items-center border-b border-neutral-200 pb-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-valli-ink">
                Gestión de Catálogo & Precios Multi-Tarifa
              </h3>
              <div className="text-xs text-neutral-500">
                Total de referencias: {products.length}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-50 text-neutral-500 uppercase tracking-wider text-[10px] border-b border-neutral-200">
                  <tr>
                    <th className="py-2.5 px-3">Producto</th>
                    <th className="py-2.5 px-3">Categoría</th>
                    <th className="py-2.5 px-3">Origen</th>
                    <th className="py-2.5 px-3">Costo (Cost Price)</th>
                    <th className="py-2.5 px-3">Retail Price</th>
                    <th className="py-2.5 px-3 text-valli-clay">Wholesale Price</th>
                    <th className="py-2.5 px-3">MOQ Mayoreo</th>
                    <th className="py-2.5 px-3 text-center">Stock</th>
                    <th className="py-2.5 px-3 text-center">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {products.map((p) => {
                    const status =
                      p.stock === 0
                        ? "Agotado"
                        : p.stock <= 5
                        ? "Stock bajo"
                        : "En stock";

                    return (
                      <tr key={p.id} className="hover:bg-neutral-50">
                        <td className="py-3 px-3 font-semibold text-valli-ink">{p.name}</td>
                        <td className="py-3 px-3 uppercase text-neutral-500">{p.category}</td>
                        <td className="py-3 px-3 text-neutral-600">{p.origin}</td>
                        <td className="py-3 px-3 font-mono text-neutral-600">
                          {formatCurrency(p.costPrice)}
                        </td>
                        <td className="py-3 px-3 font-mono font-semibold text-neutral-900">
                          {formatCurrency(p.retailPrice)}
                        </td>
                        <td className="py-3 px-3 font-mono font-bold text-valli-clay">
                          {formatCurrency(p.wholesalePrice)}
                        </td>
                        <td className="py-3 px-3">
                          <span className="bg-neutral-100 text-neutral-800 font-mono px-2 py-0.5 rounded text-[11px]">
                            {p.wholesaleMinimumQuantity || "-"} uds
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center font-mono font-bold">{p.stock}</td>
                        <td className="py-3 px-3 text-center">
                          <span
                            className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                              status === "En stock"
                                ? "bg-emerald-100 text-emerald-800"
                                : status === "Stock bajo"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-rose-100 text-rose-800"
                            }`}
                          >
                            {status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: PEDIDOS */}
        {activeTab === "pedidos" && (
          <div className="bg-white rounded border border-neutral-200 shadow-sm p-4 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-valli-ink border-b border-neutral-200 pb-3">
              Control de Despacho Mayorista y Consumidor
            </h3>
            <div className="space-y-3">
              {mockOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="p-4 rounded border border-neutral-200 bg-neutral-50/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 text-xs"
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold text-sm text-valli-ink">{ord.id}</span>
                      <span
                        className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                          ord.type === "wholesale" ? "bg-valli-ink text-valli-bone" : "bg-neutral-200"
                        }`}
                      >
                        {ord.type}
                      </span>
                      <span className="text-neutral-500">· {ord.date}</span>
                    </div>
                    <div className="font-semibold text-neutral-900 mt-1">{ord.customer}</div>
                    <div className="text-neutral-600 mt-0.5">{ord.items}</div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm font-bold font-mono text-valli-ink">
                        {formatCurrency(ord.revenue)}
                      </div>
                      <div className="text-[11px] text-emerald-700 font-medium">
                        Margen: {formatCurrency(ord.revenue - ord.cost)}
                      </div>
                    </div>
                    <span
                      className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${
                        ord.status === "delivered"
                          ? "bg-emerald-100 text-emerald-800"
                          : ord.status === "processing"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {ord.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: INVENTARIO */}
        {activeTab === "inventario" && (
          <div className="bg-white rounded border border-neutral-200 shadow-sm p-4 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-valli-ink border-b border-neutral-200 pb-3">
              Monitoreo de Stock & Umbrales de Reabastecimiento
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {products.map((p) => (
                <div key={p.id} className="p-4 rounded border border-neutral-200 space-y-2">
                  <div className="text-xs font-semibold text-valli-ink truncate">{p.name}</div>
                  <div className="text-2xl font-mono font-bold text-neutral-900">
                    {p.stock} <span className="text-xs text-neutral-500 font-sans font-normal">{p.unit}</span>
                  </div>
                  <div className="text-[11px] text-neutral-500">
                    Origen: {p.origin}
                  </div>
                  <div className="pt-2">
                    <span
                      className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded inline-block ${
                        p.stock === 0
                          ? "bg-rose-100 text-rose-800"
                          : p.stock <= 5
                          ? "bg-amber-100 text-amber-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {p.stock === 0 ? "Agotado" : p.stock <= 5 ? "Stock bajo" : "En stock"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: MÉTRICAS B2B */}
        {activeTab === "metricas" && (
          <div className="space-y-6">
            <div className="bg-white rounded border border-neutral-200 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-valli-ink border-b border-neutral-200 pb-3">
                Rendimiento de Línea Comercial: Mayoreo vs Retail
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-neutral-50 rounded border border-neutral-200 space-y-1">
                  <div className="text-xs text-neutral-500 font-semibold uppercase">
                    % Ingresos por Mayoreo
                  </div>
                  <div className="text-3xl font-mono font-bold text-valli-clay">
                    {wholesalePercentage.toFixed(1)}%
                  </div>
                  <div className="text-xs text-neutral-600">
                    Total B2B: {formatCurrency(wholesaleRevenue)} MXN
                  </div>
                </div>

                <div className="p-4 bg-neutral-50 rounded border border-neutral-200 space-y-1">
                  <div className="text-xs text-neutral-500 font-semibold uppercase">
                    Ticket Promedio Mayoreo
                  </div>
                  <div className="text-3xl font-mono font-bold text-valli-ink">
                    {formatCurrency(avgWholesaleTicket)}
                  </div>
                  <div className="text-xs text-neutral-600">
                    vs {formatCurrency(avgRetailTicket)} ticket consumidor
                  </div>
                </div>

                <div className="p-4 bg-neutral-50 rounded border border-neutral-200 space-y-1">
                  <div className="text-xs text-neutral-500 font-semibold uppercase">
                    Producto Más Rentable
                  </div>
                  <div className="text-xl font-bold text-emerald-800">
                    Queso Oaxaca Artesanal
                  </div>
                  <div className="text-xs text-neutral-600">
                    Margen bruto unitario: 45.8% (Cost $120 / Whls $175)
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
