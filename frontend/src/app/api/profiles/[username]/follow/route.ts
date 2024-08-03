import { createApiClient, isUnauthorizedError, isForbiddenError } from "@/api/apiClient";
import { redirect } from "next/navigation";

export const POST = async (_request: Request, { params }: { params: { username: string } }) => {
  const client = createApiClient({
    path: "/profiles/{username}/follow",
    httpMethod: "post",
    params: {
      paths: {
        username: params.username,
      },
    },
  });

  try {
    const { profile } = await client.sendRequest();
    return Response.json(profile);
  } catch (err) {
    if (isUnauthorizedError(err) || isForbiddenError(err)) {
      redirect("/login");
    }
    throw err;
  }
};

export const DELETE = async (_request: Request, { params }: { params: { username: string } }) => {
  const client = createApiClient({
    path: "/profiles/{username}/follow",
    httpMethod: "delete",
    params: {
      paths: {
        username: params.username,
      },
    },
  });

  try {
    const { profile } = await client.sendRequest();
    return Response.json(profile);
  } catch (err) {
    if (isUnauthorizedError(err) || isForbiddenError(err)) {
      redirect("/login");
    }
    throw err;
  }
};
