interface IComment {
  date: string;
  title: string;
}
interface IList {
  title: string;
  cards: { id: number; title: string; comments: IComment[]; level: number }[];
  id: number;
  level: number;
}

type ILists = IList[];
