"use client";

import "../../styles/ServiceNodeInspector.css";

import { Badge } from "../../components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { useAppStore } from "../../store/useAppStore";
import { useEffect } from "react";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";

export default function ServiceNodeInspector() {
  const isMobilePanelOpen = useAppStore((s) => s.isMobilePanelOpen);
const setMobilePanelOpen = useAppStore((s) => s.setMobilePanelOpen);
  const selectedNode = useAppStore((s) => s.selectedNode);
  const updateNode = useAppStore((s) => s.updateSelectedNode);
  const activeTab = useAppStore((s) => s.activeInspectorTab);
  const setActiveTab = useAppStore((s) => s.setActiveInspectorTab);

  useEffect(() => {
    if (!selectedNode) return;

    const slider = document.querySelector(
      ".service-native-slider"
    ) as HTMLInputElement | null;

    if (slider) {
      slider.style.setProperty("--value", `${selectedNode.data.cpu}%`);
    }
  }, [selectedNode?.data.cpu]);

  if (!selectedNode) return null;

  const { title, status, cpu, description } = selectedNode.data;

  const statusColor =
    status === "Healthy"
      ? "#4ade80"
      : status === "Degraded"
      ? "#facc15"
      : "#f87171";

  return (
    <aside className={`service-inspector ${
      isMobilePanelOpen ? "open" : ""
    }`}>
      <div className="service-inspector-header">
        <div className="service-header-left">
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

        <button
          className="mobile-close"
          onClick={() => setMobilePanelOpen(false)}
        >
          ✕
        </button>
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
            {/* Slider */}
            <Slider
              value={cpu}
              min={0}
              max={100}
              step={1}
              onChange={(_, value) => {
                updateNode?.({ cpu: value as number });
              }}
              sx={{
                flex: 1,
                color: "#ffffff",
                height: 4,
                padding: "8px 0",

                "& .MuiSlider-track": {
                  border: "none",
                  backgroundColor: "#ffffff",
                },

                "& .MuiSlider-rail": {
                  opacity: 1,
                  backgroundColor: "rgba(255,255,255,0.35)",
                },

                "& .MuiSlider-thumb": {
                  width: 16,
                  height: 16,
                  backgroundColor: "#ffffff",
                  boxShadow: "none", 
                },

                "& .MuiSlider-thumb:hover": {
                  boxShadow: "none", 
                },

                "& .MuiSlider-thumb.Mui-active": {
                  boxShadow: "none",
                },

                "& .MuiSlider-thumb.Mui-focusVisible": {
                  boxShadow: "none",
                },
              }}
            />

            {/* Number Input */}
            <TextField
              type="number"
              value={cpu}
              onChange={(e) => {
                let val = Number(e.target.value);
                if (Number.isNaN(val)) return;

                val = Math.max(0, Math.min(100, val));
                updateNode?.({ cpu: val });
              }}
              inputProps={{
                min: 0,
                max: 100,
                step: 1,
              }}
              sx={{
                width: 64,

                "& input": {
                  padding: "8px",
                  textAlign: "center",
                  color: "#ffffff",
                },

                "& .MuiOutlinedInput-root": {
                  background: "rgba(255,255,255,0.08)",
                  borderRadius: "10px",

                  "& fieldset": {
                    borderColor: "rgba(255,255,255,0.12)",
                  },

                  "&:hover fieldset": {
                    borderColor: "rgba(255,255,255,0.25)",
                  },

                  "&.Mui-focused fieldset": {
                    borderColor: "#ffffff",
                  },
                },
              }}
            />
          </div>
        </TabsContent>

      </Tabs>
    </aside>
  );
}
