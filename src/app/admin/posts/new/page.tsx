"use client";
import { Category } from "@/app/_types/request/category";
import { UpdatePostBody } from "@/app/_types/request/posts";
import { useRouter } from "next/navigation";
import { FormEventHandler, useEffect, useState } from "react";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState<{ id: number }[]>([]);
  const [selectCategory, setSelectCategory] = useState<Category[]>([]);

  const [thumbnailUrl, setThumbnailUrl] = useState("https://abc.png");
  const router = useRouter();

  const postCreate: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const postBody: UpdatePostBody = {
        title,
        content,
        categories,
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
  useEffect(() => {
    const select = async () => {
      const resCategory = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}admin/categories`
      );
      console.log(resCategory);
      const { categories } = await resCategory.json();
      console.log(categories);

      setSelectCategory(categories);
    };
    select();
  }, []);

  // const selectCatetories = (categoryId: number) => {
  //   setCategories([{ id: categoryId }]);
  //   console.log(categoryId);
  // };
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
            <select
              className="border-2 border-gray-500 rounded-md w-full p-2"
              // value={categories.length > 0 ? categories[0].id : ""}
              onChange={(e) =>
                setCategories([{ id: parseInt(e.target.value) }])
              }
            >
              <option value=""></option>
              {selectCategory.map((item) => {
                return (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
            {/* <SelectCategory setCategories={selectCatetories} /> */}
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
