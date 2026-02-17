"use client";
import styles from "./Board.module.scss";
import List from "@/app/components/kit/List/List";
import AddList from "@/app/components/kit/Shared/AddList/AddList";
import {
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useListStore } from "@/store/useListStore";

function SortableList(props: IList) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className={styles.listWrapper}>
      <List {...props} dragHandleProps={{ ...attributes, ...listeners }} />
    </div>
  );
}
const Lists = () => {
  const { lists } = useListStore();
  return (
    <div className={styles.board__lists}>
      <SortableContext
        items={lists.map((l) => l.id)}
        strategy={horizontalListSortingStrategy}
      >
        {lists
          .sort((a, b) => a.level - b.level)
          .map((list) => (
            <SortableList key={list.id} {...list} />
          ))}
      </SortableContext>
      <AddList />
    </div>
  );
};

export default Lists;
