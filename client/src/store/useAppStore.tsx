import { create } from "zustand";

export type AppState = {
  selectedAppId: string | null;
  setSelectedAppId: (id: string | null) => void;

  selectedNodeId: string | null;
  selectedNode?: any;
  updateSelectedNode?: (data: any) => void;
  setSelectedNodeId: (id: string | null) => void;

  activeInspectorTab: "config" | "runtime";
  setActiveInspectorTab: (tab: "config" | "runtime") => void;

  isMobilePanelOpen: boolean;
  setMobilePanelOpen: (open: boolean) => void;

  isTopbarDropdownOpen: boolean;
  setTopbarDropdownOpen: (open: boolean) => void;
};

export const useAppStore = create<AppState>((set) => ({
  selectedAppId: "supertokens-golang",
  selectedNodeId: null,
  selectedNode: undefined,

  activeInspectorTab: "config",

  isTopbarDropdownOpen: false,
  setTopbarDropdownOpen: (open) => set({ isTopbarDropdownOpen: open }),
  isMobilePanelOpen: false,
  setMobilePanelOpen: (open) => set({ isMobilePanelOpen: open }),

  setSelectedAppId: (id) => set({ selectedAppId: id }),
  setSelectedNodeId: (id) => set({ selectedNodeId: id }),
  setActiveInspectorTab: (tab) => set({ activeInspectorTab: tab }),
}));
