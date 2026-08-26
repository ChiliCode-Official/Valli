"use client";

import React, { useState, useEffect } from "react";
import { Download, X, Share } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showIOSPrompt, setShowIOSPrompt] = useState(false);
  const [showAndroidPCPrompt, setShowAndroidPCPrompt] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if already in standalone mode
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;

    if (isStandalone) return;

    // Detect iOS
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

    // Check if dismissed before
    const isDismissed = sessionStorage.getItem("valli_pwa_dismissed");
    if (isDismissed) return;

    if (isIOS) {
      setShowIOSPrompt(true);
    }

    // Capture standard install prompt for Chrome / Edge / Android / Desktop
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowAndroidPCPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShowAndroidPCPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setDismissed(true);
    setShowIOSPrompt(false);
    setShowAndroidPCPrompt(false);
    sessionStorage.setItem("valli_pwa_dismissed", "true");
  };

  if (dismissed) return null;

  // iOS Banner
  if (showIOSPrompt) {
    return (
      <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm z-50 bg-valli-ink text-valli-bone p-4 rounded-lg shadow-2xl border border-valli-sand/30 flex flex-col space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <span className="font-bold uppercase tracking-wider text-valli-sand">
            Instalar App Valli
          </span>
          <button onClick={handleDismiss} className="text-valli-stone hover:text-valli-bone p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-valli-bone/90 leading-relaxed">
          Para instalar Valli en tu iPhone/iPad, pulsa el botón compartir{" "}
          <Share className="w-3.5 h-3.5 inline mx-1 text-valli-clay" /> y luego selecciona{" "}
          <strong className="text-valli-white">"Agregar al inicio"</strong>.
        </p>
      </div>
    );
  }

  // Android / PC Banner
  if (showAndroidPCPrompt && deferredPrompt) {
    return (
      <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm z-50 bg-valli-ink text-valli-bone p-4 rounded-lg shadow-2xl border border-valli-sand/30 flex flex-col space-y-3 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded bg-valli-bone text-valli-ink flex items-center justify-center font-display font-bold text-xs">
              V
            </div>
            <span className="font-bold tracking-wide text-valli-bone">
              Instalar App Valli
            </span>
          </div>
          <button onClick={handleDismiss} className="text-valli-stone hover:text-valli-bone p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-valli-sand leading-relaxed">
          Accede más rápido al catálogo mayorista e inventario instalando la aplicación en tu dispositivo.
        </p>
        <div className="flex space-x-2 pt-1">
          <Button variant="dark" size="sm" fullWidth onClick={handleInstallClick} className="flex items-center justify-center space-x-1.5 font-semibold">
            <Download className="w-3.5 h-3.5" />
            <span>Instalar Aplicación</span>
          </Button>
        </div>
      </div>
    );
  }

  return null;
}
