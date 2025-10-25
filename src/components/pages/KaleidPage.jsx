import HydraCanvas from "../HydraCanvas";
import kaleid from "../../lib/hydra-patches/kaleid";

export default function KaleidPage() {
  return <HydraCanvas patch={kaleid} />;
}
