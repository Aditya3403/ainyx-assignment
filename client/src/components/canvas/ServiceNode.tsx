import { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import "../../styles/ServiceNode.css";

const ServiceNode = memo(({ data }: any) => {
  return (
    <div className="service-node">
      {/* Header */}
      <div className="service-node-header">
        <div className="service-node-title">{data.title}</div>
        <div className="service-node-price">$0.03 / HR</div>
      </div>

      {/* Metrics */}
      <div className="service-node-metrics">
        <span>0.02</span>
        <span>0.05 GB</span>
        <span>10.00 GB</span>
        <span>1</span>
      </div>

      {/* Tabs */}
      <div className="service-node-tabs">
        {["CPU", "Memory", "Disk", "Region"].map((tab) => (
          <div
            key={tab}
            className={`service-node-tab ${
              tab === "CPU" ? "active" : ""
            }`}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Slider */}
      <div className="service-node-slider" />

      {/* Status */}
      <div
        className={`service-node-status ${
          data.status === "success" ? "success" : "error"
        }`}
      >
        {data.status === "success" ? "● Success" : "▲ Error"}
      </div>

      {/* Provider */}
      <div className="service-node-provider">aws</div>

      {/* Handles */}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
});

export default ServiceNode;
