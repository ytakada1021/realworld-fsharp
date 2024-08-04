import { Pagination, PaginationItem } from "@/components/pagination";
import { ArticlePreview } from "@/features/article/components/articlePreview";
import { Tag } from "@/features/article/components/tag";
import { fetchTags, fetchArticles } from "./fetch";
import { searchParamsSchema } from "./types";
import Link from "next/link";
import clsx from "clsx";
import { calcTotalPageNumber, generateUrl } from "./functions";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const HomePage = async (props: Props) => {
  const searchParams = searchParamsSchema.parse(props.searchParams);
  const globalFeedArticles = await fetchArticles(searchParams);
  const { tags } = await fetchTags();
  const totalPages = calcTotalPageNumber(searchParams.page, 10);

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <Link
                    className={clsx("nav-link", searchParams.tab === "your-feed" && "active")}
                    href="/?tab=your-feed"
                  >
                    Your Feed
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={clsx("nav-link", searchParams.tab === "global-feed" && "active")}
                    href="/?tab=global-feed"
                  >
                    Global Feed
                  </Link>
                </li>
                {searchParams.tag && (
                  <li className="nav-item">
                    <Link
                      className={clsx("nav-link", searchParams.tab === "tag" && "active")}
                      href={`/?tab=tag&tag=${searchParams.tag}`}
                    >
                      #{searchParams.tag}
                    </Link>
                  </li>
                )}
              </ul>
            </div>

            {globalFeedArticles.articles.map((article, index) => (
              <ArticlePreview key={index} article={article} />
            ))}

            <Pagination>
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                const href = generateUrl(page.toString(), searchParams.tab, searchParams.tag);
                return (
                  <PaginationItem href={href} active={page === searchParams.page} key={index}>
                    {page}
                  </PaginationItem>
                );
              })}
            </Pagination>
          </div>

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>

              <div className="tag-list">
                {tags.map((tag, index) => (
                  <Tag as="a" variant="filled" href={`/?tab=tag&tag=${tag}`} key={index}>
                    {tag}
                  </Tag>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
