interface Article {
  author: Author;
  body: string;
  createdAt: Date;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: string[];
  title: string;
  updatedAt: Date;
}
