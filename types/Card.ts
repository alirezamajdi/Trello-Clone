interface IComment {
  date: string;
  title: string;
}
interface ICard {
  id: number;
  title: string;
  comments: IComment[];
  level?: number;
}
