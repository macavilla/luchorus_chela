import { useEffect, useRef } from "react";
import { createHydra } from "../lib/hydra-init";

export default function HydraCanvas({ patch }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    // Ajusta tamaño al viewport
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // inizializa hydra
    const hydra = createHydra(canvas);

    // corro el patch
    try {
      if (typeof patch === "function") {
        patch(hydra);
      } else {
        console.warn("⚠️ Patch inválido, usando fallback.");
        hydra.synth.osc(10, 0.1, 0.8).kaleid(4).out();
      }
    } catch (err) {
      console.error("Error ejecutando patch:", err);
    }

    // opcional: cleanup para liberar el canvas
    return () => {
      hydra.synth.stop();
    };
  }, [patch]);

  return <canvas ref={canvasRef} />;
}
