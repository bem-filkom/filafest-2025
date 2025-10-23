import type { Nomination } from "./nomination.type";

export interface Category {
  id: string;
  name: string;
  description: string;
  nominations: Nomination[];
  createdAt: string;
  updatedAt: string;
}
