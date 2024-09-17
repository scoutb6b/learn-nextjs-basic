import { Category } from "@/app/_types/request/category";
import {
  ChangeEventHandler,
  FormEventHandler,
  ReactNode,
  useEffect,
  useState,
} from "react";

type FormProps = {
  onSubmit: FormEventHandler<HTMLFormElement>;
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
  thumbnailUrl: string;
  setThumbnailUrl: (thumbnailUrl: string) => void;
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
  thumbnailUrl,
  setThumbnailUrl,
  selectCategories,
  setSelectCategories,
  children,
}) => {
  const [allCategory, setAllCategory] = useState<Category[]>([]);
  useEffect(() => {
    const select = async () => {
      const resCategory = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}admin/categories`
      );
      const { categories } = await resCategory.json();

      setAllCategory(categories);
    };
    select();
  }, []);

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
        サムネイルURL
        <input
          type="text"
          className="border-2 border-gray-500 rounded-md w-full p-2"
          value={thumbnailUrl}
          onChange={(e) => setThumbnailUrl(e.target.value)}
        />
      </label>
      <div>
        <p>カテゴリー</p>

        <div className="mt-4">
          {allCategory.map((item) => {
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
