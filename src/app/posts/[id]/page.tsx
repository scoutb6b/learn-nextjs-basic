"use client";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import Image from "next/image";
import { useParams } from "next/navigation";
import { NextPage } from "next";
import { MicroCmsPost } from "@/_types/MicroCmsPost";

const PostPage: NextPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState<MicroCmsPost | null>(null);
  const [loading, setLoading] = useState(false);
  const dateFormat = (date: Date) => {
    return format(new Date(date), "yyyy-MM-dd");
  };
  useEffect(() => {
    const fetcher = async () => {
      setLoading(true);
      const res = await fetch(
        `https://wzroknxrgd.microcms.io/api/v1/blogs/${id}`,
        {
          headers: {
            "X-MICROCMS-API-KEY": process.env.NEXT_PUBLIC_API_KEY as string,
          },
        }
      );
      const data = await res.json();
      setLoading(false);
      setPost(data);
    };
    fetcher();
  }, []);
  if (loading) {
    return <div>読み込み中...</div>;
  }
  if (post === null) {
    return <div>記事が見つかりません</div>;
  }
  const { thumbnail, createdAt, categories, title, content } = post;
  return (
    <div className="mx-auto w-3/4">
      <Image
        src={thumbnail.url}
        width={800}
        height={400}
        alt=""
        className="mt-10"
      />
      <div className="p-4">
        <div className="flex justify-between mt-5">
          <div>{dateFormat(createdAt)}</div>
          <div className="flex gap-4">
            {categories.map((item, index) => (
              <p
                key={index}
                className="border border-blue-300 rounded-md px-2 py-1 text-blue-500"
              >
                {item.name}
              </p>
            ))}
          </div>
        </div>
        <div className="text-2xl font-semibold mt-5">{title}</div>
        <div
          className="mt-5"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      </div>
    </div>
  );
};

export default PostPage;
