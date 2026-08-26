import type { Metadata } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import "./globals.css";
import { BRAND } from "@/config/brand";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Valli | Proveedor mayorista de productos artesanales",
  description:
    "Proveedor mayorista premium de productos artesanales mexicanos. Cecina, chorizo, quesos y productos seleccionados desde su origen.",
  keywords: [
    "proveedor productos oaxaca",
    "productos oaxaqueños mayoreo",
    "queso oaxaca mayoreo",
    "cecina mayoreo",
    "chorizo artesanal mayoreo",
    "proveedor alimentos artesanales",
    "productos mexicanos mayoreo",
  ],
  openGraph: {
    title: `${BRAND.name} | ${BRAND.tagline}`,
    description: BRAND.description,
    type: "website",
    locale: "es_MX",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${instrumentSerif.variable} ${manrope.variable}`}>
      <body className="min-h-screen flex flex-col bg-valli-bone text-valli-ink selection:bg-valli-clay selection:text-valli-white antialiased">
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <CartDrawer />
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
