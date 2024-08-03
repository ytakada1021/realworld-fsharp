"use server";

import { createApiClient, isForbiddenError, isUnauthorizedError } from "@/api/apiClient";
import { redirect } from "next/navigation";

export const deleteArticleAction = async (formData: FormData) => {
  const client = createApiClient({
    path: "/articles/{slug}",
    httpMethod: "delete",
    params: {
      paths: {
        slug: formData.get("slug")?.toString() ?? "",
      },
    },
  });

  try {
    await client.sendRequest();
    redirect("/");
  } catch (err) {
    if (isUnauthorizedError(err) || isForbiddenError(err)) {
      redirect("/login");
    }
    throw err;
  }
};
