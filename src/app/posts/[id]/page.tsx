"use client";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useParams } from "next/navigation";
import { NextPage } from "next";
import { GetPosts } from "@/app/_types/request/posts";
import Image from "next/image";
import { supabase } from "@/utils/supabase";

const PostPage: NextPage = () => {
  const { id } = useParams();

  const [post, setPost] = useState<GetPosts | null>(null);
  const [loading, setLoading] = useState(false);
  const [thumbnailImageUrl, setThumbnailImageUrl] = useState<null | string>(
    null
  );
  const dateFormat = (date: Date) => {
    return format(new Date(date), "yyyy-MM-dd");
  };
  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/${id}`);
      const data = await res.json();
      console.log(data.post);

      setPost(data.post);
      setLoading(true);
    };
    fetcher();
  }, []);
  console.log(post);

  useEffect(() => {
    if (!post?.thumbnailImageKey) return;
    const fetcher = async () => {
      const {
        data: { publicUrl },
      } = await supabase.storage
        .from("post_thumbnail")
        .getPublicUrl(post.thumbnailImageKey);
      setThumbnailImageUrl(publicUrl);
    };
    fetcher();
  }, [post?.thumbnailImageKey]);

  if (!loading) {
    return <div>読み込み中...</div>;
  }
  if (post === null) {
    return <div>記事が見つかりません</div>;
  }

  const { createdAt, postCategories, title, content } = post;

  return (
    <div className="mx-auto w-3/4">
      {thumbnailImageUrl && (
        <div className="mt-4 w-[300px]">
          <Image
            src={thumbnailImageUrl}
            alt="thumbnail"
            width={400}
            height={400}
          />
        </div>
      )}
      <div className="p-4">
        <div className="flex justify-between mt-5">
          <div>{dateFormat(createdAt)}</div>
          <div className="flex gap-4">
            {postCategories.map((item) => (
              <p
                key={item.id}
                className="border border-blue-300 rounded-md px-2 py-1 text-blue-500"
              >
                {item.category.name}
              </p>
            ))}
          </div>
        </div>
        <div className="text-2xl font-semibold mt-5">{title}</div>
        <div className="mt-5">{content}</div>
      </div>
    </div>
  );
};

export default PostPage;
