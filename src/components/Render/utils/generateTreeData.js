import { COLORS } from "./colors.js";

// Recursive tree generator for JSON → nodes + edges
export function generateTreeData(
  data,
  parentId = null,
  depth = 0,
  keyName = "root",
  nodeIdCounter = { value: 1 },
  path = "$"
) {
  const nodes = [];
  const edges = [];

  const currentId = String(nodeIdCounter.value++);
  let label = "";
  let nodeType = "primitive";
  let currentPath = path;

  if (keyName !== "root") {
    currentPath += Array.isArray(data)
      ? `.${keyName}`
      : keyName.startsWith("[")
      ? keyName
      : `.${keyName}`;
  }

  if (Array.isArray(data)) {
    label = `${keyName} (Array)`;
    nodeType = "array";
  } else if (typeof data === "object" && data !== null) {
    label = `${keyName} (Object)`;
    nodeType = "object";
  } else {
    label = `${keyName}: ${String(data)}`;
    nodeType = "primitive";
  }

  nodes.push({
    id: currentId,
    data: { label, path: currentPath },
    position: { x: depth * 280, y: nodeIdCounter.value * 60 },
    type: nodeType,
    style: {
      border: "1px solid #888",
      borderRadius: 10,
      padding: 10,
      background:
        nodeType === "object"
          ? COLORS.object
          : nodeType === "array"
          ? COLORS.array
          : COLORS.primitive,
      color: "white",
      fontWeight: 500,
      fontSize: 14,
      minWidth: 150,
    },
  });

  if (parentId) {
    edges.push({
      id: `e${parentId}-${currentId}`,
      source: parentId,
      target: currentId,
      type: "smoothstep",
    });
  }

  if (typeof data === "object" && data !== null) {
    if (Array.isArray(data)) {
      data.forEach((item, index) => {
        const child = generateTreeData(
          item,
          currentId,
          depth + 1,
          `[${index}]`,
          nodeIdCounter,
          `${currentPath}[${index}]`
        );
        nodes.push(...child.nodes);
        edges.push(...child.edges);
      });
    } else {
      Object.entries(data).forEach(([key, value]) => {
        const child = generateTreeData(
          value,
          currentId,
          depth + 1,
          key,
          nodeIdCounter,
          currentPath
        );
        nodes.push(...child.nodes);
        edges.push(...child.edges);
      });
    }
  }

  return { nodes, edges };
}
