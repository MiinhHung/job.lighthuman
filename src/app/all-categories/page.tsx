import Image from "next/image";
import Link from "next/link";
import { PageTitle } from "@/components/PageBanners";
import { categories } from "@/lib/data";

export const metadata = { title: "LIGHT HUMAN JOB PORTAL" };

const short = (s: string) => (s.length > 22 ? s.slice(0, 20).trimEnd() + "..." : s);

export default function AllCategoriesPage() {
  return (
    <>
      <PageTitle title="All Categories" />
      <div className="px-[30px] py-10 lg:px-0 lg:py-[50px]">
        <div className="container-site">
          <ul className="-mx-3 flex flex-wrap">
            {categories.map((c) => (
              <li key={c.id} className="w-1/2 px-3 lg:w-1/4">
                <Link
                  href={`/jobs?functional_area=${c.id}`}
                  title={c.name}
                  className="group relative z-[1] mt-[30px] flex gap-5 overflow-hidden rounded-[10px] bg-white p-[25px] shadow-[0_0_25px_rgba(29,76,112,0.1)] transition-all duration-500 before:absolute before:-top-[60px] before:-left-[60px] before:-z-[1] before:size-[110px] before:rounded-full before:bg-[#1967d2] before:opacity-[0.04] before:transition-all before:duration-500 before:content-[''] after:absolute after:-right-[60px] after:-bottom-[60px] after:-z-[1] after:size-[110px] after:rounded-full after:bg-brand after:opacity-[0.04] after:transition-all after:duration-500 after:content-[''] hover:bg-linear-[211deg] hover:from-sun hover:to-brand-dark hover:after:size-[600%] hover:after:bg-white hover:after:opacity-20 max-sm:flex-col"
                >
                  <div className="inline-flex size-20 shrink-0 items-center justify-center group-hover:rounded-full group-hover:bg-white">
                    <Image
                      src={c.image || "/images/no-image.png"}
                      alt={c.name}
                      width={80}
                      height={80}
                      className="h-auto max-w-20 transition-all duration-300 group-hover:max-w-[60px]"
                    />
                  </div>
                  <div>
                    <h3 className="min-h-10 text-[18px] leading-[18px] text-black group-hover:text-white">{short(c.name)}</h3>
                    <div className="inline-block rounded-[5px] bg-[#e9eff3] px-[15px] py-1 text-[14px] text-brand">
                      <i className="fa-solid fa-briefcase" /> ({c.count}) Việc làm
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
