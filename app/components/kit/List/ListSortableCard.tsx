import Card from "@/app/components/kit/Card/Card";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableCard({
  id,
  listId,
  comments,
  title,
}: {
  id: number;
  listId: number;
  title: string;
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
    opacity: isDragging ? 0 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card listId={listId} id={id} title={title} comments={comments} />
    </div>
  );
}
export default SortableCard;
