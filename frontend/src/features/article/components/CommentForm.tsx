"use client";

import { Button } from "@/components/button";
import { DefaultIcon } from "@/features/profile/defaultIcon";
import clsx from "clsx";
import { ComponentPropsWithoutRef, MouseEventHandler } from "react";

type CommentAuthor = {
  image: string;
};

type Props = ComponentPropsWithoutRef<"form"> & {
  author?: CommentAuthor;
  onClickPostComment?: MouseEventHandler<HTMLButtonElement>;
};

export const CommentForm = ({ author, onClickPostComment, className, ...rest }: Props) => (
  <form className={clsx("card comment-form", className)} {...rest}>
    <div className="card-block">
      <textarea name="body" className="form-control" placeholder="Write a comment..." rows={3}></textarea>
    </div>
    <div className="card-footer">
      {author?.image ? (
        <img src={author.image} alt="" className="comment-author-img" />
      ) : (
        <DefaultIcon className="comment-author-img" />
      )}
      <Button component="button" type="button" onClick={onClickPostComment}>
        Post Comment
      </Button>
    </div>
  </form>
);
