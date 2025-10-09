import Hydra from "hydra-synth";

export function initHydra(canvas, patchFn) {
  if (!canvas) return;

  const hydra = new Hydra({
    canvas,
    detectAudio: false,
    makeGlobal: true
  });

  console.log('patchFn', patchFn)
  // Si se pasa un patch, lo ejecuta
  if (typeof patchFn === "function") {
    patchFn();
  } else {
    // Fallback visual
    osc(10, 0.1, 1.2).kaleid(3).out();
  }

  return hydra;
}
