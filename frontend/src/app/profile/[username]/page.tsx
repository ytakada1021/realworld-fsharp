import { Pagination, PaginationItem } from "@/modules/common/components/pagination";
import { calcTotalPageNumber } from "@/modules/common/functions/pagination";
import { ArticlePreview } from "@/modules/features/article/components/articlePreview";
import Link from "next/link";
import { Suspense } from "react";
import { fetchArticlesByAuthor } from "./fetch";
import { SearchParams, searchParamsSchema } from "./types";

const ArticleList = async ({ username, searchParams }: { username: string; searchParams: SearchParams }) => {
  const { articles, articlesCount } = await fetchArticlesByAuthor(username, searchParams.page);
  const totalPages = calcTotalPageNumber(articlesCount, 10);

  return (
    <>
      {articles.map((article, index) => (
        <ArticlePreview article={article} key={index} />
      ))}
      <Pagination>
        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          const href = `/profile/${username}/?page=${page}`;
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

type Props = {
  params: {
    username: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

const ProfilePage = async (props: Props) => {
  const searchParams = searchParamsSchema.parse(props.searchParams);

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
      <Suspense key={JSON.stringify(searchParams)} fallback={<p>⌛Loading...</p>}>
        <ArticleList username={props.params.username} searchParams={searchParams} />
      </Suspense>
    </>
  );
};

export default ProfilePage;
