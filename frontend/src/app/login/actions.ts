"use server";

import { createApiClient, isUnprocessableEntityError } from "@/api/apiClient";
import { saveSessionData } from "@/features/auth/session";
import { redirect } from "next/navigation";
import { FormState } from "./types";

export const signInAction = async (_prevState: FormState, formData: FormData) => {
  const client = createApiClient({
    path: "/users/login",
    httpMethod: "post",
    params: {
      body: {
        user: {
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
