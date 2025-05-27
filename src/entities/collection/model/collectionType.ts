export interface ICollectionBase {
  title: string;
  songsCount: number;
}

export interface ICollection extends ICollectionBase {
  id: number;
}
