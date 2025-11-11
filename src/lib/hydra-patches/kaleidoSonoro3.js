export default function kaleidoSonoro(hydra, { audioLevel, centroid, energy, amplitude }) {
const sides = Math.round(2 + Math.min(centroid / 10, 8)); 
const zoom = 1 + audioLevel * 2;
const rotSpeed = energy /2;

hydra.synth.voronoi(sides, .2, ()=>hydra.synth.time/4).colorama(()=>Math.sin(rotSpeed*.001)).posterize(5)
  .kaleid(sides)
  // .scale(zoom)
  .rotate(rotSpeed*.005)
  .modulate(hydra.synth.shape(sides).scale(zoom), audioLevel * 0.2)
  .pixelate(100, 100)
  .scale(.7, 1, ()=> hydra.synth.width/hydra.synth.height)
  .out();
}

