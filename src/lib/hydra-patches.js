// src/lib/hydra-patches.js
export default function initHydra() {
  // usamos las funciones globales inyectadas por Hydra
  osc(8, 0.1, 1.2).kaleid(4).modulate(noise(3).scale(0.5)).out();
}
