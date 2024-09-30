"use client";

import { NextPage } from "next";
import { useEffect, useState } from "react";
import { GetPosts } from "@/app/_types/request/posts";
import { format } from "date-fns";
import Link from "next/link";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";

const PostListpage: NextPage = () => {
  const [posts, setPosts] = useState<GetPosts[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const dateFormat = (date: Date) => {
    return format(new Date(date), "yyyy/MM/dd");
  };
  const { token } = useSupabaseSession();

  useEffect(() => {
    if (!token) return;
    const postData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}admin/posts`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );
        const { posts } = await res.json();

        setPosts(posts);
        setLoading(true);
      } catch (error) {
        console.error("posts GET Error");
      }
    };
    postData();
  }, [token]);

  if (!loading) {
    return (
      <div className="h-full text-center content-center">
        <p className="text-xl font-medium">読み込み中..</p>
      </div>
    );
  }
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
