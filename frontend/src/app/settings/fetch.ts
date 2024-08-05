"use server";

import { createApiClient, isUnauthorizedError, isForbiddenError } from "@/api/apiClient";
import { redirect } from "next/navigation";

export const fetchSettings = async () => {
  const client = createApiClient({
    path: "/user",
    httpMethod: "get",
  });

  try {
    return client.sendRequest();
  } catch (err) {
    if (isUnauthorizedError(err) || isForbiddenError(err)) {
      redirect("/login");
    }
    throw err;
  }
};
