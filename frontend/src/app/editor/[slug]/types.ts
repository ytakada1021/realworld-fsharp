export type Article = {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
};

export type ErrorState = {
  errors: string[];
};

export const initialErrorState: ErrorState = {
  errors: [],
};

export type TagListState = {
  tags: string[];
};

export const initialTagListState: TagListState = {
  tags: [],
};
