import Hydra from "hydra-synth";

export function createHydra(canvas) {
  const hydra = new Hydra({
    canvas,
    detectAudio: false,
    width: window.innerWidth,
    height: window.innerHeight,
    makeGlobal: false,
  });
  return hydra;
}
