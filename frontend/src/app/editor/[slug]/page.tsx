import { EditArticleForm } from "./editArticleForm";
import { fetchArticle } from "./fetch";

type Props = {
  params: {
    slug: string;
  };
};

const EditArticlePage = async ({ params }: Props) => {
  const article = await fetchArticle(params.slug);

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
