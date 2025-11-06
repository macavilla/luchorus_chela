export default function reactivePatch(h, { audioLevel }) {
  console.log('audioLevel', audioLevel)
  const speed = 0.1 + audioLevel * 10;
  const freq = 5 + audioLevel * 50;

  h.synth.osc(freq, 0.1, 0.8)
    .rotate(speed)
    .color(1, audioLevel * 5, 1 - audioLevel * 5)
    .out();
}
