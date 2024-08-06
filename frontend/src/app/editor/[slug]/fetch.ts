import { createApiClient, isForbiddenError, isUnauthorizedError } from "@/shared/api/apiClient";
import { articleSchema } from "@/shared/types";
import { redirect } from "next/navigation";

export const fetchArticle = async (slug: string) => {
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
};
