"use client";

import "../../styles/GraphCanvas.css";

import { ReactFlow, Controls, applyNodeChanges } from "@xyflow/react";
import type { Node, Edge, NodeChange } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import ServiceNode from "./ServiceNode";
import { useAppStore } from "../../store/useAppStore";
import { useState, useMemo, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchGraph } from "../../api/mockApi";

const nodeTypes = { service: ServiceNode };

const initialNodes: Node[] = [
  {
    id: "postgres",
    type: "service",
    position: { x: 460, y: 80 },
    data: { title: "Postgres", status: "Healthy", cpu: 50, description: "" },
  },
  {
    id: "redis",
    type: "service",
    position: { x: 120, y: 320 },
    data: { title: "Redis", status: "Down", cpu: 30, description: "" },
  },
  {
    id: "mongodb",
    type: "service",
    position: { x: 720, y: 320 },
    data: { title: "MongoDB", status: "Degraded", cpu: 70, description: "" },
  },
];

const initialEdges: Edge[] = [
  { id: "e1", source: "postgres", target: "redis" },
  { id: "e2", source: "postgres", target: "mongodb" },
];

export default function GraphCanvas() {
  const selectedAppId = useAppStore((s) => s.selectedAppId);
  const selectedNodeId = useAppStore((s) => s.selectedNodeId);
  const setSelectedNodeId = useAppStore((s) => s.setSelectedNodeId);

  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const { data } = useQuery({
    queryKey: ["graph", selectedAppId],
    queryFn: () => fetchGraph(selectedAppId!),
    enabled: selectedAppId !== "supertokens-golang",
  });

  useEffect(() => {
    if (selectedAppId === "supertokens-golang") {
      setNodes(initialNodes);
      setEdges(initialEdges);
    } else if (data) {
      setNodes(data.nodes);
      setEdges(data.edges);
    }
  }, [selectedAppId, data]);

  const selectedNode = useMemo(
    () => nodes.find((n) => n.id === selectedNodeId),
    [nodes, selectedNodeId]
  );

  useAppStore.setState({
    selectedNode,
    updateSelectedNode: (update: any) => {
      setNodes((nds) =>
        nds.map((n) =>
          n.id === selectedNodeId
            ? { ...n, data: { ...n.data, ...update } }
            : n
        )
      );
    },
  });

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    []
  );

  return (
    <div className="graph-canvas">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        onNodesChange={onNodesChange}
        onNodeClick={(_, node) => setSelectedNodeId(node.id)}
        onPaneClick={() => setSelectedNodeId(null)}
      >
        <Controls />
      </ReactFlow>
    </div>
  );
}
