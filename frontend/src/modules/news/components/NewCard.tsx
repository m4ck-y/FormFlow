// src/features/news/components/NewsCard.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { NewsPost } from "../new.type";

type Props = {
  post: NewsPost;
};

export const NewsCard: React.FC<Props> = ({ post }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/news/${post.id}`);
  };

  return (
    <article
      onClick={handleClick}
      className="cursor-pointer border rounded-md shadow-sm overflow-hidden bg-white hover:shadow-md transition"
    >
      <div style={{position: "relative", height: "200px", width: "100%", aspectRatio: "4/3"}}>
        <img
        src={post.mainImageUrl}
        alt={post.title}
        className="w-full object-cover"
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{post.title}</h3>
        <p className="text-sm text-gray-600 mb-2">
          {post.author.name} • {new Date(post.createdAt).toLocaleDateString()}
        </p>
      </div>
    </article>
  );
};
