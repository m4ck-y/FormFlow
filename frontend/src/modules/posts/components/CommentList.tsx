/**
 * Renders a list of comments for a given post.
 */

import React from 'react';
import { Comment } from '../post.types';

type Props = {
  comments: Comment[];
};

export const CommentList: React.FC<Props> = ({ comments }) => {
  if (!comments?.length) return null;

  return (
    <div className="mt-4 space-y-2 border-t pt-3 text-sm text-gray-700">
      {comments.map((comment) => (
        <div key={comment.id} className="flex gap-2">
          <strong>{comment.author.name}</strong>
          <span>{comment.content}</span>
        </div>
      ))}
    </div>
  );
};
