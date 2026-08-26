"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { User, LogOut, Package, Shield, Mail } from "lucide-react";
import { BRAND } from "@/config/brand";

export default function CuentaPage() {
  const { user, signOut, isAdmin } = useAuth();

  if (!user) {
    return (
      <div className="py-20 max-w-md mx-auto text-center px-4 space-y-4">
        <h1 className="text-2xl font-display font-medium text-valli-ink">
          Acceso a tu cuenta
        </h1>
        <p className="text-xs text-valli-stone">
          Inicia sesión para gestionar tus pedidos y cotizaciones mayoristas.
        </p>
        <div>
          <Link href="/login">
            <Button variant="primary" size="md">
              Entrar a mi cuenta
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-valli-sand/40 pb-6 gap-4">
        <div>
          <div className="text-xs uppercase font-bold tracking-widest text-valli-clay mb-1">
            PANEL DE CLIENTE
          </div>
          <h1 className="text-3xl font-display font-medium text-valli-ink">
            {user.displayName || "Mi Cuenta"}
          </h1>
          <p className="text-xs text-valli-stone">{user.email}</p>
        </div>

        <div className="flex items-center space-x-3">
          {isAdmin && (
            <Link href="/admin">
              <Button variant="secondary" size="sm" className="flex items-center space-x-1">
                <Shield className="w-3.5 h-3.5 text-valli-clay" />
                <span>Panel Valli</span>
              </Button>
            </Link>
          )}
          <Button variant="outline" size="sm" onClick={() => signOut()} className="flex items-center space-x-1">
            <LogOut className="w-3.5 h-3.5" />
            <span>Cerrar sesión</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-valli-white rounded-lg border border-valli-sand/40 space-y-3">
          <h2 className="text-base font-semibold text-valli-ink">Tus pedidos</h2>
          <p className="text-xs text-valli-stone">
            Consulta el historial y estatus de entrega de tus compras.
          </p>
          <div className="pt-2">
            <Link href="/productos">
              <Button variant="outline" size="sm">
                Crear nuevo pedido
              </Button>
            </Link>
          </div>
        </div>

        <div className="p-6 bg-valli-white rounded-lg border border-valli-sand/40 space-y-3">
          <h2 className="text-base font-semibold text-valli-ink">Soporte comercial</h2>
          <p className="text-xs text-valli-stone">
            ¿Necesitas cotización especial o atención a tu restaurante?
          </p>
          <div className="pt-2">
            <a href={`mailto:${BRAND.contact.adminEmails[0]}`}>
              <Button variant="outline" size="sm" className="flex items-center space-x-1">
                <Mail className="w-3.5 h-3.5" />
                <span>Contactar ejecutivo</span>
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
