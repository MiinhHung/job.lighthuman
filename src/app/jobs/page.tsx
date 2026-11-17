import { Fragment, Suspense } from "react";
import Link from "next/link";
import { AdBanner, JobRow } from "@/components/cards";
import JobFilters from "@/components/jobs/JobFilters";
import { JobSearchForm, PageSearch } from "@/components/PageBanners";
import Pagination from "@/components/Pagination";
import { filterJobs, toArray, type SearchParams } from "@/lib/data";

export const metadata = { title: "Jobs In United States of America" };

async function SearchBox({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams;
  return <JobSearchForm defaultValue={toArray(sp.search)[0] ?? ""} />;
}

async function Results({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams;
  const r = filterJobs(sp);

  const hrefFor = (page: number) => {
    const q = new URLSearchParams();
    for (const [k, v] of Object.entries(sp)) if (k !== "page") toArray(v).forEach((x) => q.append(k, x));
    q.set("page", String(page));
    return `/jobs?${q.toString()}`;
  };
  const summary = `Showing Jobs : ${r.from} - ${r.to} Tổng cộng ${r.total}`;

  return (
    <div className="-mx-3 flex flex-wrap">
      <div className="w-full px-3 lg:w-1/4">
        <div className="mb-5">
          <Link
            href="/login"
            className="mb-2.5 block rounded-[5px] bg-brand px-5 py-3 text-left text-[16px] leading-6 font-bold text-white hover:bg-[#333] hover:text-white"
          >
            <i className="fa-solid fa-file-lines" /> Tải lên hồ sơ của bạn
          </Link>
        </div>
        <JobFilters widgets={r.widgets} selected={r.selected} search={r.search} />
      </div>

      <div className="w-full px-3 lg:w-3/4">
        <div className="mb-[30px]">{summary}</div>
        <ul className="mb-[30px]">
          {r.items.length === 0 && (
            <li className="rounded-[10px] border border-line bg-[#fcfdff] px-[18px] py-[22px] text-[16px] leading-6">
              Không tìm thấy việc làm phù hợp.{" "}
              <Link href="/jobs">Xem tất cả việc làm</Link>
            </li>
          )}
          {r.items.map((job, i) => (
            <Fragment key={job.slug}>
              <JobRow job={job} />
              {i === 5 && (
                <li className="mb-[15px] rounded-[10px] border border-line bg-[#fcfdff] px-[18px] py-[22px]">
                  <AdBanner boxed={false} className="max-w-[728px]" />
                </li>
              )}
            </Fragment>
          ))}
        </ul>
        <Pagination page={r.page} pages={r.pages} hrefFor={hrefFor} summary={summary} />
      </div>
    </div>
  );
}

export default function JobsPage(props: PageProps<"/jobs">) {
  return (
    <>
      <PageSearch>
        <Suspense fallback={<JobSearchForm />}>
          <SearchBox searchParams={props.searchParams} />
        </Suspense>
      </PageSearch>
      <div className="py-10 max-lg:px-3">
        <div className="container-site">
          <Suspense fallback={<div className="py-20 text-center text-muted">Đang tải…</div>}>
            <Results searchParams={props.searchParams} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
