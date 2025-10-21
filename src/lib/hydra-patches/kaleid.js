export default function kaleid(hydra) {
  hydra.synth
    .osc(10, 0.1, 0.12)
    .rotate(0, 0.1)
    .posterize()
    .kaleid(18)
    .scroll(
      () => -hydra.synth.mouse.x / hydra.synth.width,
      () => -hydra.synth.mouse.y / hydra.synth.height,
      0.1,
      0.1
    )
    .scale(1, 1, hydra.synth.width / hydra.synth.height)
    .out();
}
