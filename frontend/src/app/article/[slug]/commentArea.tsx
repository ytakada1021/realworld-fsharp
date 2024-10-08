"use client";

import { CommentCard } from "@/modules/features/article/components/commentCard";
import { CommentForm } from "@/modules/features/article/components/commentForm";
import { Comment, User } from "@/shared/types";
import clsx from "clsx";
import { ChangeEventHandler, ComponentPropsWithoutRef, use, useState } from "react";
import { postCommentAction } from "./actions";
import { showCommentTrashButton } from "./authorization";

type Props = ComponentPropsWithoutRef<"div"> & {
  slug: string;
  initialComments: Promise<Comment[]>;
  authUser?: User;
};

export const CommentArea = ({ slug, initialComments, authUser, className, ...rest }: Props) => {
  const [comments, setComments] = useState(use(initialComments));
  const [bodyState, setBodyState] = useState("");

  const onChangeBody: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setBodyState(event.target.value);
  };

  const onClickPostComment = async () => {
    const postedComment = await postCommentAction({ slug, body: bodyState });
    setComments((prev) => [postedComment, ...prev]);
  };

  return (
    <div className={clsx("row", className)} {...rest}>
      <div className="col-xs-12 col-md-8 offset-md-2">
        <CommentForm
          authorImage={authUser?.image}
          body={bodyState}
          onClickPostComment={onClickPostComment}
          onChangeBody={onChangeBody}
        />
        {comments.map((comment, index) => (
          <CommentCard
            key={index}
            comment={comment}
            showTrash={showCommentTrashButton(comment.author.username, authUser)}
          />
        ))}
      </div>
    </div>
  );
};
