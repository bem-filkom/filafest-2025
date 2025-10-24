import type { Candidate } from "./candidate.type";
import type { Category } from "./category.type";
import type { Nomination } from "./nomination.type";

export type Nominee = {
  candidate: Candidate;
  id: string;
  is_voted: boolean;
  total_votes: number;
};

export type NomineesResponse = {
  category: Category;
  has_voted_nomination: boolean;
  nomination: Nomination;
  nominees: Nominee[];
};
