interface Comment {
  author: Author;
  id: string;
  createdAt: Date;
  updatedAt?: Date;
  body: string;
}
