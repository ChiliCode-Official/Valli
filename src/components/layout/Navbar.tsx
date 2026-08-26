"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, User as UserIcon, Menu, X, Shield } from "lucide-react";
import { BRAND } from "@/config/brand";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";

export default function Navbar() {
  const pathname = usePathname();
  const { totalItemsCount, openCart } = useCart();
  const { user, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Productos", href: "/productos" },
    { name: "Mayoreo", href: "/mayoreo" },
    { name: "Origen", href: "/origen" },
    { name: "Nosotros", href: "/nosotros" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-valli-bone/95 backdrop-blur-md border-b border-valli-sand/40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo / Wordmark */}
          <div className="flex items-center space-x-12">
            <Link
              href="/"
              className="text-3xl sm:text-4xl font-display tracking-tight text-valli-ink hover:opacity-90 transition-opacity"
            >
              {BRAND.name}
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-sm font-medium transition-colors hover:text-valli-clay ${
                      isActive ? "text-valli-clay font-semibold" : "text-valli-ink/80"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center space-x-5">
            <Link href="/mayoreo">
              <Button variant="secondary" size="sm" className="hidden lg:inline-flex text-xs font-semibold uppercase tracking-wider">
                Comprar por mayoreo
              </Button>
            </Link>

            {isAdmin && (
              <Link
                href="/admin"
                className="flex items-center space-x-1 text-xs uppercase tracking-wider font-semibold text-valli-clay bg-valli-clay/10 px-2.5 py-1.5 rounded hover:bg-valli-clay/20 transition-colors"
                title="Panel de Administración"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin</span>
              </Link>
            )}

            <Link
              href={user ? "/cuenta" : "/login"}
              className="p-2 text-valli-ink/80 hover:text-valli-ink transition-colors relative"
              aria-label="Cuenta"
            >
              <UserIcon className="w-5 h-5" />
              {user && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-600 rounded-full" />
              )}
            </Link>

            <button
              onClick={openCart}
              className="p-2 text-valli-ink/80 hover:text-valli-ink transition-colors relative"
              aria-label="Carrito"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-valli-ink text-valli-bone text-[11px] font-bold rounded-full flex items-center justify-center px-1">
                  {totalItemsCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-3">
            <button
              onClick={openCart}
              className="p-2 text-valli-ink/80 hover:text-valli-ink relative"
              aria-label="Carrito"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-valli-ink text-valli-bone text-[11px] font-bold rounded-full flex items-center justify-center px-1">
                  {totalItemsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-valli-ink hover:text-valli-clay"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-valli-sand/40 bg-valli-bone px-4 pt-2 pb-6 space-y-4 shadow-lg">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-valli-ink hover:text-valli-clay py-1"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href={user ? "/cuenta" : "/login"}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-valli-ink hover:text-valli-clay py-1 flex items-center justify-between"
            >
              <span>{user ? "Mi Cuenta" : "Entrar a mi cuenta"}</span>
              <UserIcon className="w-4 h-4" />
            </Link>
            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-valli-clay hover:underline py-1 flex items-center space-x-2"
              >
                <Shield className="w-4 h-4" />
                <span>Panel Valli (Admin)</span>
              </Link>
            )}
          </nav>

          <div className="pt-2 border-t border-valli-sand/40">
            <Link href="/mayoreo" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" fullWidth size="md">
                Comprar por mayoreo
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
