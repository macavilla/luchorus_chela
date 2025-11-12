import HydraCanvas from "../HydraCanvas";
import kaleidoSonoro from "../../lib/hydra-patches/kaleidoSonoro4";

export default function KaleidoSonoroPage() {
  return <HydraCanvas patch={kaleidoSonoro} />;
}
