import { calcOffsetLimitFromPageNumber } from "@/modules/common/functions/pagination";
import { createApiClient, isForbiddenError, isUnauthorizedError } from "@/shared/api/apiClient";
import { articleSchema } from "@/shared/types";
import { redirect } from "next/navigation";

export const fetchArticlesByUserFavorites = async (username: string, pageNumber: number) => {
  const { offset, limit } = calcOffsetLimitFromPageNumber(pageNumber, 10);

  const client = createApiClient({
    path: "/articles",
    httpMethod: "get",
    params: {
      query: {
        tag: "",
        author: "",
        favorited: username,
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
