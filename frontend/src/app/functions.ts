import { ArticlesPerPage } from "./types";

export const calcTotalPageNumber = (totalArticlesCount: number, articlesPerPage: ArticlesPerPage) => {
  const quotient = Math.floor(totalArticlesCount / articlesPerPage);
  const remainder = totalArticlesCount % articlesPerPage;

  return remainder === 0 ? quotient : quotient + 1;
};

export const generateUrl = (page: string, tab: string, tag?: string) => {
  const searchParamsObj = new URLSearchParams({
    page,
    tab,
    ...(tag && { tag }),
  });

  return "/?" + searchParamsObj.toString();
};

export const calcOffsetLimitFromPageNumber = (pageNumber: number, articlesPerPage: ArticlesPerPage) => {
  return {
    offset: (pageNumber - 1) * articlesPerPage,
    limit: articlesPerPage,
  };
};
