export default function kaleidoSonoro(hydra, { audioLevel, centroid, energy, amplitude }) {
const sides = Math.round(2 + Math.min(centroid / 10, 8)); 
const rotSpeed = ((amplitude / 127) * 360)/100;
const azul = .25 + audioLevel * 10 ;

console.log('rotSpeed', rotSpeed)
hydra.synth.voronoi(sides, .1, .2).color(.1, .1, azul).brightness(.1).contrast(1.3)//.posterize(5)
  .kaleid(sides)
  .rotate(rotSpeed)
  .pixelate(100, 100)
  
  .scale(.7, 1, ()=> hydra.synth.width/hydra.synth.height)
  .out();
}

