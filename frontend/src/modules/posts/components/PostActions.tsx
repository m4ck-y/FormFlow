/**
 * Renders post action buttons (like, comment, share).
 */

import React from 'react';

type Props = {
  postId: string;
};

export const PostActions: React.FC<Props> = ({ postId }) => {
  const handleLike = () => {
    console.log(`Liked post ${postId}`);
  };

  const handleShare = () => {
    console.log(`Shared post ${postId}`);
  };

  return (
    <div className="flex gap-4 mt-3 text-sm text-blue-600">
      <button onClick={handleLike} className="hover:underline">
        Like
      </button>
      <button className="hover:underline">Comment</button>
      <button onClick={handleShare} className="hover:underline">
        Share
      </button>
    </div>
  );
};
