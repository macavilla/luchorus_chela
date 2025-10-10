import Hydra from "hydra-synth";

export default function initHydraWithPatch(canvas, patchModule) {
  if (!canvas) return;

  const hydra = new Hydra({
    canvas,
    detectAudio: false,
    makeGlobal: false,
  });

  console.log('patchModule', patchModule)
  console.log('typeof patchModule', typeof patchModule)
  // Detectar la función exportada (ya no depende de default)
  const patchFn = Object.values(patchModule).find(
    (v) => typeof v === "function"
  );


  console.log('patchFn', patchFn)
  console.log('typeof patchFn', typeof patchFn)
  if (typeof patchFn === "function") {
    patchFn(hydra);
  } else {
    console.warn("⚠️ Patch inválido o vacío, usando fallback visual");
    hydra.osc(10, 0.1, 1.2).kaleid(4).out();
  }

  return hydra;
}
