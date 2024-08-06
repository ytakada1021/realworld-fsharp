import { calcOffsetLimitFromPageNumber } from "@/modules/common/functions/pagination";
import { createApiClient, isForbiddenError, isUnauthorizedError } from "@/shared/api/apiClient";
import { articleSchema, profileSchema } from "@/shared/types";
import { redirect } from "next/navigation";

export const fetchProfile = async (username: string) => {
  const client = createApiClient({
    path: "/profiles/{username}",
    httpMethod: "get",
    params: {
      paths: {
        username,
      },
    },
  });

  try {
    const response = await client.sendRequest();
    return profileSchema.parse(response.profile);
  } catch (err) {
    if (isUnauthorizedError(err) || isForbiddenError(err)) {
      redirect("/login");
    }
    throw err;
  }
};

export const fetchArticlesByAuthor = async (authorUsername: string, pageNumber: number) => {
  const { offset, limit } = calcOffsetLimitFromPageNumber(pageNumber, 10);

  const client = createApiClient({
    path: "/articles",
    httpMethod: "get",
    params: {
      query: {
        tag: "",
        author: authorUsername,
        favorited: "",
        offset,
        limit,
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
