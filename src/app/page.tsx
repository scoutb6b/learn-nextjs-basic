"use client";

import { useEffect, useState } from "react";
import { NextPage } from "next";
import { GetPosts } from "./_types/request/posts";
import { format } from "date-fns/format";
import Link from "next/link";

const Home: NextPage = () => {
  const [posts, setPosts] = useState<GetPosts[]>([]);
  const dateFormat = (date: Date) => {
    return format(new Date(date), "yyyy/MM/dd");
  };

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts`);
      console.log(res);

      const { posts } = await res.json();
      console.log(posts);

      setPosts(posts);
    };
    fetcher();
  }, []);
  return (
    <div className="w-4/5 mt-8 mx-auto">
      <h1 className="text-2xl font-bold inline-block">記事一覧</h1>

      {posts.map((item) => {
        return (
          <div
            className="py-4 px-2 w-full border-b border-gray-400"
            key={item.id}
          >
            <Link href={`/posts/${item.id}`}>
              <p className="font-semibold text-xl mb-2">{item.title}</p>
              <p>{dateFormat(item.createdAt)}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
