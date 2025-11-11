import { useEffect } from "react";
import p5 from "p5";

export default function P5AudioAnalyzer({ onVolume }) {
  useEffect(() => {
    let mic, amplitude, sketch, fft;
    let filter;

    const s = (p) => {
      p.setup = () => {
        mic = new p5.AudioIn();
        mic.start();

        // Crear un filtro high-pass
        filter = new p5.HighPass();
        filter.freq(100);
        filter.res(0);

        setTimeout(() => {
          mic.connect(filter);
        }, 100);

        fft = new p5.FFT();
        fft.setInput(filter); // Analizar el audio filtrado

        amplitude = new p5.Amplitude();
        amplitude.setInput(filter); // Analizar el audio filtrado
      };

      p.draw = () => {
        const level = amplitude.getLevel();
        if (onVolume) onVolume(level);
      };
    };

    sketch = new p5(s);

    return () => {
      // Ensure audio nodes are stopped/disconnected to avoid lingering output
      try {
        mic?.stop?.();
        mic?.disconnect?.();
      } catch (e) {}
      try {
        filter?.disconnect?.();
      } catch (e) {}
      sketch.remove();
    };
  }, [onVolume]);

  return null; // no renderiza nada visible
}
