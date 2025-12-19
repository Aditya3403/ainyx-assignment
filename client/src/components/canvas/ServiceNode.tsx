import { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import "../../styles/ServiceNode.css";
import { Cpu, Cylinder, HardDrive,MemoryStick, Settings } from "lucide-react";
import { FaAws } from "react-icons/fa";
import Slider from "@mui/material/Slider";

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
      <div className="service-node-header drag-handle">
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

      <div className="service-node-slider-row nodrag">
        <Slider
          value={sliderPos}
          min={MIN}
          max={MAX}
          step={1}
          onChange={(_, value) =>
            data.onChange({ slider: value as number })
          }

          onMouseDownCapture={(e) => e.stopPropagation()}
          onPointerDownCapture={(e) => e.stopPropagation()}
          onTouchStartCapture={(e) => e.stopPropagation()}

          sx={{
            flex: 1,
            height: 6,
            padding: 0,

            "& .MuiSlider-rail": {
              backgroundColor: "#1d1d1d",
              opacity: 1,
              borderRadius: 999,
            },

            "& .MuiSlider-track": {
              border: "none",
              borderRadius: 999,
              backgroundImage: `
                linear-gradient(
                  90deg,
                  #3b82f6,
                  #22c55e,
                  #f97316,
                  #ef4444
                )
              `,
            },

            "& .MuiSlider-thumb": {
              width: 14,
              height: 14,
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
        
        <input
          type="number"
          value={sliderPos}

          onMouseDownCapture={(e) => e.stopPropagation()}
          onPointerDownCapture={(e) => e.stopPropagation()}
          onTouchStartCapture={(e) => e.stopPropagation()}

          onChange={(e) => {
            let val = Number(e.target.value);
            if (Number.isNaN(val)) return;

            val = Math.max(MIN, Math.min(MAX, val));
            data.onChange({ slider: val });
          }}

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
