import { create } from 'zustand'

const useHubPanelStore = create((set) => ({
  activePanel: null,
  openPanel: (panel) => set({ activePanel: panel }),
  closePanel: () => set({ activePanel: null }),
}))

export default useHubPanelStore
