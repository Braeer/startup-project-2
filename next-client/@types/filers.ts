export interface filtersInterface {
  specialty?: string;
  questions_count?: string;
  difficulty?: string;
}

export type FiltersState = {
  specialty?: string;
  questions_count?: string;
  difficulty?: string;
} | null;
