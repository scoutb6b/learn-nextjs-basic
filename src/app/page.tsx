"use client";

import { useEffect, useState } from "react";
import PostList from "./components/microCms/PostList";
import { NextPage } from "next";
import { MicroCmsPost } from "@/_types/MicroCmsPost";

const Home: NextPage = () => {
  const [posts, setPosts] = useState<MicroCmsPost[]>([]);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts`);
      const { contents } = await res.json();
      setPosts(contents);
    };
    fetcher();
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
