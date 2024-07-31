"use client";

import { format } from "date-fns";
import Link from "next/link";
import { Post } from "../page";

interface PostProps {
  item: Post;
}

const PostList: React.FC<PostProps> = ({ item }) => {
  const dateFormat = (date: Date) => {
    return format(new Date(date), "yyyy-MM-dd");
  };
  return (
    <Link
      href={`/posts/${item.id}`}
      key={item.id}
      className="w-3/4 mx-auto border border-gray-300 p-4 mb-6 rounded-lg block"
    >
      <div className="flex justify-between">
        <p>{dateFormat(item.createdAt)}</p>
        <div className="flex gap-2">
          {item.categories.map((category, index) => (
            <p
              key={index}
              className="border border-blue-300 rounded-md px-2 py-1 text-blue-500 "
            >
              {category}
            </p>
          ))}
        </div>
      </div>
      <h2 className="text-2xl font-bold my-4">{item.title}</h2>
      <div
        className="w-3/4 line-clamp-2"
        dangerouslySetInnerHTML={{ __html: item.content }}
      ></div>
    </Link>
  );
};

export default PostList;
