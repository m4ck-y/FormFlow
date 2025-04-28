// src/features/news/components/NewsList.tsx

import React from "react";
import { NewsCard } from "./NewCard";
import { NewPost } from "@/domain/entity/NewPost";

type Props = {
  posts: NewPost[];
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
