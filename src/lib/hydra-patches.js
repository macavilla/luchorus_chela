import Hydra from "hydra-synth";

export function initHydra(canvas) {
  if (!canvas) return;

  const hydra = new Hydra({
    canvas,
    detectAudio: false,
    makeGlobal: true,
  });

  // Patch de prueba
  osc(10, 0.1, .52)
    .brightness(-.35)
    .rotate(0, 0.1)
    .posterize(4)
    .kaleid(12)
    .scroll(() => - mouse.x / width, () => - mouse.y / height, .1, .1)
    .scale(1, 1, window.innerWidth / window.innerHeight)
    .out();

  return hydra;
}
