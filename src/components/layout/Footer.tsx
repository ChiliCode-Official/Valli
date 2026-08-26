import React from "react";
import Link from "next/link";
import { BRAND } from "@/config/brand";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-valli-ink text-valli-bone border-t border-valli-stone/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <Link
              href="/"
              className="text-3xl font-display tracking-tight text-valli-bone hover:opacity-90 inline-block"
            >
              {BRAND.name}
            </Link>
            <p className="text-sm text-valli-sand font-medium leading-relaxed">
              {BRAND.tagline}
            </p>
            <p className="text-xs text-valli-stone leading-relaxed">
              {BRAND.positioning}. Abastecimiento confiable directamente desde origen.
            </p>
          </div>

          {/* Col 1: Productos */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-valli-sand mb-4">
              PRODUCTOS
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/productos"
                  className="text-valli-bone/80 hover:text-valli-bone transition-colors"
                >
                  Catálogo
                </Link>
              </li>
              <li>
                <Link
                  href="/productos?categoria=carnes"
                  className="text-valli-bone/80 hover:text-valli-bone transition-colors"
                >
                  Carnes artesanales
                </Link>
              </li>
              <li>
                <Link
                  href="/productos?categoria=quesos"
                  className="text-valli-bone/80 hover:text-valli-bone transition-colors"
                >
                  Quesos tradicionales
                </Link>
              </li>
              <li>
                <Link
                  href="/mayoreo"
                  className="text-valli-bone/80 hover:text-valli-bone transition-colors"
                >
                  Mayoreo
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Valli */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-valli-sand mb-4">
              VALLI
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/nosotros"
                  className="text-valli-bone/80 hover:text-valli-bone transition-colors"
                >
                  Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/origen"
                  className="text-valli-bone/80 hover:text-valli-bone transition-colors"
                >
                  Origen
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="text-valli-bone/80 hover:text-valli-bone transition-colors"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${BRAND.contact.adminEmails[0]}`}
                  className="text-valli-stone hover:text-valli-sand text-xs transition-colors"
                >
                  {BRAND.contact.adminEmails[0]}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Cuenta */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-valli-sand mb-4">
              CUENTA
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/cuenta"
                  className="text-valli-bone/80 hover:text-valli-bone transition-colors"
                >
                  Mi cuenta
                </Link>
              </li>
              <li>
                <Link
                  href="/cuenta/pedidos"
                  className="text-valli-bone/80 hover:text-valli-bone transition-colors"
                >
                  Mis pedidos
                </Link>
              </li>
              <li>
                <Link
                  href="/carrito"
                  className="text-valli-bone/80 hover:text-valli-bone transition-colors"
                >
                  Carrito
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="text-valli-stone hover:text-valli-sand text-xs transition-colors"
                >
                  Panel Valli (Operación)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-valli-stone/20 flex flex-col sm:flex-row items-center justify-between text-xs text-valli-stone gap-4">
          <p>© {currentYear} {BRAND.name}. Todos los derechos reservados.</p>
          <div className="flex space-x-6">
            <Link href="/privacidad" className="hover:text-valli-sand transition-colors">
              Privacidad
            </Link>
            <Link href="/terminos" className="hover:text-valli-sand transition-colors">
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
