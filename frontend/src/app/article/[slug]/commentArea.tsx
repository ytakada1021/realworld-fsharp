"use client";

import { bffApiBaseUrl } from "@/constants";
import { CommentCard } from "@/features/article/components/CommentCard";
import { CommentForm } from "@/features/article/components/CommentForm";
import { Comment, commentSchema, User } from "@/types";
import clsx from "clsx";
import { ComponentPropsWithoutRef, useState } from "react";

type Props = ComponentPropsWithoutRef<"div"> & {
  slug: string;
  initialComments: Comment[];
  authUser?: User;
};

export const CommentArea = ({ slug, initialComments, authUser, className, ...rest }: Props) => {
  const [comments, setComments] = useState(initialComments);

  const onClickPostComment = async () => {
    const response = await fetch(`${bffApiBaseUrl}/articles/${slug}/comments`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ body: "sampleBody" }),
    });

    const comment = commentSchema.parse(await response.json());
    setComments((prev) => [comment, ...prev]);
  };

  return (
    <div className={clsx("row", className)} {...rest}>
      <div className="col-xs-12 col-md-8 offset-md-2">
        <CommentForm author={authUser} onClickPostComment={onClickPostComment} />
        {comments.map((comment, index) => (
          <CommentCard key={index} comment={comment} />
        ))}
      </div>
    </div>
  );
};
