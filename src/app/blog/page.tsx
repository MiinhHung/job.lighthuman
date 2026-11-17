import { PageTitle } from "@/components/PageBanners";
import { blogCategories } from "@/lib/site";
import Link from "next/link";

export const metadata = { title: "LIGHT HUMAN JOB PORTAL" };

export default function BlogPage() {
  return (
    <>
      <PageTitle title="Blog" />
      <div className="py-10 max-lg:px-3">
        <div className="container-site">
          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 lg:w-3/4">
              {/* The live blog has no published posts yet. */}
              <ul className="blogList" />
            </div>
            <div className="w-full px-3 lg:w-1/4">
              <div className="mb-[30px] rounded-[5px] bg-ice p-5">
                <div className="mb-5 border-b border-[#ddd] pb-[30px]">
                  <h5 className="mb-5 text-[14px] font-semibold text-black">Search</h5>
                  <form action="/blog" method="get" className="relative">
                    <input
                      type="text"
                      name="search"
                      placeholder="Search"
                      className="w-full border border-[#ced4da] bg-white px-3 py-[13px] pr-10 text-[16px] text-[#495057]"
                    />
                    <button type="submit" aria-label="Search" className="absolute top-1/2 right-3 -translate-y-1/2 text-[20px] text-black">
                      <i className="fa-solid fa-magnifying-glass" />
                    </button>
                  </form>
                </div>
                <div className="mb-5 border-b border-[#ddd] pb-[30px]">
                  <h5 className="mb-5 text-[14px] font-semibold text-black">Categories</h5>
                  <ul>
                    {blogCategories.map((c) => (
                      <li key={c.slug} className="relative pl-5">
                        <i className="fa-solid fa-caret-right absolute top-3 left-0 text-[12px] text-brand" />
                        <Link href={`/blog?category=${c.slug}`} className="mt-2.5 inline-block font-semibold text-[#888] hover:text-brand">
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="py-12" />
        </div>
      </div>
    </>
  );
}
