import { Tag } from "@/modules/features/article/components/tag";
import { getSessionData } from "@/shared/auth/session";
import { ArticleMeta } from "./articleMeta";
import { CommentArea } from "./commentArea";
import { fetchArticle, fetchComments } from "./fetch";
import { Suspense } from "react";

type Props = {
  params: {
    slug: string;
  };
};

const ArticlePage = async ({ params }: Props) => {
  const article = await fetchArticle(params.slug);
  const comments = fetchComments(params.slug);
  const session = getSessionData();

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>
          <ArticleMeta article={article} authUser={session?.authUser} />
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
          <ArticleMeta article={article} authUser={session?.authUser} />
        </div>

        <Suspense fallback={<p>⌛Loading...</p>}>
          <CommentArea slug={params.slug} initialComments={comments} authUser={session?.authUser} />
        </Suspense>
      </div>
    </div>
  );
};

export default ArticlePage;
