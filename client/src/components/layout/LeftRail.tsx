"use client";

import "../../styles/LeftRail.css";

import {
  SiGithub,
  SiPostgresql,
  SiRedis,
  SiMongodb,
} from "react-icons/si";
import {
  Box,
  Layers,
  Network,
} from "lucide-react";

export default function LeftRail() {
  return (
    <aside className="left-rail">
      <div className="left-rail-inner">
        <IconWrapper>
          <SiGithub size={18} color="#ffffff" />
        </IconWrapper>

        <IconWrapper>
          <SiPostgresql size={18} color="#336791" />
        </IconWrapper>

        <IconWrapper>
          <SiRedis size={18} color="#dc382d" />
        </IconWrapper>

        <IconWrapper>
          <SiMongodb size={18} color="#47a248" />
        </IconWrapper>

        <IconWrapper>
          <Box size={18} style={{ color: "oklch(70.7% 0.022 261.325)" }} />
        </IconWrapper>

        <IconWrapper>
          <Layers size={18} style={{ color: "oklch(90.5% 0.182 98.111)" }} />
        </IconWrapper>

        <IconWrapper>
          <Network size={18} style={{ color: "oklch(79.2% 0.209 151.711)" }} />
        </IconWrapper>
      </div>
    </aside>
  );
}

function IconWrapper({ children }: { children: React.ReactNode }) {
  return <div className="left-rail-icon">{children}</div>;
}
