import { Category } from "@/app/_types/request/category";
import { supabase } from "@/utils/supabase";
import {
  ChangeEvent,
  ChangeEventHandler,
  FormEventHandler,
  ReactNode,
  useEffect,
  useState,
} from "react";

import Image from "next/image";

import { v4 as uuidv4 } from "uuid";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";

type FormProps = {
  onSubmit: FormEventHandler<HTMLFormElement>;
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
  // thumbnailUrl: string;
  // setThumbnailUrl: (thumbnailUrl: string) => void;
  thumbnailImageKey: string;
  setThumbnailImageKey: (thumbnailImageKey: string) => void;
  selectCategories: { id: number }[];
  setSelectCategories: (
    selectCategories: {
      id: number;
    }[]
  ) => void;
  children: ReactNode;
};

const PostForm: React.FC<FormProps> = ({
  onSubmit,
  title,
  setTitle,
  content,
  setContent,
  // thumbnailUrl,
  // setThumbnailUrl,
  thumbnailImageKey,
  setThumbnailImageKey,
  selectCategories,
  setSelectCategories,
  children,
}) => {
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  // const [thumbnailImageKey, setThumbnailImageKey] = useState("");
  const [thumbnailImageUrl, setThumbnailImageUrl] = useState<null | string>(
    null
  );
  const { token } = useSupabaseSession();

  useEffect(() => {
    if (!token) return;
    const select = async () => {
      const resCategory = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}admin/categories`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      const { categories } = await resCategory.json();

      setAllCategories(categories);
    };
    select();
  }, [token]);

  useEffect(() => {
    if (!thumbnailImageKey) return;
    const fetcher = async () => {
      const {
        data: { publicUrl },
      } = await supabase.storage
        .from("post_thumbnail")
        .getPublicUrl(thumbnailImageKey);
      setThumbnailImageUrl(publicUrl);
    };
    fetcher();
  }, [thumbnailImageKey]);

  const handleCheck: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.checked) {
      setSelectCategories([
        ...selectCategories,
        { id: parseInt(e.target.value) },
      ]);
    } else {
      setSelectCategories(
        selectCategories.filter((c) => c.id !== parseInt(e.target.value))
      );
    }
  };

  const handleImageChange = async (
    e: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    if (!e.target.files || e.target.files.length == 0) {
      return;
    }
    const file = e.target.files[0];
    const filePath = `private/${uuidv4()}`;
    const { data, error } = await supabase.storage
      .from("post_thumbnail")
      .upload(filePath, file, { cacheControl: "3600", upsert: false });
    if (error) {
      alert(error.message);
      return;
    }
    setThumbnailImageKey(data.path);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-10 ">
      <label htmlFor="">
        タイトル
        <input
          type="text"
          className="border-2 border-gray-500 rounded-md w-full p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label htmlFor="">
        本文
        <input
          type="text"
          className="border-2 border-gray-500 rounded-md w-full p-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </label>
      <label htmlFor="">
        サムネイル
        <input
          type="file"
          className="border-2 border-gray-500 rounded-md w-full p-2"
          onChange={handleImageChange}
          accept="image/*"
        />
        {thumbnailImageUrl && (
          <div className="mt-4">
            <Image
              src={thumbnailImageUrl}
              alt="thumbnail"
              width={400}
              height={400}
            />
          </div>
        )}
      </label>
      <div>
        <p>カテゴリー</p>

        <div className="mt-4">
          {allCategories.map((item) => {
            return (
              <label
                htmlFor={item.name}
                className="inline-flex items-center flex-row gap-1 mr-6"
                key={item.id}
              >
                <input
                  className="size-4"
                  type="checkbox"
                  value={item.id}
                  id={item.name}
                  checked={selectCategories.some((c) => c.id === item.id)}
                  onChange={handleCheck}
                />
                {item.name}
              </label>
            );
          })}
        </div>
      </div>
      {children}
    </form>
  );
};

export default PostForm;
