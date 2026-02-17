import { useListStore } from '@/store/useListStore';
import React, { useState } from 'react'
import { useBoardStorage } from './useBoardStorage';
import { useCardStore } from '@/store/useCardStore';

export const useAddComment = () => {
     const { showComments } = useCardStore();
    const [comment, setComment] = useState("");
    const { lists, setLists } = useListStore();
    const { setAllLists } = useBoardStorage();
  
    const handleAddComment = () => {
      if (!showComments || !comment.trim()) return;
  
      const newLists = lists.map((list) => {
        if (list.id !== showComments.listId) return list;
  
        return {
          ...list,
          cards: list.cards.map((card) => {
            if (card.id !== showComments.cardId) return card;
  
            return {
              ...card,
              comments: [
                ...card.comments,
                {
                  title: comment,
                  date: new Date().toISOString(),
                },
              ],
            };
          }),
        };
      });
      setLists(newLists);
      setAllLists(newLists);
      setComment("");
    };

    return { handleAddComment, comment, setComment };
}
