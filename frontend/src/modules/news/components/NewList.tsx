// src/features/news/components/NewsList.tsx

import React from "react";
import { NewsPost } from "../../../domain/data/new.source";
import { NewsCard } from "./NewCard";

type Props = {
  posts: NewsPost[];
};

export const NewsList: React.FC<Props> = ({ posts }) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{
      gap: "1.5rem",
    }}>
      {posts.map((post) => (
        <NewsCard key={post.id} post={post} />
      ))}
    </section>
  );
};
