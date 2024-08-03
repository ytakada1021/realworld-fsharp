import clsx from "clsx";
import { ComponentPropsWithoutRef, FC, MouseEventHandler } from "react";
import { FavoriteButtonPreview } from "./favoriteButtonPreview";
import { Tag } from "./tag";
import Link from "next/link";

type Author = {
  username: string;
  image: string;
};

export type Article = {
  slug: string;
  title: string;
  description: string;
  tagList: string[];
  favorited: boolean;
  favoritesCount: number;
  createdAt: Date;
  author: Author;
};

type ArticlePreviewProps = ComponentPropsWithoutRef<"div"> & {
  article: Article;
  onClickFavoriteButton?: MouseEventHandler<HTMLButtonElement>;
};

export const ArticlePreview: FC<ArticlePreviewProps> = ({ article, onClickFavoriteButton, className, ...rest }) => {
  const author = article.author;

  return (
    <div className={clsx("article-preview", className)} {...rest}>
      <div className="article-meta">
        <Link href={`/profile/${author.username}`}>
          <img src={author.image || "https://picsum.photos/200"} />
        </Link>
        <div className="info">
          <Link href={`/profile/${author.username}`} className="author">
            {author.username}
          </Link>
          <span className="date">{article.createdAt.toDateString()}</span>
        </div>
        <FavoriteButtonPreview
          isFavorited={article.favorited}
          onClick={onClickFavoriteButton}
          favoritesCount={article.favoritesCount}
        />
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
