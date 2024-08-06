import { Button } from "@/modules/common/components/button";
import { DefaultIcon } from "@/modules/common/components/defaultIcon";
import clsx from "clsx";
import { ChangeEventHandler, ComponentPropsWithoutRef, MouseEventHandler } from "react";

type Props = ComponentPropsWithoutRef<"form"> & {
  authorImage?: string;
  body: string;
  onChangeBody: ChangeEventHandler<HTMLTextAreaElement>;
  onClickPostComment?: MouseEventHandler<HTMLButtonElement>;
};

export const CommentForm = ({ authorImage, body, onChangeBody, onClickPostComment, className, ...rest }: Props) => (
  <form className={clsx("card comment-form", className)} {...rest}>
    <div className="card-block">
      <textarea
        name="body"
        className="form-control"
        placeholder="Write a comment..."
        rows={3}
        value={body}
        onChange={onChangeBody}
      ></textarea>
    </div>
    <div className="card-footer">
      {authorImage ? (
        <img src={authorImage} alt="" className="comment-author-img" />
      ) : (
        <DefaultIcon className="comment-author-img" />
      )}
      <Button component="button" type="button" onClick={onClickPostComment}>
        Post Comment
      </Button>
    </div>
  </form>
);
