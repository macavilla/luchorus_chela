export default function oscilloscope(hydra) {
  hydra.synth.s0.initCam();

  hydra.synth
    .osc(100, 0.1, () => hydra.synth.mouse.x / hydra.synth.width)
    //.rotate(0, () => hydra.synth.mouse.y / hydra.synth.height)
    //.add(hydra.synth.s0)
    .out();
}
