"use client";

import "../../styles/TopBar.css";

import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Ellipsis,
  Moon,
  Plus,
  Search,
  Share2,
  Sun,
  User,
} from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchApps } from "../../api/mockApi";
import { useAppStore } from "../../store/useAppStore";
import { HiOutlineLightBulb } from "react-icons/hi";
import { FiSettings } from "react-icons/fi";
import { LuRocket } from "react-icons/lu";
import { PiNotepad } from "react-icons/pi";

export default function TopBar() {
  const [ishide, setIsHide] = useState(true);
  const [isDark, setIsDark] = useState(true);
  const selectedAppId = useAppStore((s) => s.selectedAppId);
  const setSelectedAppId = useAppStore((s) => s.setSelectedAppId);
  const { data: apps} = useQuery({
    queryKey: ["apps"],
    queryFn: fetchApps,
  });

  const APP_ICONS: Record<
    string,
    { icon: React.ReactNode; bg: string }
  > = {
    "supertokens-golang": {
      icon: <HiOutlineLightBulb size={18} />,
      bg: "#6366F1",
    },
    "supertokens-java": {
      icon: <FiSettings size={18} />,
      bg: "#8B5CF6", 
    },
    "supertokens-python": {
      icon: <LuRocket size={18} />,
      bg: "#EF4444",
    },
    "supertokens-ruby": {
      icon: <PiNotepad size={18} />,
      bg: "#EC4899",
    },
  };

  return (
    <header className="topbar">
      <div className="relative">
        <div className="topbar-app">
          <div className="topbar-app-left">
            <div className="topbar-app-icon" />

            <div
              className="topbar-app-badge"
              style={{
                background: APP_ICONS[selectedAppId ?? ""]?.bg ?? "#6366F1",
              }}
            >
              {APP_ICONS[selectedAppId ?? ""]?.icon ?? (
                <HiOutlineLightBulb size={18} />
              )}
            </div>

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
                <div
                  className="topbar-app-item-icon"
                  style={{ background: APP_ICONS[app]?.bg }}
                >
                  {APP_ICONS[app]?.icon}
                </div>
                <span style={{ flex: 1 }}>{app}</span>
                <ChevronRight size={16} className="text-white/50" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ flex: 1 }} />

     <div className="topbar-actions">
        {/* Share */}
        <button className="topbar-action-btn">
          <Share2 size={16} />
        </button>

        {/* Theme toggle */}
        <button
          className="theme-toggle"
          onClick={() => setIsDark((prev) => !prev)}
        >
          <Moon size={18} className="theme-icon moon" />
          <Sun size={18} className="theme-icon sun" />
          <span className={`theme-thumb ${isDark ? "dark" : "light"}`} />
        </button>

        {/* Avatar */}
        <button className="topbar-action-btn avatar">
          <User size={16} />
        </button>
      </div>
      
    </header>
  );
}
