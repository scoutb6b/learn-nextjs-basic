"use client";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { GetPosts, UpdatePostBody } from "@/app/_types/request/posts";
import PostDelBtn from "@/app/components/posts/PostDelBtn";
import PostEditBtn from "@/app/components/posts/PostEditBtn";
import PostForm from "@/app/components/posts/PostForm";
import { useParams, useRouter } from "next/navigation";
import { FormEventHandler, useEffect, useState } from "react";

const PostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectCategories, setSelectCategories] = useState<{ id: number }[]>(
    []
  );
  const [thumbnailImageKey, setThumbnailImageKey] = useState("");

  // const [thumbnailUrl, setThumbnailUrl] = useState("https://abc.png");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = useParams();

  const { token } = useSupabaseSession();

  useEffect(() => {
    if (!token) return;
    const getPosts = async () => {
      try {
        const resPost = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/posts/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );

        const data = await resPost.json();
        const { title, content, thumbnailImageKey, postCategories }: GetPosts =
          data.post;
        setTitle(title);
        setContent(content);
        // setThumbnailUrl(thumbnailUrl);
        setThumbnailImageKey(thumbnailImageKey);
        setSelectCategories(
          postCategories.map((item) => ({
            id: item.category.id,
          }))
        );

        setLoading(true);
      } catch (error) {
        console.error("PUT post error");
      }
    };
    getPosts();
  }, [token]);

  const handleSave: FormEventHandler<HTMLFormElement> = async (e) => {
    if (!token) return;

    e.preventDefault();
    const postBody: UpdatePostBody = {
      title,
      content,
      categories: selectCategories,
      thumbnailImageKey,
    };
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}admin/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(postBody),
    });
    alert("記事を更新しました");
    router.push("/admin/posts");
  };

  const handleDel = async () => {
    if (!token) return;

    if (!confirm("削除してもよろしいですか？")) return;
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}admin/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
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
      <h1 className="text-2xl font-bold text-center">記事編集</h1>
      <PostForm
        onSubmit={handleSave}
        title={title}
        content={content}
        // thumbnailUrl={thumbnailUrl}
        thumbnailImageKey={thumbnailImageKey}
        selectCategories={selectCategories}
        setTitle={setTitle}
        setContent={setContent}
        // setThumbnailUrl={setThumbnailUrl}
        setThumbnailImageKey={setThumbnailImageKey}
        setSelectCategories={setSelectCategories}
      >
        <div className="flex gap-5">
          <PostEditBtn />
          <PostDelBtn handleDel={handleDel} />
        </div>
      </PostForm>
    </div>
  );
};

export default PostPage;
