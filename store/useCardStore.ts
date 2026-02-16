import { create } from "zustand";

interface CardState {
  comments: IComments;
  showComments: { cardId: number; listId: number } | null;
  onShowComments: (
    arg: {
      cardId: number;
      listId: number;
    } | null,
  ) => void;
  onComments: () => void;
}

export const useCardStore = create<CardState>((set) => ({
  comments: [],
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
  onComments: () =>
    set((state) => ({
      comments: [],
    })),
}));
