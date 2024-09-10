"use client";
import { UpdatePostBody } from "@/app/_types/request/posts";
import SelectCategory from "@/app/components/posts/SelectCategory";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState<{ id: number }[]>([]);
  const [thumbnailUrl, setThumbnailUrl] = useState("https://abc.png");
  const router = useRouter();

  const postCreate = async (e: any) => {
    e.preventDefault();
    try {
      const postBody: UpdatePostBody = {
        title,
        content,
        categories,
        thumbnailUrl,
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/posts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postBody),
        }
      );

      const result = await res.json();
      console.log(result);
      router.push("/admin/posts");
    } catch (error) {
      console.error("post create error");
    }
  };

  const selectCatetories = (categoryId: number) => {
    setCategories([{ id: categoryId }]);
    console.log(categoryId);
  };
  return (
    <div className="mt-10 p-4 w-full">
      <h1 className="text-2xl font-bold text-center">投稿新規作成</h1>
      <div className="mt-10">
        <form onSubmit={postCreate} className="flex flex-col gap-10 ">
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
            <SelectCategory setCategories={selectCatetories} />
          </label>
          <button
            type="submit"
            className=" bg-green-500 px-4 py-2 mt-4 w-1/4 mx-auto text-white rounded-md"
          >
            追加する
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePostPage;
