"use client";

import { Button } from "@/components/button";
import { DefaultIcon } from "@/features/profile/defaultIcon";
import { Article, Profile } from "@/types";
import clsx from "clsx";
import Link from "next/link";
import { ComponentPropsWithoutRef, useState } from "react";
import {
  deleteArticleAction,
  favoriteArticleAction,
  followAction,
  unfavoriteArticleAction,
  unfollowAction,
} from "./actions";

type Props = ComponentPropsWithoutRef<"div"> & {
  author: Profile;
  article: Article;
};

export const ArticleMeta = ({ author, article, className, ...rest }: Props) => {
  const [articleState, setArticleState] = useState(article);
  const [authorState, setAuthorState] = useState(author);

  const onClickFavorite = async () => {
    if (articleState.favorited) {
      const newArticle = await unfavoriteArticleAction(articleState.slug);
      setArticleState(newArticle);
    } else {
      const newArticle = await favoriteArticleAction(articleState.slug);
      setArticleState(newArticle);
    }
  };

  const onClickFollow = async () => {
    if (authorState.following) {
      const newAuthor = await unfollowAction(authorState.username);
      setAuthorState(newAuthor);
    } else {
      const newAuthor = await followAction(authorState.username);
      setAuthorState(newAuthor);
    }
  };

  const onClickDeleteArticle = () => {
    deleteArticleAction(articleState.slug);
  };

  return (
    <div className={clsx("article-meta", className)} {...rest}>
      <Link href={`/profile/${authorState.username}`}>
        {authorState.image ? <img src={authorState.image} alt="" /> : <DefaultIcon />}
      </Link>
      <div className="info">
        <Link href={`/profile/${authorState.username}`} className="author">
          {authorState.username}
        </Link>
        <span className="date">{articleState.createdAt.toDateString()}</span>
      </div>
      <Button component="button" onClick={onClickFollow} variant={authorState.following ? "filled" : "outline"}>
        <i className="ion-plus-round"></i> {authorState.following ? "Unfollow" : "Follow"} {authorState.username}
      </Button>
      <Button component="button" onClick={onClickFavorite} variant={articleState.favorited ? "filled" : "outline"}>
        <i className="ion-heart"></i> {articleState.favorited ? "Unfavorite" : "Favorite"} Article{" "}
        <span className="counter">({articleState.favoritesCount})</span>
      </Button>
      <Button component="a" href={`/editor/${articleState.slug}`} color="secondary">
        <i className="ion-edit"></i> Edit Article
      </Button>
      <Button component="button" color="danger" onClick={onClickDeleteArticle}>
        <i className="ion-trash-a"></i> Delete Article
      </Button>
    </div>
  );
};
