import { useEffect, useRef } from "react";
// 🔹 Importás el patch estáticamente: Astro y Vite lo incluyen en el bundle final
import { initHydra } from "../lib/hydra-patches";

export default function HydraCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // ✅ Evita ejecutar en el servidor
    if (typeof window === "undefined") return;

    // 🩹 Polyfill para Hydra (usa 'global' internamente)
    if (typeof global === "undefined") {
      window.global = window;
    }

    const canvas = canvasRef.current;

    // Ajusta tamaño al viewport
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Inicializa Hydra (desde tu módulo)
    initHydra(canvas);

    // Limpieza
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: "block",
        width: "100vw",
        height: "100vh",
        objectFit: "cover",
      }}
    />
  );
}
