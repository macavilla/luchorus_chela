import HydraCanvas from "./HydraCanvas.jsx";
import kaleid from "../lib/hydra-patches/kaleid.js";

export default function KaleidPage() {
  return <HydraCanvas patch={kaleid} />;
}
