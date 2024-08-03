export interface MicroCmsPost {
  id: string;
  categories: { id: string; name: string }[];
  createdAt: Date;
  title: string;
  content: string;
  thumbnail: {
    url: string;
    height: number;
    width: number;
  };
}
