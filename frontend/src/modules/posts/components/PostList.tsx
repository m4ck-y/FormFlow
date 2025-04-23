/**
 * Renders a list of posts using PostCard component.
 */

import React from 'react';
import { Post } from '../post.types';
import { PostCard } from './PostCard';

type Props = {
  posts: Post[];
};

export const PostList: React.FC<Props> = ({ posts }) => {
  return (
    <section className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </section>
  );
};
