import { useCallback } from "react";
import { useAppStore } from "../../store/useAppStore";
import type{ Node } from "@xyflow/react";

export function useGraphInteractions(
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>
) {
  const setSelectedNodeId = useAppStore((s) => s.setSelectedNodeId);

  const onNodeClick = useCallback((_: any, node: Node) => {
    setSelectedNodeId(node.id);
  }, []);

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Delete" || event.key === "Backspace") {
        setNodes((nodes) =>
          nodes.filter((n) => n.id !== useAppStore.getState().selectedNodeId)
        );
        setSelectedNodeId(null);
      }
    },
    []
  );

  return { onNodeClick, onKeyDown };
}
