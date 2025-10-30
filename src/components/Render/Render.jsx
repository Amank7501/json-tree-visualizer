
import { ReactFlowProvider } from "@xyflow/react";
import RenderFlowTree from "./RenderFlowTree.jsx";


const Render = () => (
  <ReactFlowProvider>
    <RenderFlowTree />
  </ReactFlowProvider>
);

export default Render;
