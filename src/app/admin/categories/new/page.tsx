"use client";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { FormEventHandler, useState } from "react";

const CategoryCreatePage: React.FC = () => {
  const [category, setCategory] = useState("");

  const { token } = useSupabaseSession();

  const categoryCreate: FormEventHandler<HTMLFormElement> = async (e) => {
    if (!token) return;
    e.preventDefault();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}admin/categories`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ name: category }),
      }
    );
    const result = await res.json();
    alert("作成しました");
    setCategory("");
  };
  return (
    <div className="mt-10 p-4 w-full">
      <h1 className="text-2xl font-bold text-center">カテゴリー新規作成</h1>
      <form onSubmit={categoryCreate}>
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
        <button
          type="submit"
          className="px-8 py-2 bg-green-500 rounded-lg text-white mt-4"
        >
          作成する
        </button>
      </form>
    </div>
  );
};

export default CategoryCreatePage;
