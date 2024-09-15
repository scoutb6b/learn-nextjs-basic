import { Category } from "@/app/_types/request/category";
import { ChangeEventHandler, FormEventHandler, ReactNode } from "react";

type FormProps = {
  onSubmit: FormEventHandler<HTMLFormElement>;
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
  thumbnailUrl: string;
  setThumbnailUrl: (thumbnailUrl: string) => void;
  categories: { id: number }[];
  setCategories: (
    categories: {
      id: number;
    }[]
  ) => void;
  selectCategory: Category[];
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
  categories,
  setCategories,
  selectCategory,
  children,
}) => {
  console.log(selectCategory);
  console.log(categories);

  const handleCheck: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.checked) {
      setCategories([...categories, { id: parseInt(e.target.value) }]);
    } else {
      setCategories(
        categories.filter((c) => c.id !== parseInt(e.target.value))
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
          {selectCategory.map((item) => {
            return (
              <label
                htmlFor={item.name}
                className="inline-flex items-center flex-row gap-1 mr-6"
              >
                <input
                  className="size-4"
                  type="checkbox"
                  key={item.id}
                  value={item.id}
                  id={item.name}
                  checked={categories.some((c) => c.id === item.id)}
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
