import Hydra from "hydra-synth";

export function initHydra(canvas) {
  if (!canvas) return;

  const hydra = new Hydra({
    canvas,
    detectAudio: false,
    makeGlobal: true,
  });

  // Patch de prueba
  osc(10, 0.1, 1.2).kaleid(4).out();

  return hydra;
}
