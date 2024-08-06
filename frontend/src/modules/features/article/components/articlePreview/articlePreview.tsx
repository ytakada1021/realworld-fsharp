"use client";

import { favoriteArticleAction } from "@/app/actions";
import { Button } from "@/modules/common/components/button";
import { DefaultIcon } from "@/modules/common/components/icons/defaultIcon";
import { Article } from "@/shared/types";
import clsx from "clsx";
import Link from "next/link";
import { ComponentPropsWithoutRef, useState } from "react";
import { Tag } from "../tag";

type Props = ComponentPropsWithoutRef<"div"> & {
  article: Article;
};

export const ArticlePreview = ({ article, className, ...rest }: Props) => {
  const [articleState, setArticleState] = useState(article);
  const author = articleState.author;

  const onClickFavoriteButton = async () => {
    const response = await favoriteArticleAction(article.slug);
    setArticleState(response);
  };

  return (
    <div className={clsx("article-preview", className)} {...rest}>
      <div className="article-meta">
        <Link href={`/profile/${author.username}`}>
          {author.image ? <img src={author.image} alt="" /> : <DefaultIcon />}
        </Link>
        <div className="info">
          <Link href={`/profile/${author.username}`} className="author">
            {author.username}
          </Link>
          <span className="date">{article.createdAt.toDateString()}</span>
        </div>
        <Button
          component="button"
          onClick={onClickFavoriteButton}
          className="pull-xs-right"
          variant={article.favorited ? "filled" : "outline"}
        >
          <i className="ion-heart"></i> {article.favoritesCount}
        </Button>
      </div>
      <Link href={`/article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {article.tagList.map((tag, index) => (
            <Tag as="li" key={index} variant="outline">
              {tag}
            </Tag>
          ))}
        </ul>
      </Link>
    </div>
  );
};
