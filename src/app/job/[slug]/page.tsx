import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Tag } from "@/components/cards";
import { JobSearchForm, PageSearch } from "@/components/PageBanners";
import { getCompany, getJob, jobs, logoOf, relatedJobs } from "@/lib/data";

// Every slug is prerendered at build time, so awaiting params up-front is fine.
export const instant = false;

export function generateStaticParams() {
  return jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata(props: PageProps<"/job/[slug]">) {
  const { slug } = await props.params;
  const job = getJob(slug);
  return { title: job?.title ?? "Không tìm thấy việc làm" };
}

const card = "mb-[30px] rounded-[15px] border border-line bg-white shadow-[0_20px_25px_rgba(0,0,0,0.05)]";
const pillBtn =
  "inline-block rounded-[40px] border px-[30px] py-2.5 text-[14px] font-semibold max-[560px]:mt-2.5 max-[560px]:block max-[560px]:text-center md:mr-2.5";

export default async function JobPage(props: PageProps<"/job/[slug]">) {
  const { slug } = await props.params;
  const job = getJob(slug);
  if (!job) notFound();
  const company = getCompany(job.companySlug);
  const related = relatedJobs(job);

  const details: { label: string; value: React.ReactNode }[] = [
    { label: "Địa điểm", value: <span className="block font-semibold text-black">{job.fullLocation}</span> },
    {
      label: "Công ty",
      value: (
        <Link href={`/company/${job.companySlug}`} className="block font-semibold text-brand">
          {job.companyName}
        </Link>
      ),
    },
    { label: "Hình thức công việc", value: <span className="block font-semibold text-brand">{job.type}</span> },
    { label: "Shift", value: <span className="block text-[13px] font-semibold text-[#f07200]">{job.shift}</span> },
    { label: "Cấp độ nghề nghiệp", value: job.careerLevel },
    { label: "Vị trí", value: job.positions },
    { label: "Kinh nghiệm", value: job.experience },
    { label: "Giới tính", value: job.gender },
    { label: "Bằng cấp", value: job.degree },
    { label: "Hạn nộp hồ sơ", value: job.deadline },
  ];

  return (
    <>
      <PageSearch>
        <JobSearchForm />
      </PageSearch>

      <div className="py-10 max-lg:px-3">
        <div className="container-site">
          {/* Title row */}
          <div className="-mx-3 flex flex-wrap items-start">
            <div className="w-full px-3 pb-[30px] lg:w-3/4">
              <h2 className="text-[24px] text-[#444]">
                {job.title} - {job.companyName}
              </h2>
              <div className="my-3 text-muted">Ngày đăng: {job.posted}</div>
              <Link href="/login">
                <i className="fa-solid fa-right-to-bracket" /> Login to View Salary
              </Link>
            </div>
            <div className="w-full px-3 lg:w-1/4">
              <div className="mt-[15px] text-right max-lg:mb-[30px] max-lg:text-left">
                <Link
                  href="/login"
                  className="inline-block rounded-[40px] border border-brand bg-brand px-[30px] py-2.5 text-[18px] font-semibold text-white hover:border-black"
                >
                  <i className="fa-solid fa-paper-plane" /> Nộp đơn ngay
                </Link>
              </div>
            </div>
          </div>

          <div className="-mx-3 flex flex-wrap">
            {/* Main column */}
            <div className="w-full px-3 lg:w-7/12">
              <div className={card}>
                <div className="p-[35px] max-md:p-5">
                  <h3 className="text-[18px] font-bold text-brand">
                    <i className="fa-solid fa-align-left mr-[5px] text-[20px] text-[#ccc]" /> Chi tiết công việc
                  </h3>
                  <ul className="mt-5">
                    {details.map((d) => (
                      <li key={d.label} className="mb-5 flex text-[#908f8f]">
                        <div className="w-5/12 pr-3 md:w-1/3">{d.label}:</div>
                        <div className="w-7/12 md:w-2/3">
                          {typeof d.value === "string" ? (
                            <span className="block font-semibold text-black">{d.value}</span>
                          ) : (
                            d.value
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <hr className="border-[#ccc]" />
                <div className="px-[25px] py-5">
                  <Link href="/login" className={`${pillBtn} border-brand text-brand hover:bg-brand hover:text-white`}>
                    <i className="fa-solid fa-envelope" /> Gửi email cho bạn
                  </Link>
                  <Link href="/login" className={`${pillBtn} border-brand text-brand hover:bg-brand hover:text-white`}>
                    Thêm vào mục việc làm yêu thích
                  </Link>
                  <Link
                    href="/login"
                    className={`${pillBtn} mt-2.5 border-danger text-danger hover:bg-danger hover:text-white`}
                  >
                    <i className="fa-solid fa-triangle-exclamation" /> Bật tìm job với CV mới nhất.
                  </Link>
                </div>
              </div>

              <div className={card}>
                <div className="p-[35px] max-md:p-5">
                  <h3 className="mb-2.5 text-[24px] font-bold text-brand">
                    <i className="fa-solid fa-file-lines mr-[5px] text-[20px] text-[#ccc]" /> Mô tả công việc
                  </h3>
                  <div className="rich-content" dangerouslySetInnerHTML={{ __html: job.description }} />
                </div>
              </div>

              {job.benefits && (
                <div className={card}>
                  <div className="p-[35px] max-md:p-5">
                    <h3 className="mb-2.5 text-[24px] font-bold text-brand">
                      <i className="fa-solid fa-file-lines mr-[5px] text-[20px] text-[#ccc]" /> Chính sách phúc lợi
                    </h3>
                    <div className="rich-content rich-tight" dangerouslySetInnerHTML={{ __html: job.benefits }} />
                  </div>
                </div>
              )}

              <div className={card}>
                <div className="p-[35px] max-md:p-5">
                  <h3 className="mb-2.5 text-[24px] font-bold text-brand">
                    <i className="fa-solid fa-puzzle-piece mr-[5px] text-[20px] text-[#ccc]" /> Kỹ năng yêu cầu
                  </h3>
                  <ul>
                    {job.skills.map((s) => (
                      <li key={s} className="inline-block">
                        <Link
                          href={`/jobs?skill=${encodeURIComponent(s)}`}
                          className="my-[5px] mr-2.5 inline-block rounded-[45px] bg-[#eee] px-5 py-2.5 text-[14px] font-semibold text-[#555] hover:bg-brand hover:text-white"
                        >
                          {s}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-full px-3 lg:w-5/12">
              {company && (
                <div className="mb-[30px] rounded-[15px] bg-[#f9f9ff] p-[30px]">
                  <h3 className="mb-[30px] text-[24px] text-brand">
                    <i className="fa-solid fa-building mr-[5px] text-[20px] text-[#ccc]" /> Company Overview
                  </h3>
                  <div className="float-left mr-[15px] mb-2.5 inline-block w-[100px] bg-white">
                    <Link href={`/company/${company.slug}`}>
                      <Image src={logoOf(company.logo)} alt={company.name} width={100} height={107} className="block h-auto w-full rounded-[15px]" />
                    </Link>
                  </div>
                  <div>
                    <Link href={`/company/${company.slug}`} className="text-[24px] font-bold text-black">
                      {company.name}
                    </Link>
                  </div>
                  <div className="py-[7px] text-brand">{company.location}, Thành phố Hồ Chí Minh, Vietnam</div>
                  <div>
                    <Link href={`/company/${company.slug}`}>{company.openJobs} Công việc đang mở</Link>
                  </div>
                  <div className="clear-both" />
                  <hr className="my-4 border-[#ccc]" />
                  <p className="text-[#555]">
                    {stripHtml(company.aboutHtml).slice(0, 300)}...{" "}
                    <Link href={`/company/${company.slug}`}>Read More</Link>
                  </p>
                </div>
              )}

              {related.length > 0 && (
                <div className="mb-[30px]">
                  <h3 className="mb-[15px] text-[24px] font-bold text-[#555]">Việc làm liên quan</h3>
                  <ul>
                    {related.map((r) => (
                      <li
                        key={r.slug}
                        className="mb-[15px] rounded-[10px] border border-line bg-[#fcfdff] px-[18px] py-[22px] transition-all hover:border-b-brand hover:shadow-[0_10px_20px_-5px_rgba(0,0,0,0.1)]"
                      >
                        <h3 className="mb-0 text-[25px] leading-6">
                          <Link href={`/job/${r.slug}`} className="text-[18px] font-semibold text-black hover:text-[#333]">
                            {r.title}
                          </Link>
                        </h3>
                        <div className="mt-[5px] text-[#969595]">
                          <Link href={`/company/${r.companySlug}`} className="text-[#969595]">
                            {r.companyName}
                          </Link>
                        </div>
                        <div className="mt-[5px] text-[#333]">{r.city}</div>
                        <div className="mt-[5px] flex flex-wrap gap-1">
                          <Tag kind="type">{r.type}</Tag>
                          <Tag kind="shift">{r.shift}</Tag>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className={card}>
                <div className="p-[35px]">
                  <h3 className="text-[18px] font-bold text-brand">
                    <i className="fa-solid fa-location-dot mr-[5px] text-[20px] text-[#ccc]" /> Google Map
                  </h3>
                  <iframe
                    title="Google Map"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(job.fullLocation)}&output=embed`}
                    className="mt-5 h-[250px] w-full border-0"
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

function stripHtml(html: string) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#\d+;/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
