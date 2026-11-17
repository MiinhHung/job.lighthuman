import Link from "next/link";
import type { ReactNode } from "react";

const bannerBg =
  "relative overflow-hidden bg-brand bg-[url(/images/pagetopbg.jpg)] bg-right-bottom bg-no-repeat";

/** `.pageTitle` – blue banner with heading + breadcrumb used by most inner pages. */
export function PageTitle({ title }: { title: string }) {
  return (
    <div className={`${bannerBg} pt-[180px] pb-[100px]`}>
      <div className="container-site relative z-[1]">
        <h1 className="mb-0 text-[36px] font-bold text-white max-lg:text-center">{title}</h1>
        <div className="mt-[15px] text-white max-lg:text-center">
          <Link href="/" className="inline-block px-[5px] text-white">
            Trang chủ
          </Link>{" "}
          / <span className="inline-block pl-[5px] text-sun">{title}</span>
        </div>
      </div>
    </div>
  );
}

/**
 * `.pageSearch` – blue banner with the illustration and a search form
 * (jobs, job detail, companies, CMS pages).
 */
export function PageSearch({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${bannerBg} pt-[120px] pb-[50px] max-lg:bg-none lg:pt-[160px] lg:pb-[100px] lg:after:absolute lg:after:-bottom-[200px] lg:after:-left-[200px] lg:after:size-[500px] lg:after:animate-scale-up lg:after:rounded-full lg:after:bg-white lg:after:opacity-10 lg:after:content-['']`}
    >
      <div className="container-site relative z-[1]">
        <div className="lg:w-7/12">{children}</div>
      </div>
    </div>
  );
}

export function JobSearchForm({ defaultValue = "", action = "/jobs" }: { defaultValue?: string; action?: string }) {
  return (
    <>
      <h3 className="mb-4 text-[25px] text-white">Hãy viết câu chuyện thành công của bạn ngay hôm nay.</h3>
      <form action={action} method="get">
        <div className="flex rounded-[15px] bg-white p-2.5 shadow-[0_20px_40px_5px_rgba(0,0,0,0.1)]">
          <input
            type="text"
            name="search"
            defaultValue={defaultValue}
            placeholder="Nhập kỹ năng hoặc chức danh công việc"
            autoComplete="off"
            className="min-w-0 flex-1 px-3 py-[13px] text-[16px] text-[#495057] placeholder:text-[#6c757d]"
          />
          <button
            type="submit"
            aria-label="Tìm kiếm"
            className="ml-2.5 rounded-lg bg-brand px-5 py-[14px] text-[16px] text-white hover:bg-[#444]"
          >
            <i className="fa-solid fa-magnifying-glass" />
          </button>
        </div>
      </form>
    </>
  );
}
