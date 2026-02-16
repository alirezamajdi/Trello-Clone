import { create } from "zustand";

interface CardState {
  showComments: { cardId: number; listId: number } | null;
  onShowComments: (
    arg: {
      cardId: number;
      listId: number;
    } | null,
  ) => void;
}

export const useCardStore = create<CardState>((set) => ({
  showComments: null,

  onShowComments: (arg) => {
    if (!arg) {
      set((state) => ({
        showComments: null,
      }));
    } else {
      set((state) => ({
        showComments: { ...arg },
      }));
    }
  },
}));
