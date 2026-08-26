"use client";

import { useEffect } from "react";

export default function RegisterSW() {
  useEffect(() => {
    if ("serviceWorker" in navigator && window.location.protocol.startsWith("http")) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("Valli Service Worker registered:", registration.scope);
          })
          .catch((error) => {
            console.error("Valli Service Worker registration failed:", error);
          });
      });
    }
  }, []);

  return null;
}
