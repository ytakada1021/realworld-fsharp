import { FC } from "react";
import { fetchArticle, fetchComments } from "./fetch";
import { Tag } from "@/features/article/components/Tag";
import { ArticleMetaContainer } from "./articleMeta";
import { CommentArea } from "./commentArea";
import { getSessionData } from "@/features/auth/session";

type Props = {
  params: {
    slug: string;
  };
};

const ArticlePage: FC<Props> = async ({ params }) => {
  const article = await fetchArticle(params.slug);
  const author = article.author;
  const comments = await fetchComments(params.slug);
  const session = getSessionData();

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>
          <ArticleMetaContainer author={author} article={article} />
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <div dangerouslySetInnerHTML={{ __html: article.body }} />
            <ul className="tag-list">
              {article.tagList.map((tag, index) => (
                <Tag as="li" variant="outline" key={index}>
                  {tag}
                </Tag>
              ))}
            </ul>
          </div>
        </div>

        <hr />

        <div className="article-actions">
          <ArticleMetaContainer author={author} article={article} />
        </div>

        <CommentArea slug={params.slug} initialComments={comments} authUser={session?.authUser} />
      </div>
    </div>
  );
};

export default ArticlePage;
