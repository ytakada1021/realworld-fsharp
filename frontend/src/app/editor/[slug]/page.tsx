import { FC } from "react";
import { fetchArticle } from "./fetch";
import { EditArticleForm } from "./form";

type Props = {
  params: {
    slug: string;
  };
};

const EditArticlePage: FC<Props> = async ({ params }) => {
  const { article } = await fetchArticle(params.slug);

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <EditArticleForm article={article} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditArticlePage;
