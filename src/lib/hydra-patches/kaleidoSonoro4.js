export default function kaleidoSonoro(hydra, { audioLevel, centroid, energy, amplitude }) {
const sides = Math.round(2 + Math.min(centroid / 10, 8)); 
let smoothRot = 0;
const azul = .5 + audioLevel * 10 ;
smoothRot += ((amplitude / 127) * 0.2 - smoothRot) * 0.1;

hydra.synth.voronoi(sides, .1, .2).color(.1, .1, azul).brightness(.1).contrast(1.3)//.posterize(5)
  .kaleid(sides)
  .rotate( ()=> hydra.synth.time * smoothRot)
  .pixelate(100, 100)
  
  .scale(.7, 1, ()=> hydra.synth.width/hydra.synth.height)
  .out();
}

