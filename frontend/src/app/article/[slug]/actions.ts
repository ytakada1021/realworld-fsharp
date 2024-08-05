"use server";

import { createApiClient, isForbiddenError, isUnauthorizedError } from "@/api/apiClient";
import { articleSchema, commentSchema, profileSchema } from "@/types";
import { redirect } from "next/navigation";

export const favoriteArticleAction = async (slug: string) => {
  const client = createApiClient({
    path: "/articles/{slug}/favorite",
    httpMethod: "post",
    params: {
      paths: {
        slug,
      },
    },
  });

  try {
    const { article } = await client.sendRequest();
    return articleSchema.parse(article);
  } catch (err) {
    if (isUnauthorizedError(err) || isForbiddenError(err)) {
      redirect("/login");
    }
    throw err;
  }
};

export const unfavoriteArticleAction = async (slug: string) => {
  const client = createApiClient({
    path: "/articles/{slug}/favorite",
    httpMethod: "delete",
    params: {
      paths: {
        slug,
      },
    },
  });

  try {
    const { article } = await client.sendRequest();
    return articleSchema.parse(article);
  } catch (err) {
    if (isUnauthorizedError(err) || isForbiddenError(err)) {
      redirect("/login");
    }
    throw err;
  }
};

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
    const { profile } = await client.sendRequest();
    return profileSchema.parse(profile);
  } catch (err) {
    if (isUnauthorizedError(err) || isForbiddenError(err)) {
      redirect("/login");
    }
    throw err;
  }
};

export const unfollowAction = async (username: string) => {
  const client = createApiClient({
    path: "/profiles/{username}/follow",
    httpMethod: "delete",
    params: {
      paths: {
        username,
      },
    },
  });

  try {
    const { profile } = await client.sendRequest();
    return profileSchema.parse(profile);
  } catch (err) {
    if (isUnauthorizedError(err) || isForbiddenError(err)) {
      redirect("/login");
    }
    throw err;
  }
};

export const deleteArticleAction = async (slug: string) => {
  const client = createApiClient({
    path: "/articles/{slug}",
    httpMethod: "delete",
    params: {
      paths: {
        slug,
      },
    },
  });

  try {
    await client.sendRequest();
    redirect("/");
  } catch (err) {
    if (isUnauthorizedError(err) || isForbiddenError(err)) {
      redirect("/login");
    }
    throw err;
  }
};

export const postCommentAction = async ({ slug, body }: { slug: string; body: string }) => {
  const client = createApiClient({
    path: "/articles/{slug}/comments",
    httpMethod: "post",
    params: {
      paths: {
        slug,
      },
      body: {
        comment: {
          body,
        },
      },
    },
  });

  try {
    const { comment } = await client.sendRequest();
    return commentSchema.parse(comment);
  } catch (err) {
    if (isUnauthorizedError(err) || isForbiddenError(err)) {
      redirect("/login");
    }
    throw err;
  }
};
