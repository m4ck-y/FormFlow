export type Author = {
  id: string;
  name: string;
  avatarUrl: string;
};

export type Comment = {
  id: string;
  author: Author;
  content: string;
  createdAt: string;
};

export type Post = {
  id: string;
  author: Author;
  content: string;
  createdAt: string;
  comments: Comment[];
};
