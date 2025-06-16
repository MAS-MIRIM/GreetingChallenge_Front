import { create } from 'zustand';

interface TimerState {
  seconds: number;
  start: () => void;
  reset: () => void;
}

export const useTimerStore = create<TimerState>((set, get) => {
  let interval: NodeJS.Timeout | null = null;

  return {
    seconds: 0,
    start: () => {
      if (interval) return;
      interval = setInterval(() => {
        set(state => ({ seconds: state.seconds + 1 }));
      }, 1000);
    },
    reset: () => {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
      set({ seconds: 0 });
    }
  };
});