import { useEffect, useRef } from "react";

export default function HydraCanvas({ width = 800, height = 600, initModule }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    (async () => {
      // Polyfill para hydra-synth en el browser
      if (typeof global === "undefined") {
        window.global = window;
      }

      const canvas = canvasRef.current;
      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      resizeCanvas(); // Ajusta al cargar

      // Vuelve a ajustar en resize
      window.addEventListener("resize", resizeCanvas);

      // Importar hydra-synth dinámicamente (solo en cliente)
      const { default: Hydra } = await import("hydra-synth");

      // Crear instancia con makeGlobal: true para tener osc(), shape(), etc.
      const hydra = new Hydra({
        canvas: canvasRef.current,
        detectAudio: false,
        makeGlobal: true, // 👈 importante
      });

      if (initModule) {
        try {
          const patchMod = await import(initModule);
          const initFn = patchMod.default ?? patchMod;
          if (typeof initFn === "function") {
            initFn(hydra);
          } else {
            console.warn("initModule no exportó una función válida");
          }
        } catch (err) {
          console.error("Error importando initModule:", err);
        }
      } else {
        // Patch de fallback (básico)
        osc(10, 0.1, 1.2).kaleid(4).out();
      }

      // Cleanup
      return () => {
        window.removeEventListener("resize", resizeCanvas);
      };
    })();
  }, [initModule]);

  return (
    <canvas
      ref={canvasRef}
      width={canvasRef.current ? canvasRef.current.width : width}
      height={canvasRef.current ? canvasRef.current.height : height}
    />
  );
}
