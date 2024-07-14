import { create } from "zustand";

type Store = {
  currentUserEmail: string;
  setCurrentUserEmail: (email: string) => void;
};

export const useStore = create<Store>((set) => ({
  currentUserEmail: "",
  setCurrentUserEmail: (email: string) => set({ currentUserEmail: email }),
}));
