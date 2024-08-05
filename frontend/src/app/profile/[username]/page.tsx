import Link from "next/link";
import { fetchArticlesByAuthor } from "./fetch";
import { searchParamsSchema } from "./types";
import { ArticlePreview } from "@/features/article/components/articlePreview";
import { calcTotalPageNumber, generateUrl } from "@/app/functions";
import { Pagination, PaginationItem } from "@/components/pagination";

type Props = {
  params: {
    username: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

const ProfilePage = async (props: Props) => {
  const searchParams = searchParamsSchema.parse(props.searchParams);
  const { articles, articlesCount } = await fetchArticlesByAuthor(props.params.username, searchParams.page);
  const totalPages = calcTotalPageNumber(articlesCount, 10);

  return (
    <>
      <div className="articles-toggle">
        <ul className="nav nav-pills outline-active">
          <li className="nav-item">
            <Link className="nav-link active" href={`/profile/${props.params.username}`}>
              My Articles
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href={`/profile/${props.params.username}/favorites`}>
              Favorited Articles
            </Link>
          </li>
        </ul>
      </div>
      {articles.map((article, index) => {
        return <ArticlePreview article={article} key={index} />;
      })}
      <Pagination>
        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          const href = `/profile/${props.params.username}/?page=${page}`;
          return (
            <PaginationItem href={href} active={page === searchParams.page} key={index}>
              {page}
            </PaginationItem>
          );
        })}
      </Pagination>
    </>
  );
};

export default ProfilePage;
