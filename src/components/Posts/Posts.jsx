import PaginationContainer from "../../containers/Pagination/Pagination";
import PostShort from "../PostShort/PostShort";

export default function Posts({ posts }) {
  if (!posts && !posts.length) {
    <div>Posts not found</div>;
  }

  return (
    <>
      {posts
        .map((post) => {
          return <PostShort post={post} key={post.id} />;
        })
        .reverse()}
      {/* <PaginationContainer /> */}
    </>
  );
}
