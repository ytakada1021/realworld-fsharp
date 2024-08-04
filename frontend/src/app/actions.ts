"use server";

import { createApiClient, isForbiddenError, isUnauthorizedError } from "@/api/apiClient";
import { articleSchema } from "@/types";
import { redirect } from "next/navigation";

export const favoriteArticleAction = async (slug: string) => {
  const client = createApiClient({
    path: "/articles/{slug}/favorite",
    httpMethod: "post",
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
};
