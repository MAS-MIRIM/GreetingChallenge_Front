import { create } from 'zustand';

interface SessionState {
  sessionId: string | null;
  setSessionId: (id: string) => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  sessionId: null,
  setSessionId: (id) => set(() => ({ sessionId: id })),
}));
