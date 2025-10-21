import HydraCanvas from "./HydraCanvas.jsx";
import oscilloscope from "../lib/hydra-patches/oscilloscope.js";

export default function OscilloscopePage() {
  return <HydraCanvas patch={oscilloscope} />;
}
