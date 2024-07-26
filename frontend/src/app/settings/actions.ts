"use server";

import { createApiClient, isForbiddenError, isUnauthorizedError, isUnprocessableEntityError } from "@/api/apiClient";
import { deleteSession } from "@/features/auth/session";
import { redirect } from "next/navigation";
import { FormState } from "./types";

export const updateSettingsAction = async (_prevState: FormState, formData: FormData) => {
  const client = createApiClient({
    path: "/user",
    httpMethod: "put",
    params: {
      body: {
        user: {
          username: formData.get("username")?.toString() ?? undefined,
          bio: formData.get("bio")?.toString() ?? undefined,
          image: formData.get("image")?.toString() ?? undefined,
          email: formData.get("email")?.toString() ?? undefined,
          password: formData.get("password")?.toString() ?? undefined,
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
      redirect("login");
    }
    throw err;
  }
};

export const logoutAction = async () => {
  deleteSession();
  redirect("/login");
};
