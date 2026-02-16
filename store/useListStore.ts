import { create } from "zustand";

interface ListState {
  lists: ILists;
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
