import Hydra from "hydra-synth";

export function initHydra(canvas) {
  if (!canvas) return;

  const hydra = new Hydra({
    canvas,
    detectAudio: false,
    makeGlobal: true,
  });

  // Patch de prueba
  osc(10, 0.1, 0.12)
    .rotate(0, 0.1)
    .posterize()
    .kaleid(18)
    .scale(1, 1, window.innerWidth / window.innerHeight)
    .out();

  return hydra;
}
