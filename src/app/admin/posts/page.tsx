import PostList from "@/app/components/posts/PostList";
import { NextPage } from "next";
import Link from "next/link";

const PostListpage: NextPage = () => {
  return (
    <div className="mt-10 w-full px-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold inline-block">記事一覧</h1>
        <Link
          href={"/admin/posts/new"}
          className="px-6 py-2 bg-sky-500 text-white font-semibold rounded-lg"
        >
          新規作成
        </Link>
      </div>
      <PostList />
    </div>
  );
};

export default PostListpage;
