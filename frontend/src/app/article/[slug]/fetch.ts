import { createApiClient, isForbiddenError, isUnauthorizedError } from "@/shared/api/apiClient";
import { Article, articleSchema, commentSchema } from "@/shared/types";
import { redirect } from "next/navigation";
import { cache } from "react";

export const fetchArticle = cache(async (slug: string): Promise<Article> => {
  const client = createApiClient({
    path: "/articles/{slug}",
    httpMethod: "get",
    params: {
      paths: {
        slug,
      },
    },
  });

  try {
    const response = await client.sendRequest();
    return articleSchema.parse(response.article);
  } catch (err) {
    if (isUnauthorizedError(err) || isForbiddenError(err)) {
      redirect("/login");
    }
    throw err;
  }
});

export const fetchComments = cache(async (slug: string) => {
  const client = createApiClient({
    path: "/articles/{slug}/comments",
    httpMethod: "get",
    params: {
      paths: {
        slug,
      },
    },
  });

  try {
    const response = await client.sendRequest();
    return response.comments.map((comment) => commentSchema.parse(comment));
  } catch (err) {
    if (isUnauthorizedError(err) || isForbiddenError(err)) {
      redirect("/login");
    }
    throw err;
  }
});
