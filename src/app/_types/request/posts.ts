export type GetPosts = {
  id: number;
  title: string;
  content: string;
  thumbnailImageKey: string;
  createdAt: Date;
  postCategories: GetPostCategories[];
};

export type GetCategory = {
  id: number;
  name: string;
};

export type GetPostCategories = {
  id: number;
  postId: number;
  categoryId: number;
  category: GetCategory;
};

export type UpdatePostBody = {
  title: string;
  content: string;
  categories: { id: number }[];
  thumbnailImageKey: string;
};
