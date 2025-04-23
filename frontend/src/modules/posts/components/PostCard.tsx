/**
 * Displays an individual post with user information, content and actions.
 */

import React from 'react';
//import { Post } from '../types/post.types';
import { Post } from '../post.types';
import { PostActions } from './PostActions';
import { CommentList } from './CommentList';

type Props = {
  post: Post;
};

export const PostCard: React.FC<Props> = ({ post }) => {
  return (
    <article className="rounded-md border p-4 shadow-sm bg-white">
      <div className="flex items-center gap-3 mb-2">
        <img
          src={post.author.avatarUrl}
          alt={post.author.name}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h4 className="font-semibold">{post.author.name}</h4>
          <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
        </div>
      </div>
      <p className="mb-3 text-gray-800">{post.content}</p>
      <PostActions postId={post.id} />
      <CommentList comments={post.comments} />
    </article>
  );
};
