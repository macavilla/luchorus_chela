import { useEffect, useRef, useState } from "react";
import p5 from "p5";
import "p5/lib/addons/p5.sound";

export default function useAudioInput() {
  const audioLevelRef = useRef(0);
  const centroidRef = useRef(0);
  const energyRef = useRef(0);
  const amplitudeRef = useRef(0);
  const micRef = useRef(null);
  const fftRef = useRef(null);
  const filterRef = useRef(null);
  const rafRef = useRef(null);
  const pRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  const startMic = async () => {
    if (isReady) return;

    try {
      if (!pRef.current) {
        pRef.current = new p5(() => {});
      }

      // Muteo masterVolume output para evitar feedback loop
      try {
        if (typeof pRef.current.masterVolume === "function") {
          pRef.current.masterVolume(0);
        } else if (typeof p5?.masterVolume === "function") {
          p5.masterVolume(0);
        }
      } catch (e) {
        console.warn("Couldn't set masterVolume to 0:", e);
      }

      const ctx = pRef.current.getAudioContext();
      if (ctx.state === "suspended") {
        console.log("🎧 Reanudando contexto de audio...");
        await ctx.resume();
      }

  const mic = new p5.AudioIn();
  await mic.start();
  micRef.current = mic;

  // High-pass filter a 100Hz
  const filter = new p5.HighPass();
  filter.freq(100);
  filter.res(0);
  mic.connect(filter);
  filterRef.current = filter;

  const fft = new p5.FFT();
  // seteo FFT input a la señal filtrada y no directo al mic
  fft.setInput(filter);
  fftRef.current = fft;

      setIsReady(true);

      const updateAudioData = () => {
        if (mic.enabled) {
          const spectrum = fft.analyze();

          // Centroide espectral
          let sum = 0;
          let weightedSum = 0;
          for (let i = 0; i < spectrum.length; i++) {
            sum += spectrum[i];
            weightedSum += i * spectrum[i];
          }
          const centroid = sum ? weightedSum / sum : 0;
          centroidRef.current = centroid;

          // Energía (centroid^2)
          const energy = centroid * centroid;
          energyRef.current = energy;

          // Amplitud mapeada entre 0 y 127
          const amplitude = pRef.current.map(
            spectrum[Math.round(centroid)] || 0,
            0,
            255,
            0,
            127
          );
          amplitudeRef.current = amplitude;

          // Nivel general del micrófono
          audioLevelRef.current = mic.getLevel();
        }

        rafRef.current = requestAnimationFrame(updateAudioData);
      };

      updateAudioData();
    } catch (err) {
      console.error("🎙️ Error iniciando micrófono:", err);
    }
  };

  const setMasterVolume = (v) => {
    try {
      if (pRef.current && typeof pRef.current.masterVolume === "function") {
        pRef.current.masterVolume(v);
      } else if (typeof p5?.masterVolume === "function") {
        p5.masterVolume(v);
      } else {
        console.warn("masterVolume API not available to set to", v);
      }
    } catch (e) {
      console.warn("Error setting masterVolume:", e);
    }
  };

  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current);
      try {
        micRef.current?.stop?.();
        micRef.current?.disconnect?.();
      } catch (e) {}
      try {
        filterRef.current?.disconnect?.();
      } catch (e) {}
      pRef.current?.remove?.();
    };
  }, []);

  return {
    audioLevelRef,
    centroidRef,
    energyRef,
    amplitudeRef,
    isReady,
    startMic,
    setMasterVolume,
  };
}
