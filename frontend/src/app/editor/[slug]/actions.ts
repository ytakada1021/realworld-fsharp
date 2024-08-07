"use server";

import {
  createApiClient,
  isForbiddenError,
  isUnauthorizedError,
  isUnprocessableEntityError,
} from "@/shared/api/apiClient";
import { redirect } from "next/navigation";
import { Inputs } from "./types";

export const updateArticleAction = async (inputs: Inputs) => {
  const client = createApiClient({
    path: "/articles/{slug}",
    httpMethod: "put",
    params: {
      paths: {
        slug: inputs.slug,
      },
      body: {
        article: {
          title: inputs.title,
          description: inputs.description,
          body: inputs.body,
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
      redirect("/login");
    }
    throw err;
  }
};
