"use client";

import { useEffect, useState } from "react";
import PostList from "./components/PostList";
import { NextPage } from "next";

export interface Post {
  id: number;
  categories: string[];
  createdAt: Date;
  title: string;
  content: string;
}

const Home: NextPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getAllPosts = async () => {
      const res = await fetch(
        "https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts"
      );
      const data = await res.json();
      setPosts(data.posts);
    };

    getAllPosts();
  }, []);
  return (
    <div className="mt-8">
      {posts.map((item) => {
        return <PostList key={item.id} item={item} />;
      })}
    </div>
  );
};

export default Home;
