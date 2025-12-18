"use client";

import "../../styles/TopBar.css";

import { Button } from "../ui/button";
import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Ellipsis,
  Plus,
  Search,
} from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchApps } from "../../api/mockApi";
import { useAppStore } from "../../store/useAppStore";

export default function TopBar() {
  const [ishide, setIsHide] = useState(true);
  const selectedAppId = useAppStore((s) => s.selectedAppId);
  const setSelectedAppId = useAppStore((s) => s.setSelectedAppId);

  const { data: apps, isLoading, isError } = useQuery({
    queryKey: ["apps"],
    queryFn: fetchApps,
  });

  return (
    <header className="topbar">
      <div className="relative">
        <div className="topbar-app">
          <div className="topbar-app-left">
            <div className="topbar-app-icon" />
            <div className="topbar-app-badge">S</div>
            <span className="topbar-app-name">{selectedAppId}</span>
          </div>

          <div className="topbar-app-right">
            {ishide ? (
              <ChevronDown
                size={18}
                className="text-white/50 cursor-pointer"
                onClick={() => setIsHide(false)}
              />
            ) : (
              <ChevronUp
                size={18}
                className="text-white/50 cursor-pointer"
                onClick={() => setIsHide(true)}
              />
            )}
            <Ellipsis size={18} className="text-white/50" />
          </div>
        </div>

        <div className={`topbar-dropdown ${ishide ? "hidden" : ""}`}>
          <div className="topbar-dropdown-title">Application</div>

          <div className="topbar-search-row">
            <div className="topbar-search-wrapper">
              <Search
                size={14}
                className="topbar-search-icon"
              />
              <input
                placeholder="Search..."
                className="topbar-search-input"
              />
            </div>

            <button className="topbar-add-btn">
              <Plus size={14} />
            </button>
          </div>

          <div>
            {apps?.map((app) => (
              <div
                key={app}
                className="topbar-app-item"
                onClick={() => setSelectedAppId(app)}
              >
                <div className="topbar-app-item-icon" />
                <span style={{ flex: 1 }}>{app}</span>
                <ChevronRight size={16} className="text-white/50" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ flex: 1 }} />

      <div className="topbar-actions">
        <Button size="sm" variant="ghost">Fit</Button>
        <Button size="sm" variant="ghost">Settings</Button>
        <div className="topbar-avatar">N</div>
      </div>
    </header>
  );
}
