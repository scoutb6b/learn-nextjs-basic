"use client";
import { Category } from "@/app/_types/request/category";
import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";

const CategoriesPage: NextPage = () => {
  const [category, setCategory] = useState<Category[]>([]);
  useEffect(() => {
    const categoryData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}admin/categories`
        );
        const { categories } = await res.json();
        setCategory(categories);
      } catch (error) {
        console.error("GET error");
      }
    };
    categoryData();
  }, []);
  return (
    <div className="mt-10 w-full px-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold inline-block">カテゴリ一覧</h1>
        <Link
          href={"/admin/categories/new"}
          className="px-6 py-2 bg-sky-500 text-white font-semibold rounded-lg"
        >
          新規作成
        </Link>
      </div>
      <div className="mt-4">
        {category.map((item) => {
          return (
            <Link
              href={`/admin/categories/${item.id}`}
              key={item.id}
              className="border-b-2 border-gray-300 text-xl p-4 flex"
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategoriesPage;
