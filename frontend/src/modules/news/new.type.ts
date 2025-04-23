// src/features/news/types/news.types.ts

export type NewsAuthor = {
  id: string;
  name: string;
  avatarUrl?: string;
};

export type NewsPost = {
  id: string;
  title: string;
  author: NewsAuthor;
  link: string; // URL to the full article
  summary?: string; // optional short preview
  mainImageUrl: string;
  createdAt: string; // ISO 8601
  content: string; // full content for detail view
};
