import { useEffect, useRef, useState } from "react";
import p5 from "p5";
import "p5/lib/addons/p5.sound";

export default function useAudioInput() {
  const audioLevelRef = useRef(0);
  const micRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const rafRef = useRef(null);
  const pRef = useRef(null);

  const startMic = async () => {
    if (isReady) return;

    try {
      // Creamos (si no existe) la instancia de p5 una sola vez
      if (!pRef.current) {
        pRef.current = new p5(() => {});
      }

      const ctx = pRef.current.getAudioContext();

      // Reactivamos el contexto de audio ANTES de crear el mic
      if (ctx.state === "suspended") {
        console.log("🎧 Reanudando contexto de audio...");
        await ctx.resume();
      }

      // Ahora sí: inicializamos el micrófono
      const mic = new p5.AudioIn();
      await mic.start();

      micRef.current = mic;
      setIsReady(true);

      // Loop de lectura continua
      const updateLevel = () => {
        if (mic.enabled) {
          audioLevelRef.current = mic.getLevel();
        }
        rafRef.current = requestAnimationFrame(updateLevel);
      };

      updateLevel();
    } catch (err) {
      console.error("🎙️ Error iniciando micrófono:", err);
    }
  };

  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current);
      micRef.current?.stop?.();
      pRef.current?.remove?.();
    };
  }, []);

  return { audioLevelRef, isReady, startMic };
}
