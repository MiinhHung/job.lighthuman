import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JobRow } from "@/components/cards";
import { PageTitle } from "@/components/PageBanners";
import { companies, companyJobs, getCompany, logoOf } from "@/lib/data";
import SendMessageButton from "./SendMessageButton";

// Every slug is prerendered at build time, so awaiting params up-front is fine.
export const instant = false;

export function generateStaticParams() {
  return companies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(props: PageProps<"/company/[slug]">) {
  const { slug } = await props.params;
  return { title: getCompany(slug)?.name ?? "Chi tiết công ty" };
}

const card = "mb-[30px] rounded-[15px] border border-line bg-white shadow-[0_20px_25px_rgba(0,0,0,0.05)]";
const pillBtn =
  "inline-block rounded-[40px] border px-[30px] py-2.5 text-[14px] font-semibold max-[560px]:mt-2.5 max-[560px]:block max-[560px]:text-center md:mr-2.5";

export default async function CompanyPage(props: PageProps<"/company/[slug]">) {
  const { slug } = await props.params;
  const company = getCompany(slug);
  if (!company) notFound();
  const list = companyJobs(company);

  return (
    <>
      <PageTitle title="Chi tiết công ty" />
      <div className="py-10 max-lg:px-3">
        <div className="container-site">
          {/* Header card */}
          <div className={card}>
            <div className="p-5 max-md:p-[15px]">
              <div className="-mx-3 flex flex-wrap">
                <div className="w-full px-3 md:w-2/3">
                  <div className="max-[560px]:text-center">
                    <div className="mr-5 h-[100px] w-[100px] overflow-hidden border border-[#b1bcc5] bg-[#cbcbcb] min-[561px]:float-left max-[560px]:mx-auto max-[560px]:mb-2.5 max-[560px]:h-auto">
                      <Image src={logoOf(company.logo)} alt={company.name} width={100} height={107} className="h-auto w-full" />
                    </div>
                    <div className="text-[24px] font-semibold text-[#333]">{company.name}</div>
                    <div className="mt-2.5 text-[18px] text-[#666]">{company.industry}</div>
                    <div className="mt-2 leading-6 text-[#555]">
                      <i className="fa-solid fa-clock-rotate-left w-5 text-brand" /> Thành viên từ, {company.memberSince}
                    </div>
                    <div className="mt-2 leading-6 text-[#555]">
                      <i className="fa-solid fa-location-dot w-5 text-brand" /> {company.address}
                    </div>
                    <div className="clear-both" />
                  </div>
                </div>
                <div className="w-full px-3 max-md:mt-5 md:w-1/3">
                  <h5 className="text-[18px]">Login to View contact details</h5>
                  <Link
                    href="/login"
                    className="inline-block rounded-[5px] bg-brand px-[25px] py-2.5 text-[16px] font-semibold text-white hover:bg-[#333] hover:text-white"
                  >
                    Login
                  </Link>
                </div>
              </div>
            </div>
            <div className="px-[25px] py-5">
              <Link href="/login" className={`${pillBtn} border-brand text-brand hover:bg-brand hover:text-white`}>
                Thêm vào mục việc làm yêu thích
              </Link>
              <Link href="/login" className={`${pillBtn} border-danger text-danger hover:bg-danger hover:text-white`}>
                <i className="fa-solid fa-triangle-exclamation" /> Bật tìm job với CV mới nhất.
              </Link>
              <SendMessageButton className={`${pillBtn} border-brand text-brand hover:bg-brand hover:text-white`} />
            </div>
          </div>

          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 md:w-2/3">
              <div className={card}>
                <div className="p-[35px] max-md:p-5">
                  <h3 className="mb-2.5 text-[24px] font-bold text-brand">Về công ty</h3>
                  <div className="rich-content" dangerouslySetInnerHTML={{ __html: company.aboutHtml }} />
                </div>
              </div>

              {list.length > 0 && (
                <div className="mb-[30px]">
                  <h3 className="mb-[15px] text-[24px] font-bold text-[#555]">Cơ hội việc làm</h3>
                  <ul>
                    {list.map((job) => (
                      <JobRow key={job.slug} job={job} showLocationTag={false} />
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="w-full px-3 md:w-1/3">
              <div className={card}>
                <div className="p-[35px]">
                  <h3 className="text-[18px] font-bold text-brand">Chi tiết công ty</h3>
                  <ul className="mt-5">
                    {Object.entries(company.details).map(([k, v]) => (
                      <li key={k} className="mb-5 flex leading-[14px] text-[#908f8f]">
                        <div className="w-1/2 pr-3">{k}</div>
                        <div className="w-1/2">
                          <span className="block font-semibold text-black">{v}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className={card}>
                <div className="p-[35px]">
                  <iframe
                    title="Google Map"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(company.address)}&output=embed`}
                    className="h-[250px] w-full border-0"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
