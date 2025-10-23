import type { Category } from "./category.type";

export interface Nomination {
  id: string;
  name: string;
  description: string;
  category_id: string;
  category: Category;
}
