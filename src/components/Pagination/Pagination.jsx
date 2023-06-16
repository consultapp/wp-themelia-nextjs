import Link from "next/link";
import LoadingWheel from "@/components/LoadingWheel/LoadingWheel";

export default function Pagination({ postsCount, pageIndex }) {
  console.log("postsCount", postsCount);
  if (!postsCount) return <LoadingWheel />;

  const pageCount = Math.ceil(postsCount / process.env.POSTS_PER_PAGE);

  return (
    <nav className="navigation pagination" aria-label="Записи">
      <h2 className="screen-reader-text font-headlines">
        Навигация по записям
      </h2>
      <div className="nav-links">
        {pageCount > 1 && pageIndex != 1 && (
          <Link
            className="prev page-numbers"
            key={`pageIndex-${pageIndex - 1}`}
            href={`/posts/${pageIndex - 1}/`}
          >
            ← Ранее
          </Link>
        )}
        {new Array(pageCount).fill(0).map((_, i) => {
          const page = i + 1;
          return page === pageIndex ? (
            <span
              aria-current="page"
              key={`pageIndex-${page}`}
              className="page-numbers current"
            >
              {pageIndex}
            </span>
          ) : (
            <Link
              className="page-numbers"
              key={`pageIndex-${page}`}
              href={`/posts/${page}/`}
            >
              {page}
            </Link>
          );
        })}
        {pageCount > 1 && pageIndex < pageCount && (
          <Link
            className="next page-numbers"
            key={`pageIndex-${pageIndex + 1}`}
            href={`/posts/${pageIndex + 1}/`}
          >
            Далее →
          </Link>
        )}
      </div>
    </nav>
  );
}
