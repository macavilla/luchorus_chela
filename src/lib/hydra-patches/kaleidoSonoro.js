export default function kaleidoSonoro(hydra, { audioLevel, centroid, energy, amplitude }) {
  // Normalizaciones básicas
  const level = Math.min(audioLevel * 5, 1); // más sensible
  const freq = 5 + centroid / 50; // frecuencia base modulada por el centroide
  const rot = Math.sin(centroid / 50) * 0.5; // rotación oscilante por el timbre
  const scaleFactor = 1 + level * 0.5; // zoom según volumen
  const poster = Math.floor(2 + amplitude / 40); // posterize según intensidad
  const scrollX = () => Math.sin(energy / 5000) * 0.3;
  const scrollY = () => Math.cos(energy / 7000) * 0.3;

  hydra.synth
    .osc(freq, 0.1 + level * 0.2, 0.1 + level * 0.2)
    .rotate(rot, 0.1)
    .posterize(poster)
    .kaleid(6 + Math.round(amplitude / 20))
    .scroll(scrollX, scrollY, 0.1, 0.1)
    .modulate(
      hydra.synth.noise(2 + level * 3).scale(scaleFactor),
      () => level * 0.3
    )
    .saturate(1 + level * 2)
    .scale(scaleFactor)
    .out();
}

