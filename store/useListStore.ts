import { create } from "zustand";

interface ListState {
  lists: Lists;
  setLists: (arg: any) => void;
}

export const useListStore = create<ListState>((set) => ({
  lists: [],
  setLists: (arg) => {
    set((state) => ({
      lists: [...arg],
    }));
  },
}));
