import { create } from 'zustand';

interface SoundState {
  muted: boolean;
  toggleMute: () => void;
  setMute: (value: boolean) => void;
}

export const useSoundStore = create<SoundState>((set) => ({
  muted: false,
  toggleMute: () => set((state) => ({ muted: !state.muted })),
  setMute: (value) => set({ muted: value }),
}));