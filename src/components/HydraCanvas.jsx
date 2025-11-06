import { useEffect, useRef } from "react";
import { createHydra } from "../lib/hydra-init";
import useAudioInput from "../hooks/useAudioInput";

export default function HydraCanvas({ patch }) {
  const canvasRef = useRef(null);
  const hydraRef = useRef(null);
  const rafRef = useRef(null);
  const { audioLevelRef, isReady, startMic } = useAudioInput();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const hydra = createHydra(canvas);
    hydraRef.current = hydra;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      hydra.setResolution(window.innerWidth, window.innerHeight);

    };
    window.addEventListener("resize", resizeCanvas);

    const renderLoop = () => {
      const level = audioLevelRef.current ?? 0;
      if (typeof patch === "function") {
        patch(hydra, { audioLevel: level });
      }
      rafRef.current = requestAnimationFrame(renderLoop);
    };

    renderLoop();
    resizeCanvas();
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [patch]);

  return (
    <div style={{ position: "relative" }}>
      <canvas
        ref={canvasRef}
        onClick={startMic}
        style={{
          width: "100vw",
          height: "100vh",
          display: "block",
          cursor: "pointer",
        }}
      />
      {!isReady && (
        <div
          onClick={startMic}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(0,0,0,0.6)",
            color: "white",
            fontFamily: "monospace",
            cursor: "pointer",
          }}
        >
          🎙️ Click para activar el micrófono
        </div>
      )}
    </div>
  );
}
