import create from 'zustand'

interface AppState {
  contactOpen: boolean;
  setContactOpen: (val: boolean) => void;
}

export const useAppStore = create<AppState>(set => ({
  contactOpen: false,
  setContactOpen: (open: boolean) => set(() => ({ contactOpen: open })),
}));