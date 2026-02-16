"use client";

import { FC, useRef, useState } from "react";
import dynamic from "next/dynamic";
import styles from "./List.module.scss";
import Ellipsis from "@/assets/icons/Ellipsis";
import Card from "@/app/components/kit/Card/Card";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import AddCard from "@/app/components/kit/AddCard/AddCard";

import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useListStore } from "@/store/useListStore";
import { useLists } from "@/hooks/useLists";

const Action = dynamic(() => import("./Action"), {
  ssr: false,
});

interface IProps extends IList {
  dragHandleProps?: any; // from Board
}

interface CardItem {
  id: number;
  content: string;
}

function SortableCard({
  id,
  listId,
  comments,
  content,
}: {
  id: number;
  listId: number;
  content: string;
  comments: IComment[];
}) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1000 : "auto",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card listId={listId} id={id} content={content} comments={comments} />
    </div>
  );
}

const List: FC<IProps> = ({ title, id, dragHandleProps, cards }) => {
  const actionRef = useRef(null);
  const [openAction, setOpenAction] = useState(false);
  const [openAddCard, setOpenAddCard] = useState(false);
  const { lists, setLists } = useListStore();
  const { setAllLists } = useLists();

  useOnClickOutside(actionRef, () => setOpenAction(false));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;
    const selectedCard = lists.find((item) => item.id == id);
    const oldIndex = selectedCard?.cards?.findIndex((l) => l.id === active.id);
    const newIndex = selectedCard?.cards?.findIndex((l) => l.id === over.id);

    const newCards = arrayMove(selectedCard?.cards!, oldIndex!, newIndex!);
    newCards.forEach((list, idx) => (list.level = idx));

    const newLists = lists?.map((item) => {
      if (item.id == id) {
        return { ...item, cards: newCards };
      } else {
        return item;
      }
    });

    setLists(newLists);
    setAllLists(newLists);
  };

  return (
    <div className={styles["list"]}>
      {/* 🔹 List Header (Drag Handle for List) */}
      <div className={styles["list__header"]} {...dragHandleProps}>
        <h2 className={styles["list__title"]}>{title}</h2>

        <div ref={actionRef} className="relative">
          <button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => setOpenAction(true)}
          >
            <Ellipsis width="20" height="20" />
          </button>

          {openAction && <Action id={id} setOpenAction={setOpenAction} />}
        </div>
      </div>

      {/* 🔹 Cards Drag & Drop */}
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={cards.map((c) => c.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className={styles["list__content"]}>
            {cards.map((card) => (
              <SortableCard
                key={card.id}
                id={card.id}
                listId={id}
                comments={card.comments}
                content={card.title}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* 🔹 Add Card */}
      {openAddCard ? (
        <AddCard listId={id} setOpenAddCard={setOpenAddCard} />
      ) : (
        <button
          onClick={() => setOpenAddCard(true)}
          className={styles["list__footer"]}
        >
          + Add another card
        </button>
      )}
    </div>
  );
};

export default List;
