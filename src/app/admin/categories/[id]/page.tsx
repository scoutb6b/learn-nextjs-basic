"use client";
import { CategoryProps } from "@/app/_types/request/category";
import CategoryDelBtn from "@/app/components/categories/CategoryDel";
import CategoryEditBtn from "@/app/components/categories/CategoryEdit";
import { redirect, useParams, useRouter } from "next/navigation";
import { FormEventHandler, useEffect, useState } from "react";

const CategoryEditPage = () => {
  const [category, setCategory] = useState("");
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}admin/categories/${id}`
        );
        const data = await res.json();
        console.log(data);
        setCategory(data.category.name);
      } catch (error) {
        console.error("Category Get Error");
      }
    };
    getCategory();
  }, []);

  const handleSave: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const categoryBody: CategoryProps = {
      name: category,
    };

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}admin/categories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryBody),
    });
    alert("カテゴリーを更新しました");
    router.push("/admin/categories");
  };

  const handleDel = async () => {
    if (!confirm("削除してもよろしいですか？")) return;
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}admin/categories/${id}`, {
      method: "DELETE",
    });
    alert("カテゴリーを削除しました");
    router.push("/admin/categories");
  };

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
