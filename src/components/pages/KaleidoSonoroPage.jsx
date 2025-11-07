import HydraCanvas from "../HydraCanvas";
import kaleidoSonoro from "../../lib/hydra-patches/kaleidoSonoro";

export default function KaleidoSonoroPage() {
  return <HydraCanvas patch={kaleidoSonoro} />;
}
