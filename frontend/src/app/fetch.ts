import { calcOffsetLimitFromPageNumber } from "@/modules/common/functions/pagination";
import { createApiClient, isForbiddenError, isUnauthorizedError } from "@/shared/api/apiClient";
import { ExhaustiveError } from "@/shared/errors";
import { articleSchema } from "@/shared/types";
import { redirect } from "next/navigation";
import { SearchParams } from "./types";

const fetchGlobalArticles = async (page: number) => {
  const { offset, limit } = calcOffsetLimitFromPageNumber(page, 10);

  const client = createApiClient({
    path: "/articles",
    httpMethod: "get",
    params: {
      query: {
        tag: "",
        author: "",
        favorited: "",
        limit,
        offset,
      },
    },
  });

  try {
    const response = await client.sendRequest();
    return {
      articles: response.articles.map((article) => articleSchema.parse(article)),
      articlesCount: response.articlesCount,
    };
  } catch (err) {
    if (isUnauthorizedError(err) || isForbiddenError(err)) {
      redirect("/login");
    }
    throw err;
  }
};

const fetchPersonalizedArticles = async (page: number) => {
  const { offset, limit } = calcOffsetLimitFromPageNumber(page, 10);

  const client = createApiClient({
    path: "/articles/feed",
    httpMethod: "get",
    params: {
      query: {
        limit,
        offset,
      },
    },
  });

  try {
    const response = await client.sendRequest();
    return {
      articles: response.articles.map((article) => articleSchema.parse(article)),
      articlesCount: response.articlesCount,
    };
  } catch (err) {
    if (isUnauthorizedError(err) || isForbiddenError(err)) {
      redirect("/login");
    }
    throw err;
  }
};

const fetchArticlesByTag = async (tag: string, page: number) => {
  const { offset, limit } = calcOffsetLimitFromPageNumber(page, 10);

  const client = createApiClient({
    path: "/articles",
    httpMethod: "get",
    params: {
      query: {
        tag,
        author: "",
        favorited: "",
        limit,
        offset,
      },
    },
  });

  try {
    const response = await client.sendRequest();
    return {
      articles: response.articles.map((article) => articleSchema.parse(article)),
      articlesCount: response.articlesCount,
    };
  } catch (err) {
    if (isUnauthorizedError(err) || isForbiddenError(err)) {
      redirect("/login");
    }
    throw err;
  }
};

export const fetchArticles = async (searchParams: SearchParams) => {
  switch (searchParams.tab) {
    case "your-feed":
      return fetchPersonalizedArticles(searchParams.page);
    case "global-feed":
      return fetchGlobalArticles(searchParams.page);
    case "tag":
      return fetchArticlesByTag(searchParams.tag ?? "", searchParams.page);
    default:
      // compilation fails if all cases are not covered
      throw new ExhaustiveError(searchParams.tab);
  }
};

export const fetchTags = async () => {
  const client = createApiClient({
    path: "/tags",
    httpMethod: "get",
  });

  try {
    return await client.sendRequest();
  } catch (err) {
    if (isUnauthorizedError(err) || isForbiddenError(err)) {
      redirect("/login");
    }
    throw err;
  }
};
