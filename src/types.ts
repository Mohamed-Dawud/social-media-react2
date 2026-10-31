export type User = {
  _id: string;
  name: string;
  username?: string;
  photo?: string;
};

export type Post = {
  _id: string;
  body: string;
  image?: string;
  user: User;
  createdAt: string;
  commentsCount?: number;
};

export type Comment = {
  _id: string;
  content: string;
  commentCreator?: User;
  user?: User;
  createdAt: string;
};