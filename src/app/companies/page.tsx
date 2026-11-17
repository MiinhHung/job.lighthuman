import { Suspense } from "react";
import { CompanyCard } from "@/components/cards";
import { PageSearch } from "@/components/PageBanners";
import Pagination from "@/components/Pagination";
import { searchCompanies, toArray, type SearchParams } from "@/lib/data";

export const metadata = { title: "LIGHT HUMAN JOB PORTAL" };

function CompanySearchForm({ value = "" }: { value?: string }) {
  return (
    <>
      <h3 className="mb-2.5 text-[25px] text-white">Browse Companies.</h3>
      <h5 className="mb-4 text-[18px] text-white">Get hired in most high rated companies.</h5>
      <form action="/companies" method="get">
        <div className="flex rounded-[15px] bg-white p-2.5 shadow-[0_20px_40px_5px_rgba(0,0,0,0.1)]">
          <input
            type="text"
            name="search"
            defaultValue={value}
            placeholder='keywords e.g. "Google"'
            className="min-w-0 flex-1 px-3 py-[13px] text-[16px] text-[#495057] placeholder:text-[#6c757d]"
          />
          <button type="submit" className="ml-2.5 rounded-lg bg-brand px-5 py-[14px] text-[16px] font-semibold text-white hover:bg-[#444]">
            <i className="fa-solid fa-magnifying-glass" /> Search Company
          </button>
        </div>
      </form>
    </>
  );
}

async function SearchBox({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams;
  return <CompanySearchForm value={toArray(sp.search)[0] ?? ""} />;
}

async function List({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams;
  const r = searchCompanies(sp);
  const hrefFor = (page: number) => {
    const q = new URLSearchParams();
    if (r.search) q.set("search", r.search);
    q.set("page", String(page));
    return `/companies?${q.toString()}`;
  };
  return (
    <>
      <ul className="-mx-3 flex flex-wrap">
        {r.items.length === 0 && <li className="w-full px-3 py-10 text-center text-[16px]">Không tìm thấy công ty phù hợp.</li>}
        {r.items.map((c) => (
          <li key={c.slug} className="w-full px-3 md:w-1/2 lg:w-1/4">
            <CompanyCard company={c} spacing="mb-[30px]" />
          </li>
        ))}
      </ul>
      <Pagination page={r.page} pages={r.pages} hrefFor={hrefFor} summary={r.pages > 1 ? `Trang ${r.page} / ${r.pages}` : ""} />
    </>
  );
}

export default function CompaniesPage(props: PageProps<"/companies">) {
  return (
    <>
      <PageSearch>
        <Suspense fallback={<CompanySearchForm />}>
          <SearchBox searchParams={props.searchParams} />
        </Suspense>
      </PageSearch>
      <div className="py-10 max-lg:px-3">
        <div className="container-site">
          <Suspense fallback={<div className="py-20 text-center text-muted">Đang tải…</div>}>
            <List searchParams={props.searchParams} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
