"use client";

import "../../styles/ServiceNodeInspector.css";

import { Badge } from "../../components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { useAppStore } from "../../store/useAppStore";
import { useEffect } from "react";

export default function ServiceNodeInspector() {
  const selectedNode = useAppStore((s) => s.selectedNode);
  const updateNode = useAppStore((s) => s.updateSelectedNode);
  const activeTab = useAppStore((s) => s.activeInspectorTab);
  const setActiveTab = useAppStore((s) => s.setActiveInspectorTab);

  // ✅ ALWAYS CALL HOOKS
  useEffect(() => {
    if (!selectedNode) return;

    const slider = document.querySelector(
      ".service-native-slider"
    ) as HTMLInputElement | null;

    if (slider) {
      slider.style.setProperty("--value", `${selectedNode.data.cpu}%`);
    }
  }, [selectedNode?.data.cpu]);

  // ✅ SAFE EARLY RETURN AFTER HOOKS
  if (!selectedNode) return null;

  const { title, status, cpu, description } = selectedNode.data;

  const statusColor =
    status === "Healthy"
      ? "#4ade80"
      : status === "Degraded"
      ? "#facc15"
      : "#f87171";

  return (
    <aside className="service-inspector">
      <div className="service-inspector-header">
        <h3 className="service-inspector-title">{title}</h3>
        <Badge
  variant="outline"
  className="service-status-badge"
  style={{
    color: statusColor,
    borderColor: statusColor,
  }}
>
  {status}
</Badge>

      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
        <TabsList className="service-inspector-tabs-list">
          <TabsTrigger value="config">Config</TabsTrigger>
          <TabsTrigger value="runtime">Runtime</TabsTrigger>
        </TabsList>

        <TabsContent value="config" className="service-inspector-section">
          <Input
            value={title}
            onChange={(e) => updateNode?.({ title: e.target.value })}
            placeholder="Service name"
          />
          <Textarea
            value={description}
            onChange={(e) =>
              updateNode?.({ description: e.target.value })
            }
            placeholder="Description"
          />
        </TabsContent>

        <TabsContent value="runtime" className="service-inspector-section">
          <div className="service-inspector-runtime">
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={cpu}
              onChange={(e) =>
                updateNode?.({ cpu: Number(e.target.value) })
              }
              className="service-native-slider"
            />

            <div className="service-slider-value">{cpu}</div>
          </div>
        </TabsContent>
      </Tabs>
    </aside>
  );
}
