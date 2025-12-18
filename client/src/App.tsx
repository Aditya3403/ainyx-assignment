import "./styles/HomePage.css";

import TopBar from "./components/layout/TopBar";
import LeftRail from "./components/layout/LeftRail";
import GraphCanvas from "./components/canvas/GraphCanvas";
import ServiceNodeInspector from "./components/inspector/ServiceNodeInspector";

export default function HomePage() {
  return (
    <div className="home-root">
      <LeftRail />

      <div className="home-main">
        <TopBar />

        <div className="home-content">
          <div className="home-canvas">
            <GraphCanvas />
          </div>

          <ServiceNodeInspector />
        </div>
      </div>
    </div>
  );
}
