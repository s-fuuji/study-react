import Link from "next/link";
import { usePost } from "../../hooks/usePost";

export const PostList = () => {
  const { posts, error, isLoading } = usePost();

  if (isLoading) {
    return <div>ロード中です。</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <ol>
      {posts.map((post) => {
        return (
          <li key={post.id}>
            <Link href={`/PostList/${post.id}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        );
      })}
    </ol>
  );
};
