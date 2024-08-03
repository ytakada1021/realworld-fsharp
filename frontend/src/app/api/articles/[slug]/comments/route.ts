import { createApiClient, isForbiddenError, isUnauthorizedError } from "@/api/apiClient";
import { ApiResponse } from "@/api/types";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export const POST = async (request: Request, { params }: { params: { slug: string } }) => {
  const requestBody = await request.json();

  const client = createApiClient({
    path: "/articles/{slug}/comments",
    httpMethod: "post",
    params: {
      paths: {
        slug: params.slug,
      },
      body: {
        comment: {
          body: requestBody.body,
        },
      },
    },
  });

  try {
    const response = await client.sendRequest();
    return NextResponse.json(response.comment);
  } catch (err) {
    if (isUnauthorizedError(err) || isForbiddenError(err)) {
      redirect("/login");
    }
    throw err;
  }
};
