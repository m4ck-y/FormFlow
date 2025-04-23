import { PostList } from "./components/PostList";
import mockPosts from "./post.mook.data";


const PostsIndex = () => {
    return (
        <main className="p-4">
            <h1 className="text-2xl font-bold mb-4">Posts</h1>
            <PostList posts={mockPosts} />
        </main>
    );
};

export default PostsIndex;