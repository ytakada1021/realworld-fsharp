"use client";

import clsx from "clsx";
import Link from "next/link";
import { ComponentPropsWithoutRef, FC, MouseEventHandler, useState } from "react";
import { deleteArticleAction } from "./actions";
import { Button } from "@/components/button";
import { bffApiBaseUrl } from "@/constants";
import { Article, Profile } from "@/types";

type Props = ComponentPropsWithoutRef<"div"> & {
  author: Profile;
  article: Article;
  onClickFavorite?: MouseEventHandler<HTMLButtonElement>;
  onClickFollow?: MouseEventHandler<HTMLButtonElement>;
};

const ArticleMeta: FC<Props> = ({ author, article, onClickFavorite, onClickFollow, className, ...rest }) => {
  return (
    <div className={clsx("article-meta", className)} {...rest}>
      <Link href={`/profile/${author.username}`}>
        <img src={author.image} />
      </Link>
      <div className="info">
        <Link href={`/profile/${author.username}`} className="author">
          {author.username}
        </Link>
        <span className="date">January 20th</span>
      </div>
      <Button component="button" onClick={onClickFollow}>
        <i className="ion-plus-round"></i> {author.following ? "Unfollow" : "Follow"} {author.username}
      </Button>
      <Button component="button" onClick={onClickFavorite}>
        <i className="ion-heart"></i> {article.favorited ? "Unfavorite" : "Favorite"} Article{" "}
        <span className="counter">({article.favoritesCount})</span>
      </Button>
      <Button component="a" href={`/editor/${article.slug}`} color="secondary">
        <i className="ion-edit"></i> Edit Article
      </Button>
      <form action={deleteArticleAction}>
        <input type="hidden" name="slug" value={article.slug} />
        <Button component="button" color="danger" type="submit">
          <i className="ion-trash-a"></i> Delete Article
        </Button>
      </form>
    </div>
  );
};

type ContainerProps = Props;

export const ArticleMetaContainer: FC<ContainerProps> = ({ author, article, ...rest }) => {
  const [articleState, setArticleState] = useState(article);
  const [authorState, setAuthorState] = useState(author);

  const onClickFavorite = async () => {
    if (article.favorited) {
      const response = await fetch(`${bffApiBaseUrl}/articles/${article.slug}/favorite`, {
        method: "delete",
      });

      const body = await response.json();
      setArticleState({ ...body });
    } else {
      const response = await fetch(`${bffApiBaseUrl}/articles/${article.slug}/favorite`, {
        method: "post",
      });

      const body = await response.json();
      setArticleState({ ...body });
    }
  };

  const onClickFollow = async () => {
    if (author.following) {
      const response = await fetch(`${bffApiBaseUrl}/profiles/${author.username}/follow`, {
        method: "delete",
      });

      const body = await response.json();
      setAuthorState({ ...body });
    } else {
      const response = await fetch(`${bffApiBaseUrl}/profiles/${author.username}/follow`, {
        method: "post",
      });

      const body = await response.json();
      setAuthorState({ ...body });
    }
  };

  return (
    <ArticleMeta
      article={articleState}
      author={authorState}
      onClickFavorite={onClickFavorite}
      onClickFollow={onClickFollow}
      {...rest}
    />
  );
};
