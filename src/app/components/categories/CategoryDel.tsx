"use client";

type handleProps = {
  handleDel: () => void;
};

const CategoryDelBtn: React.FC<handleProps> = ({ handleDel }) => {
  return (
    <button
      type="button"
      className="px-6 py-2 bg-red-500 rounded-lg text-white mt-4"
      onClick={handleDel}
    >
      削除する
    </button>
  );
};

export default CategoryDelBtn;
