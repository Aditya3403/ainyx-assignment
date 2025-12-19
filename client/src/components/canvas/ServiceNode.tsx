import { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import "../../styles/ServiceNode.css";
import { Cpu, Cylinder, HardDrive,MemoryStick, Settings } from "lucide-react";
import { FaAws } from "react-icons/fa";

const ServiceNode = memo(({ data }: any) => {
  const tabs = [
    { label: "CPU", icon: Cpu },
    { label: "Memory", icon: MemoryStick },
    { label: "Disk", icon: HardDrive },
    { label: "Region", icon: Cylinder },
  ];

  const MIN = 0;
  const MAX = 100;

  const sliderPos = data.slider ?? 50;

  return (
    <div className="service-node">
      <div className="service-node-header">
        <div className="service-node-title-wrap">
          <div className="service-node-logo-wrap">
            <img src={data.logo} className="service-node-logo" />
          </div>
          <span className="service-node-title">{data.title}</span>
        </div>

        <div className="service-node-price-icon">
          <div className="service-node-price">$0.03 / HR</div>
          <Settings size={14} className="service-node-icon" />
        </div>
      </div>

      <div className="service-node-metrics">
        <span>0.02</span>
        <span>0.05 GB</span>
        <span>10.00 GB</span>
        <span>1</span>
      </div>

      <div className="service-node-tabs">
        {tabs.map(({ label, icon: Icon }) => (
          <div
            key={label}
            className={`service-node-tab ${
              label === "CPU" ? "active" : ""
            }`}
          >
            <Icon size={14} className="service-node-tab-icon" />
            <span>{label}</span>
          </div>
        ))}
      </div>

      <div className="service-node-slider-row">
        <input
          type="range"
          min={MIN}
          max={MAX}
          value={sliderPos}
          onChange={(e) =>
            data.onChange({
              slider: Number(e.target.value),
            })
          }
          className="service-node-slider-input"
          style={{
            backgroundSize: `${sliderPos}% 100%`,
          }}
        />

        <input
          type="number"
          value={sliderPos}
          onChange={(e) =>
            data.onChange({
              slider: Number(e.target.value),
            })
          }
          className="service-node-slider-value"
        />
      </div>
      
      <div
        className={`service-node-status ${
          data.status === "success" ? "success" : "error"
        }`}
      >
        {data.status === "success" ? "● Success" : "▲ Error"}
      </div>

      <div className="service-node-provider"><FaAws size={25}/></div>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
});

export default ServiceNode;
