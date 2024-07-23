import clsx from "clsx";
import { ComponentPropsWithoutRef, FC, MouseEventHandler } from "react";

type CommentAuthor = {
  image: string;
};

type CommentFormProps = ComponentPropsWithoutRef<"form"> & {
  author: CommentAuthor;
  onClickPostComment?: MouseEventHandler<HTMLButtonElement>;
};

export const CommentForm: FC<CommentFormProps> = ({ author, onClickPostComment, className, ...rest }) => (
  <form className={clsx("card comment-form", className)} {...rest}>
    <div className="card-block">
      <textarea className="form-control" placeholder="Write a comment..." rows={3}></textarea>
    </div>
    <div className="card-footer">
      <img src={author.image || "https://picsum.photos/200"} className="comment-author-img" />
      <button className="btn btn-sm btn-primary" onClick={onClickPostComment}>
        Post Comment
      </button>
    </div>
  </form>
);
