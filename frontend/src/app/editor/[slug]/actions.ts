"use server";

import { createApiClient, isForbiddenError, isUnauthorizedError, isUnprocessableEntityError } from "@/api/apiClient";
import { redirect } from "next/navigation";
import { FormState } from "./types";

export const updateArticleAction = async (_prevState: FormState, formData: FormData): Promise<FormState> => {
  const client = createApiClient({
    path: "/articles/{slug}",
    httpMethod: "put",
    params: {
      paths: {
        slug: formData.get("slug")?.toString() ?? "",
      },
      body: {
        article: {
          title: formData.get("title")?.toString() ?? "",
          description: formData.get("description")?.toString() ?? "",
          body: formData.get("body")?.toString() ?? "",
        },
      },
    },
  });

  try {
    await client.sendRequest();
    return {
      errors: [],
    };
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
