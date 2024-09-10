"use client";
import { Posts, UpdatePostBody } from "@/app/_types/request/posts";
import PostDelBtn from "@/app/components/posts/PostDelBtn";
import PostEditBtn from "@/app/components/posts/PostEditBtn";
import SelectCategory from "@/app/components/posts/SelectCategory";
import { useParams, useRouter } from "next/navigation";
import { FormEventHandler, useEffect, useState } from "react";

const PostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState<{ id: number }[]>([]);
  const [thumbnailUrl, setThumbnailUrl] = useState("https://abc.png");
  const router = useRouter();

  const { id } = useParams();
  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/posts/${id}`
        );
        const data = await res.json();
        console.log(data);
        const { title, content, thumbnailUrl, categories }: UpdatePostBody =
          data.post;
        console.log(data.post);

        setTitle(title);
        setContent(content);
        setThumbnailUrl(thumbnailUrl);
        setCategories(categories);
      } catch (error) {
        console.error("PUT post error");
      }
    };
    getPosts();
  }, []);

  const handleSave: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const postBody: UpdatePostBody = {
      title,
      content,
      categories,
      thumbnailUrl,
    };
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}admin/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postBody),
    });
    alert("記事を更新しました");
    router.push("/admin/posts");
  };

  const handleDel = async () => {
    if (!confirm("削除してもよろしいですか？")) return;
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}admin/posts/${id}`, {
      method: "DELETE",
    });
    alert("記事を削除しました");
    router.push("/admin/posts");
  };

  return (
    <div className="mt-10 p-4 w-3/4 mx-auto">
      <form onSubmit={handleSave} className="flex flex-col gap-10 ">
        <h1 className="text-2xl font-bold text-center">記事編集</h1>

        <label htmlFor="">
          タイトル
          <input
            type="text"
            className="border-2 border-gray-500 rounded-md w-full p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label htmlFor="">
          本文
          <input
            type="text"
            className="border-2 border-gray-500 rounded-md w-full p-2"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
        <label htmlFor="">
          サムネイルURL
          <input
            type="text"
            className="border-2 border-gray-500 rounded-md w-full p-2"
            value={thumbnailUrl}
            onChange={(e) => setThumbnailUrl(e.target.value)}
          />
        </label>
        <label htmlFor="">
          カテゴリー
          <SelectCategory setCategories={setCategories} />
        </label>
        <div className="flex gap-5">
          <PostEditBtn />
          <PostDelBtn handleDel={handleDel} />
        </div>
      </form>
    </div>
  );
};

export default PostPage;
