export default function initHydra() {
  // usamos las funciones globales inyectadas por Hydra
  osc(10, -0.1, 0.5).posterize(10).kaleid(12).pixelate(120, 120).out();
}
