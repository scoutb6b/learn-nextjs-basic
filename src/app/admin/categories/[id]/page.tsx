"use client";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { CategoryProps } from "@/app/_types/request/category";
import CategoryDelBtn from "@/app/components/categories/CategoryDel";
import CategoryEditBtn from "@/app/components/categories/CategoryEdit";
import { redirect, useParams, useRouter } from "next/navigation";
import { FormEventHandler, useEffect, useState } from "react";

const CategoryEditPage = () => {
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const { id } = useParams();
  const router = useRouter();

  const { token } = useSupabaseSession();

  useEffect(() => {
    if (!token) return;
    const getCategory = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}admin/categories/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );
        const data = await res.json();
        console.log(data);
        setCategory(data.category.name);
        setLoading(true);
      } catch (error) {
        console.error("Category Get Error");
      }
    };
    getCategory();
  }, [token]);

  const handleSave: FormEventHandler<HTMLFormElement> = async (e) => {
    if (!token) return;

    e.preventDefault();

    const categoryBody: CategoryProps = {
      name: category,
    };

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}admin/categories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(categoryBody),
    });
    alert("カテゴリーを更新しました");
    router.push("/admin/categories");
  };

  const handleDel = async () => {
    if (!token) return;

    if (!confirm("削除してもよろしいですか？")) return;
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}admin/categories/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    alert("カテゴリーを削除しました");
    router.push("/admin/categories");
  };
  if (!loading) {
    return (
      <div className=" w-full text-center content-center">
        <p className="text-xl font-medium">読み込み中..</p>
      </div>
    );
  }
  return (
    <form onSubmit={handleSave} className="mt-10 p-4 w-full">
      <h1 className="text-2xl font-bold text-center">カテゴリー編集</h1>
      <div className="">
        <label htmlFor="">
          カテゴリー名
          <input
            type="text"
            value={category}
            name="category"
            onChange={(e) => setCategory(e.target.value)}
            className="border-2 border-gray-500 rounded-md w-full mt-2 p-2"
          />
        </label>
      </div>
      <div className="flex gap-5">
        <CategoryEditBtn />
        <CategoryDelBtn handleDel={handleDel} />
      </div>
    </form>
  );
};

export default CategoryEditPage;
