import { createApiClient, isUnauthorizedError, isForbiddenError } from "@/api/apiClient";
import { redirect } from "next/navigation";

export const POST = async (_request: Request, { params }: { params: { slug: string } }) => {
  const client = createApiClient({
    path: "/articles/{slug}/favorite",
    httpMethod: "post",
    params: {
      paths: {
        slug: params.slug,
      },
    },
  });

  try {
    const { article } = await client.sendRequest();
    return Response.json(article);
  } catch (err) {
    if (isUnauthorizedError(err) || isForbiddenError(err)) {
      redirect("/login");
    }
    throw err;
  }
};

export const DELETE = async (_request: Request, { params }: { params: { slug: string } }) => {
  const client = createApiClient({
    path: "/articles/{slug}/favorite",
    httpMethod: "delete",
    params: {
      paths: {
        slug: params.slug,
      },
    },
  });

  try {
    const { article } = await client.sendRequest();
    return Response.json(article);
  } catch (err) {
    if (isUnauthorizedError(err) || isForbiddenError(err)) {
      redirect("/login");
    }
    throw err;
  }
};
