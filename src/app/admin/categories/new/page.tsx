"use client";
import { useState } from "react";

const CategoryCreatePage: React.FC = () => {
  const [category, setCategory] = useState("");
  const categoryCreate = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}admin/categories`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
      <button
        className="px-8 py-2 bg-green-500 rounded-lg text-white mt-4"
        onClick={categoryCreate}
      >
        作成する
      </button>
    </div>
  );
};

export default CategoryCreatePage;
