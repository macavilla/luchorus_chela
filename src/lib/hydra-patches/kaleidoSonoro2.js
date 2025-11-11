export default function kaleidoSonoro(hydra, { audioLevel, centroid, energy, amplitude }) {

// Parámetros dinámicos
const sides = Math.round(2 + Math.min(centroid / 50, 8)); // entre 2 y 10
const zoom = 1 + audioLevel * 2;
const rotSpeed = energy /2;

// Código Hydra
hydra.synth.voronoi(7, .2, ()=>time/4).colorama(()=>Math.sin(zoom/2)).posterize(5)
  .kaleid(sides)
  // .scale(zoom)
  //.rotate(rotSpeed*.5)
  .modulate(hydra.synth.shape(sides).scale(zoom), audioLevel * 0.2)
  .hue(()=>time * 0.05)
  .out();


}

