"use client";
import { Category } from "@/app/_types/request/category";
import { UpdatePostBody } from "@/app/_types/request/posts";
import PostForm from "@/app/components/posts/PostForm";
import { useRouter } from "next/navigation";
import { FormEventHandler, useEffect, useState } from "react";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectCategories, setSelectCategories] = useState<{ id: number }[]>(
    []
  );
  const [thumbnailUrl, setThumbnailUrl] = useState("https://abc.png");
  const router = useRouter();

  const postCreate: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const postBody: UpdatePostBody = {
        title,
        content,
        categories: selectCategories,
        thumbnailUrl,
      };
      const resPost = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/posts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postBody),
        }
      );
      const result = await resPost.json();
      console.log(result);

      router.push("/admin/posts");
    } catch (error) {
      console.error("post create error");
    }
  };

  return (
    <div className="mt-10 p-4 w-full">
      <h1 className="text-2xl font-bold text-center">投稿新規作成</h1>
      <div className="mt-10">
        <PostForm
          onSubmit={postCreate}
          title={title}
          content={content}
          thumbnailUrl={thumbnailUrl}
          selectCategories={selectCategories}
          setTitle={setTitle}
          setContent={setContent}
          setThumbnailUrl={setThumbnailUrl}
          setSelectCategories={setSelectCategories}
        >
          <button
            type="submit"
            className=" bg-green-500 px-4 py-2 mt-4 w-1/4 mx-auto text-white rounded-md"
          >
            追加する
          </button>
        </PostForm>
      </div>
    </div>
  );
};

export default CreatePostPage;
