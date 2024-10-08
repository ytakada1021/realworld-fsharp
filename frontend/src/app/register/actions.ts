"use server";

import { createApiClient, isUnprocessableEntityError } from "@/shared/api/apiClient";
import { saveSessionData } from "@/shared/auth/session";
import { redirect } from "next/navigation";
import { FormState } from "./types";

export const signUpAction = async (_prevState: FormState, formData: FormData) => {
  const client = createApiClient({
    path: "/users",
    httpMethod: "post",
    params: {
      body: {
        user: {
          username: formData.get("username")?.toString() ?? "",
          email: formData.get("email")?.toString() ?? "",
          password: formData.get("password")?.toString() ?? "",
        },
      },
    },
  });

  try {
    const response = await client.sendRequest();
    saveSessionData({ authUser: response.user });
  } catch (err) {
    if (isUnprocessableEntityError(err)) {
      return {
        errors: err.errors.body,
      };
    }
    throw err;
  }

  redirect("/");
};
