// src/components/P5AudioAnalyzer.jsx
import { useEffect } from "react";
import p5 from "p5";

export default function P5AudioAnalyzer({ onVolume }) {
  useEffect(() => {
    let mic, amplitude, sketch;

    const s = (p) => {
      p.setup = () => {
        mic = new p5.AudioIn();
        mic.start();
        amplitude = new p5.Amplitude();
        amplitude.setInput(mic);
      };

      p.draw = () => {
        const level = amplitude.getLevel();
        if (onVolume) onVolume(level);
      };
    };

    sketch = new p5(s);

    return () => {
      sketch.remove();
    };
  }, [onVolume]);

  return null; // no renderiza nada visible
}
