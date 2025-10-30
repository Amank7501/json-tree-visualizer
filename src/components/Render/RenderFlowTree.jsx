import React, { useCallback, useEffect, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import JsonInputPanel from "./JsonInputPanel.jsx";
import { generateTreeData } from "./utils/generateTreeData.js";
import { COLORS } from "./utils/colors.js";


const defaultJson = {
  user: {
    name: "Alice",
    age: 25,
    hobbies: ["reading", "traveling"],
    address: {
      city: "New York",
      zip: 10001,
    },
  },
  items: [
    { name: "Laptop", price: 1200 },
    { name: "Phone", price: 800 },
  ],
  active: true,
};

const RenderFlowTree = () => {
  const [jsonInput, setJsonInput] = useState(JSON.stringify(defaultJson, null, 2));
  const [jsonError, setJsonError] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [searchPath, setSearchPath] = useState("");
  const [searchMessage, setSearchMessage] = useState("");
  const reactFlowInstance = useReactFlow();

  //Generate initial tree
  useEffect(() => {
    const { nodes, edges } = generateTreeData(defaultJson);
    setNodes(nodes);
    setEdges(edges);
  }, []);

  // Handlers for reactflow state
  const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
  const onEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);


  //Clear tree and inputJson
  const handleClear = () => {
    setJsonInput("");
    setNodes([]);
    setEdges([]);
    setJsonError(null);
    setSearchMessage("");
  }
  //Generate from user JSON input
  const handleGenerateTree = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonError(null);
      const { nodes, edges } = generateTreeData(parsed);
      setNodes(nodes);
      setEdges(edges);
      setSearchMessage("");

      setTimeout(() => reactFlowInstance.fitView({ duration: 600 }), 100);
    } catch (err) {
      setJsonError("Invalid JSON format. Please check your input.");
    }
  };

  // Search and highlight node
  const handleSearch = () => {
    const pathToFind = searchPath.trim();
    if (!pathToFind) {
      setSearchMessage("Please enter a JSON path (e.g. $.user.address.city)");
      return;
    }

    let found = false;
    const updatedNodes = nodes.map((node) => {
      if (node.data.path === pathToFind) {
        found = true;
        return { ...node, style: { ...node.style, background: COLORS.highlight } };
      } else {
        const nodeType = node.type;
        return {
          ...node,
          style: {
            ...node.style,
            background:
              nodeType === "object"
                ? COLORS.object
                : nodeType === "array"
                ? COLORS.array
                : COLORS.primitive,
          },
        };
      }
    });

    setNodes(updatedNodes);

    if (found) {
      const matchedNode = updatedNodes.find((n) => n.data.path === pathToFind);
      reactFlowInstance.setCenter(matchedNode.position.x, matchedNode.position.y, {
        zoom: 1.2,
        duration: 600,
      });
      setSearchMessage("Match found!");
    } else {
      setSearchMessage("No match found.");
    }
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {/* Input Panel */}
      <JsonInputPanel
        jsonInput={jsonInput}
        setJsonInput={setJsonInput}
        jsonError={jsonError}
        handleClear={handleClear}
        handleGenerateTree={handleGenerateTree}
        searchPath={searchPath}
        setSearchPath={setSearchPath}
        handleSearch={handleSearch}
        searchMessage={searchMessage}
      />

      {/* Tree Visualization */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        panOnScroll
        zoomOnScroll
      >
        <MiniMap nodeBorderRadius={2} nodeStrokeWidth={1} style={{ height: 120 }} />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default RenderFlowTree;
