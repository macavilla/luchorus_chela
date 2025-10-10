import { useEffect, useRef } from "react";

import Hydra from "hydra-synth"

export default function HydraCanvas({ patchName }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let hydraInstance = null;
    let rafId = null;

    // mapa de patches incluidos en el bundle (Vite)
    const patches = import.meta.glob(`../lib/hydra-patches/*/.js`);

    const setup = async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // // 1) Importar hydra (cliente)
      // const modHydra = await import("hydra-synth");
      // const Hydra = modHydra.default ?? modHydra;

      // 2) Crear instancia no-global
      hydraInstance = new Hydra({
        canvas,
        detectAudio: false,
        makeGlobal: false,
      });

      // 3) Obtener el "h" correcto (synth contiene las funciones en non-global)
      const h = hydraInstance.synth ?? hydraInstance;
      console.log("hydra:", hydraInstance);
      console.log("hydra.synth:", hydraInstance.synth);

      // 4) cargar el patch solicitado por nombre
      try {
        if (!patchName) throw new Error("No patchName provided");

        const patchPath = `../lib/hydra-patches/${patchName}.js`;
        const importer = patches[patchPath];

        if (!importer) {
          console.warn("Patch no encontrado en import.meta.glob keys:", Object.keys(patches));
          throw new Error(`Patch "${patchName}" no está en ../lib/hydra-patches/`);
        }

        const mod = await importer(); // carga el módulo
        console.log("patch module loaded:", mod);

        // detectar función exportada de forma robusta
        let patchFn = null;
        if (typeof mod === "function") patchFn = mod;
        else if (typeof mod.default === "function") patchFn = mod.default;
        else {
          // buscar primera función exportada (named exports)
          const fn = Object.values(mod).find((v) => typeof v === "function");
          if (fn) patchFn = fn;
        }

        if (typeof patchFn !== "function") {
          console.warn("El módulo del patch no exporta una función ejecutable:", mod);
          throw new Error("Patch inválido (no function)");
        }

        // Ejecutar el patch pasándole la instancia synth (h)
        patchFn(h);
        console.log("Patch ejecutado:", patchName);
      } catch (err) {
        console.error("Error cargando/ejecutando patch:", err);
        // fallback visual (seguro)
        try {
          const fallbackH = hydraInstance.synth ?? hydraInstance;
          fallbackH.osc(10, 0.1, 1.2).kaleid(4).out();
        } catch (e) {
          console.error("Fallback también falló:", e);
        }
      }

      // Ajuste de canvas
      const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      resize();
      window.addEventListener("resize", resize);

      // cleanup básico (si querés más profundo, llamá renderer.dispose si existe)
      return () => {
        window.removeEventListener("resize", resize);
        if (rafId) cancelAnimationFrame(rafId);
      };
    };

    const cleanupPromise = setup();

    return () => {
      cleanupPromise.then((clean) => clean && clean());
      // intentar limpiar hydra si existe
      if (hydraInstance && hydraInstance.renderer && typeof hydraInstance.renderer.dispose === "function") {
        try { hydraInstance.renderer.dispose(); } catch (e) {}
      }
    };
  }, [patchName]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100vw", height: "100vh", display: "block" }}
    />
  );
}
