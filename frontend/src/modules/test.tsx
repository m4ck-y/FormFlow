import Profile from "./account/profile";
import Suggest from "./account/suggest";
import PostsIndex from "./posts/index";
import {NewsFeedPage} from "./news/index";
const TestUI = () => {
  return (
    <div>
      <h1>Test UI</h1>
      <p>This is a test component.</p>
      <div
        style={{
          border: "1px solid black",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Profile />
        <Suggest />
      </div>
      {/* <PostsIndex /> */}
      <NewsFeedPage />
    </div>
  );
};

export default TestUI;
