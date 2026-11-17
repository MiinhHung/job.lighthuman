import Link from "next/link";

const box = "inline-block border border-[#ddd] bg-white px-6 py-[11px] text-[14px] leading-[14px]";

/** Simple previous / next pager (the live site shows Laravel's compact paginator). */
export default function Pagination({
  page,
  pages,
  hrefFor,
  summary,
}: {
  page: number;
  pages: number;
  hrefFor: (page: number) => string;
  summary: React.ReactNode;
}) {
  return (
    <div className="-mx-3 flex flex-wrap items-center">
      <div className="w-full px-3 font-semibold text-[#333] lg:w-5/12">{summary}</div>
      {pages > 1 && (
        <nav aria-label="Pagination" className="w-full px-3 max-lg:mt-4 lg:w-7/12">
          <div className="flex">
            {page > 1 ? (
              <Link href={hrefFor(page - 1)} className={`${box} text-brand`}>
                « Previous
              </Link>
            ) : (
              <span className={`${box} cursor-default text-[#333]`}>« Previous</span>
            )}
            {page < pages ? (
              <Link href={hrefFor(page + 1)} className={`${box} -ml-px text-brand`}>
                Next »
              </Link>
            ) : (
              <span className={`${box} -ml-px cursor-default text-[#333]`}>Next »</span>
            )}
          </div>
        </nav>
      )}
    </div>
  );
}
