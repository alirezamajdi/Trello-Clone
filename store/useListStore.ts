import { create } from "zustand";

interface ListState {
  lists: ILists;
  setLists: (arg: any) => void;
  activeAddCard: number | null;
  onActiveAddCard: (arg: number | null) => void;
}

export const useListStore = create<ListState>((set) => ({
  lists: [],
  activeAddCard: null,
  onActiveAddCard: (arg) => {
    set((state) => ({
      activeAddCard: arg,
    }));
  },
  setLists: (arg) => {
    set((state) => ({
      lists: [...arg],
    }));
  },
}));
