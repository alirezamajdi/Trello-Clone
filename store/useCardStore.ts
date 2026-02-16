import { create } from "zustand";

interface CardState {
  comments: Comments;
  showComments: { cardId: string; listId: string } | null;
  onShowComments: (
    arg: {
      cardId: string;
      listId: string;
    } | null,
  ) => void;
  onComments: () => void;
}

export const useCardStore = create<CardState>((set) => ({
  comments: [],
  showComments: null,

  onShowComments: (arg) => {
    console.log("ccc", arg);
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
