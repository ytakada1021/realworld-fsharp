import { createApiClient, isForbiddenError, isUnauthorizedError } from "@/api/apiClient";
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
    return await client.sendRequest();
  } catch (err) {
    if (isUnauthorizedError(err) || isForbiddenError(err)) {
      redirect("/login");
    }
    throw err;
  }
};
