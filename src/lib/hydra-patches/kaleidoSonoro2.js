export default function kaleidoSonoro(hydra, { audioLevel, centroid, energy, amplitude }) {
const sides = Math.round(2 + Math.min(centroid / 10, 8)); 
const zoom = 1 + audioLevel * 2;
const rotSpeed = energy /2;

hydra.synth.voronoi(sides, .2, ()=>time/4).colorama(()=>Math.sin(rotSpeed*.001)).posterize(5)
  .kaleid(sides)
  // .scale(zoom)
  .rotate(rotSpeed*.005)
  .modulate(hydra.synth.shape(sides).scale(zoom), audioLevel * 0.2)
  
  // .hue(()=>time * 0.05)
  .out();


}

