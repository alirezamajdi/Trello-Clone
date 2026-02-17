import React, {
  FC,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useRef,
} from "react";
import styles from "./AddCard.module.scss";
import Textarea from "@/app/components/ui/Textarea/Textarea";
import Button from "@/app/components/ui/Button/Button";
import Close from "@/assets/icons/Close";
import { useListStore } from "@/store/useListStore";
import { useBoardStorage } from "@/hooks/useBoardStorage";
interface IProps {
  setOpenAddCard: Dispatch<SetStateAction<boolean>>;
  listId: number;
}
const AddCard: FC<IProps> = (props) => {
  const { setOpenAddCard, listId } = props;
  const [cardTitle, setCardTitle] = useState("");
  const { lists, setLists } = useListStore();
  const { setAllLists } = useBoardStorage();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (cardTitle === "") {
      textareaRef.current?.focus();
    }
  }, [cardTitle]);

  const handleAdd = () => {
    if (!cardTitle) return;
    let selectedList = lists.find((item) => item?.id == listId);
    let otherLists = lists.filter((item) => item.id !== listId);

    if (!selectedList) return; // exit if not found

    // Find max card id across all lists
    const allCards = lists.flatMap((l) => l.cards || []);
    const maxId =
      allCards.length > 0 ? Math.max(...allCards.map((c) => c.id)) : 0;

    const newCard = {
      title: cardTitle,
      comments: [],
      id: maxId + 1,
      level: selectedList.cards.length + 1,
    };

    if (selectedList.cards && selectedList.cards.length > 0) {
      selectedList.cards = [...selectedList.cards, newCard];
    } else {
      selectedList.cards = [newCard];
    }

    setLists([...otherLists, selectedList]);
    setAllLists([...otherLists, selectedList]);
    setCardTitle("");
  };

  return (
    <div className={styles["addCard"]}>
      <Textarea
        value={cardTitle}
        onChange={(e) => setCardTitle(e.target.value)}
        placeholder="Enter a card title..."
        ref={textareaRef}
      />
      <div>
        <Button onClick={handleAdd} variant="success">
          Create card
        </Button>
        <button
          className={styles["addCard-close"]}
          onClick={() => setOpenAddCard(false)}
        >
          <Close width="17" height="17" />
        </button>
      </div>
    </div>
  );
};

export default AddCard;
