"use server";

import { createApiClient, isForbiddenError, isUnauthorizedError, isUnprocessableEntityError } from "@/api/apiClient";
import { ErrorState } from "./types";
import { redirect } from "next/navigation";

export const createArticleAction = async (_prevState: ErrorState, formData: FormData): Promise<ErrorState> => {
  const client = createApiClient({
    path: "/articles",
    httpMethod: "post",
    params: {
      body: {
        article: {
          title: formData.get("title")?.toString() ?? "",
          description: formData.get("description")?.toString() ?? "",
          body: formData.get("body")?.toString() ?? "",
          tagList: formData.getAll("tagList").map((item) => item.toString()),
        },
      },
    },
  });

  try {
    const response = await client.sendRequest();
    return redirect(`/article/${response.article.slug}`);
  } catch (err) {
    if (isUnprocessableEntityError(err)) {
      return {
        errors: err.errors.body,
      };
    } else if (isUnauthorizedError(err) || isForbiddenError(err)) {
      redirect("/login");
    }
    throw err;
  }
};
