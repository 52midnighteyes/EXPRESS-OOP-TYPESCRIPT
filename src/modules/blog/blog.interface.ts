import type { BlogCategory } from "../../../generated/prisma/enums.js";

//--- service params
export interface ICreateBlogParams {
  image: string;
  title: string;
  slug: string;
  content: string;
  isPublished?: boolean;
  authorId: string;
  category: BlogCategory;
}

//--- DB params
export interface ICreateBlogDbParams extends ICreateBlogParams {
  slug: string;
  excerpt: string;
}
