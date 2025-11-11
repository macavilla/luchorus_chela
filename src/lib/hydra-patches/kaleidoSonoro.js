export default function kaleidoSonoro(hydra, { audioLevel, centroid, energy, amplitude }) {
  // Normalizaciones básicas
  const level = Math.min(audioLevel * 5, 1); // audioLevel más sensible
  const freq = 5 + centroid / 50; // frecuencia base modulada x centroide
  const rot = Math.sin(centroid / 50) * 0.5; // rotación oscilante x centroide
  const scaleFactor = 1 + level; // zoom según volumen ?
  const poster = Math.floor(2 + amplitude / 40); // posterize según intensidad ?
  const scrollX = () => Math.sin(energy / 5000) * 0.1;
  const scrollY = () => Math.sin(energy / 5000) * 0.1;

  hydra.synth
    .osc(freq)
    .rotate(rot)
    .posterize(poster)
    .kaleid(1 + Math.round(amplitude / 20))    
    
    .scroll(scrollX, scrollY)
    .modulate(
      hydra.synth.noise(level * 5).scale(scaleFactor),
      () => level * 0.3
    )
    // .repeat(2, 2, .5)
    // .saturate(1 + level * 2)
    .scale(scaleFactor,1, ()=>hydra.synth.width/hydra.synth.height)
    .contrast(-2)
    // .scale(1, )
    .out();
}

