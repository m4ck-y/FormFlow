import type { Post } from "./post.types";

const mockPosts: Post[] = [
  {
    id: "post-1",
    author: {
      id: "user-1",
      name: "Alice Johnson",
      avatarUrl: "https://i.pravatar.cc/150?img=11",
    },
    content: "Just got promoted to Senior Developer at TechCorp! 🎉",
    createdAt: new Date().toISOString(),
    comments: [
      {
        id: "comment-1",
        author: {
          id: "user-2",
          name: "Bob Smith",
          avatarUrl: "https://i.pravatar.cc/150?img=12",
        },
        content: "Congrats, Alice! Well deserved! 👏",
        createdAt: new Date().toISOString(),
      },
    ],
  },
  {
    id: "post-2",
    author: {
      id: "user-3",
      name: "Clara Mendoza",
      avatarUrl: "https://i.pravatar.cc/150?img=14",
    },
    content:
      "Anyone here using FastAPI in production? Looking to share experiences!",
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
    comments: [],
  },
];

export default  mockPosts;