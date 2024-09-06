export type Posts = {
  id: number;
  title: string;
  content: string;
  thumbnailUrl: string;
  createdAt: Date;
  postCategories: string[];
};

export type UpdatePostBody = {
  title: string;
  content: string;
  categories: { id: number }[];
  thumbnailUrl: string;
};
