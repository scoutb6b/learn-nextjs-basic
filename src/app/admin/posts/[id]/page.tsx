"use client";
import { Category } from "@/app/_types/request/category";
import { GetPosts, UpdatePostBody } from "@/app/_types/request/posts";
import PostDelBtn from "@/app/components/posts/PostDelBtn";
import PostEditBtn from "@/app/components/posts/PostEditBtn";
import { useParams, useRouter } from "next/navigation";
import { FormEventHandler, useEffect, useState } from "react";

const PostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState<{ id: number }[]>([]);
  const [selectCategory, setSelectCategory] = useState<Category[]>([]);
  const [thumbnailUrl, setThumbnailUrl] = useState("https://abc.png");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const resPost = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/posts/${id}`
        );
        const resCategory = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}admin/categories`
        );
        const data = await resPost.json();
        const { title, content, thumbnailUrl, postCategories }: GetPosts =
          data.post;
        setTitle(title);
        setContent(content);
        setThumbnailUrl(thumbnailUrl);
        const categoryId = postCategories.map((item) => ({
          id: item.category.id,
        }));
        setCategories(categoryId);

        const { categories } = await resCategory.json();
        console.log(categories);

        setSelectCategory(categories);
        setLoading(true);
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
  if (!loading) {
    return (
      <div className=" w-full text-center content-center">
        <p className="text-xl font-medium">読み込み中..</p>
      </div>
    );
  }

  return (
    <div className="mt-10 px-10 py-4 w-full mx-auto">
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
          <select
            className="border-2 border-gray-500 rounded-md w-full p-2"
            value={categories.length > 0 ? categories[0].id : ""}
            onChange={(e) => setCategories([{ id: parseInt(e.target.value) }])}
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
          {/* <SelectCategory
            setCategories={setCategories}
            categories={categories}
          /> */}
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
