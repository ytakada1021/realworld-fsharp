import { User } from "@/shared/types";

export const showEditArticleButton = (articleAuthorUsername: string, authUser: User | undefined) => {
  if (authUser == null) {
    return false;
  }

  return articleAuthorUsername === authUser.username;
};

export const showDeleteArticleButton = showEditArticleButton;

export const showCommentTrashButton = (commentAuthorUsername: string, authUser: User | undefined) => {
  if (authUser == null) {
    return false;
  }

  return commentAuthorUsername === authUser.username;
};
