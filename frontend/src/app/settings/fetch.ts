"use server";

import { createApiClient, isForbiddenError, isUnauthorizedError } from "@/shared/api/apiClient";
import { userSchema } from "@/shared/types";
import { redirect } from "next/navigation";

export const fetchSettings = async () => {
  const client = createApiClient({
    path: "/user",
    httpMethod: "get",
  });

  try {
    const response = await client.sendRequest();
    return userSchema.parse(response.user);
  } catch (err) {
    if (isUnauthorizedError(err) || isForbiddenError(err)) {
      redirect("/login");
    }
    throw err;
  }
};
