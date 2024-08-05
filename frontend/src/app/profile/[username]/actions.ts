"use server";

import { createApiClient, isUnauthorizedError, isForbiddenError } from "@/api/apiClient";
import { profileSchema } from "@/types";
import { redirect } from "next/navigation";

export const followAction = async (username: string) => {
  const client = createApiClient({
    path: "/profiles/{username}/follow",
    httpMethod: "post",
    params: {
      paths: {
        username,
      },
    },
  });

  try {
    const response = await client.sendRequest();
    return profileSchema.parse(response.profile);
  } catch (err) {
    if (isUnauthorizedError(err) || isForbiddenError(err)) {
      redirect("/login");
    }
    throw err;
  }
};
