"use server";

import {
  createApiClient,
  isForbiddenError,
  isUnauthorizedError,
  isUnprocessableEntityError,
} from "@/shared/api/apiClient";
import { redirect } from "next/navigation";
import { Inputs } from "./types";
import { deleteSession } from "@/shared/auth/session";

export const updateSettingsAction = async (inputs: Inputs) => {
  const client = createApiClient({
    path: "/user",
    httpMethod: "put",
    params: {
      body: {
        user: inputs,
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
