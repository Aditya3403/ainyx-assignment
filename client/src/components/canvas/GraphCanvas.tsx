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
import { SERVICE_LOGOS } from "../../constants/serviceLogos";
const nodeTypes = { service: ServiceNode };

const initialNodes: Node[] = [
  {
    id: "postgres",
    type: "service",
    position: { x: 460, y: 80 },
    dragHandle: ".drag-handle",
    data: {
      title: "Postgres",
      status: "Healthy",
      cpu: 50,
      description: "",
      logo: SERVICE_LOGOS.postgres,
    },
  },
  {
    id: "redis",
    type: "service",
    position: { x: 120, y: 320 },
    dragHandle: ".drag-handle",
    data: {
      title: "Redis",
      status: "Down",
      cpu: 30,
      description: "",
      logo: SERVICE_LOGOS.redis,
    },
  },
  {
    id: "mongodb",
    type: "service",
    position: { x: 720, y: 320 },
    dragHandle: ".drag-handle",
    data: {
      title: "MongoDB",
      status: "Degraded",
      cpu: 70,
      description: "",
      logo: SERVICE_LOGOS.mongodb,
    },
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
  const setMobilePanelOpen = useAppStore((s) => s.setMobilePanelOpen);
  const setTopbarDropdownOpen = useAppStore(
  (s) => s.setTopbarDropdownOpen
);

  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const { data } = useQuery({
    queryKey: ["graph", selectedAppId],
    queryFn: () => fetchGraph(selectedAppId!),
    enabled: selectedAppId !== "supertokens-golang",
  });

  const getLogoForApp = (appId: string | null) => {
    if (!appId) return null;

    const key = appId.toLowerCase();

    if (key.includes("postgres")) return SERVICE_LOGOS.postgres;
    if (key.includes("redis")) return SERVICE_LOGOS.redis;
    if (key.includes("mongo")) return SERVICE_LOGOS.mongodb;
    if (key.includes("java")) return SERVICE_LOGOS.java;
    if (key.includes("python")) return SERVICE_LOGOS.python;
    if (key.includes("ruby")) return SERVICE_LOGOS.ruby;

    return null;
  };

  useEffect(() => {
    const logo = getLogoForApp(selectedAppId);

    if (selectedAppId === "supertokens-golang") {
      setNodes(
        initialNodes.map((n) => ({
          ...n,
          data: {
            ...n.data,
            ...(logo ? { logo } : {}),
          },
        }))
      );
      setEdges(initialEdges);
    } else if (data) {
      setNodes(
        data.nodes.map((n: Node) => ({
          ...n,
          data: {
            ...n.data,
            ...(logo ? { logo } : {}),
          },
        }))
      );
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
        onNodeClick={(_, node) => {
          setSelectedNodeId(node.id);
          setMobilePanelOpen(true);
        }}
        onPaneClick={() => {
          setSelectedNodeId(null);
          setMobilePanelOpen(false);
          setTopbarDropdownOpen(false);
        }}
      >
        <Controls />
      </ReactFlow>
    </div>
  );
}
