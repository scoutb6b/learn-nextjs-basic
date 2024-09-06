"use client";

import { NextPage } from "next";
import { useEffect, useState } from "react";
import { Posts } from "@/app/_types/request/posts";
import { format } from "date-fns";
import Link from "next/link";

const PostListpage: NextPage = () => {
  const [posts, setPposts] = useState<Posts[]>([]);
  const dateFormat = (date: Date) => {
    return format(new Date(date), "yyyy/MM/dd");
  };
  useEffect(() => {
    const postData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}admin/posts`
        );
        const { posts } = await res.json();
        console.log(posts);

        setPposts(posts);
      } catch (error) {
        console.error("posts GET Error");
      }
    };
    postData();
  }, []);
  return (
    <div className="mt-10">
      {posts.map((post) => {
        return (
          <div
            className="py-4 px-2 w-full border-b border-gray-400"
            key={post.id}
          >
            <Link href={`/admin/posts/${post.id}`}>
              <p className="font-semibold text-xl mb-2">{post.title}</p>
              <p>{dateFormat(post.createdAt)}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default PostListpage;
