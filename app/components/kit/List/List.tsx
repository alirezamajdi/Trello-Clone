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

const Action = dynamic(() => import("./Action"), {
  ssr: false,
});

interface IProps {
  title: string;
  id: string;
  dragHandleProps?: any; // from Board
}

interface CardItem {
  id: string;
  content: string;
}

function SortableCard({
  id,
  listId,
  content,
}: {
  id: string;
  listId: string;
  content: string;
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
      <Card
        listId={listId}
        id={id}
        content={content}
        comments={[{ date: "", comment: "" }]}
      />
    </div>
  );
}

const List: FC<IProps> = ({ title, id, dragHandleProps }) => {
  const actionRef = useRef(null);
  const [openAction, setOpenAction] = useState(false);
  const [openAddCard, setOpenAddCard] = useState(false);

  // Cards state
  const [cards, setCards] = useState<CardItem[]>([
    { id: `${id}-1`, content: "Create interview Kanban" },
    { id: `${id}-2`, content: "Prepare questions" },
  ]);

  useOnClickOutside(actionRef, () => setOpenAction(false));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setCards((prev) => {
      const oldIndex = prev.findIndex((c) => c.id === active.id);
      const newIndex = prev.findIndex((c) => c.id === over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  return (
    <div className={styles["list"]}>
      {/* 🔹 List Header (Drag Handle for List) */}
      <div className={styles["list__header"]} {...dragHandleProps}>
        <h2 className={styles["list__title"]}>{title}</h2>

        <div ref={actionRef} className="relative">
          <button onClick={() => setOpenAction(true)}>
            <Ellipsis width="20" height="20" />
          </button>

          {openAction && <Action setOpenAction={setOpenAction} />}
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
                content={card.content}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* 🔹 Add Card */}
      {openAddCard ? (
        <AddCard setOpenAddCard={setOpenAddCard} />
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
