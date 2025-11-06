import HydraCanvas from "../HydraCanvas";
import reactivePatch from "../../lib/hydra-patches/reactive";

const ReactivePage = () => <HydraCanvas patch={reactivePatch} />;

export default ReactivePage;