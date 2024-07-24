import clsx from "clsx";
import Link from "next/link";
import { ComponentPropsWithoutRef, FC } from "react";

type CommentAuthor = {
  username: string;
  image: string;
};

type Comment = {
  id: string;
  body: string;
  createdAt: Date;
  author: CommentAuthor;
};

type CommentCardProps = ComponentPropsWithoutRef<"div"> & {
  comment: Comment;
  showTrash?: boolean;
};

export const CommentCard: FC<CommentCardProps> = ({ comment, showTrash, className, ...rest }) => {
  const { author } = comment;

  return (
    <div className={clsx("card", className)} {...rest}>
      <div className="card-block">
        <p className="card-text">{comment.body}</p>
      </div>
      <div className="card-footer">
        <Link href={`/profile/${author.username}`} className="comment-author">
          <img src={author.image || "https://picsum.photos/200"} className="comment-author-img" />
        </Link>
        &nbsp;
        <Link href={`/profile/${author.username}`} className="comment-author">
          {author.username}
        </Link>
        <span className="date-posted">Dec 29th</span>
        {showTrash && (
          <span className="mod-options">
            <i className="ion-trash-a"></i>
          </span>
        )}
      </div>
    </div>
  );
};
