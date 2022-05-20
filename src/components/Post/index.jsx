import { usePost } from "../../hooks/usePost.jsx";
import Link from "next/link";

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.query;
  const API = `https://jsonplaceholder.typicode.com/users/${id}`;
  const user = await fetch(API);
  const userData = await user.json();

  return {
    props: {
      fallback: {
        [API]: userData,
      },
    },
  };
};

export const Post = (props) => {
  const { fallback } = props;
  const { post, user, someComments, error, isLoading } = usePost();

  if (isLoading) {
    return <div>ロード中です。</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }
  console.log("typo");
  return (
    <div>
      <h1>{post?.title}</h1>
      <p>{post?.body}</p>
      <ol>
        {user?.name ? <div>Created By{user?.name}</div> : null}
        {someComments?.map((s) => {
          return (
            <li key={s?.id}>
              <Link href={`../../users/${post?.id}`}>
                <a>{s?.body}</a>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
};
