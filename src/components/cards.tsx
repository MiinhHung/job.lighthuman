import Image from "next/image";
import Link from "next/link";
import { logoOf, type Company, type Job } from "@/lib/data";

/** Colored pill used for location / job type / shift. */
export function Tag({ kind, children }: { kind: "type" | "shift" | "location"; children: React.ReactNode }) {
  const bg = kind === "location" ? "bg-tag-violet" : kind === "shift" ? "bg-tag-orange" : "bg-tag-green";
  return (
    <span className={`inline-block rounded-[3px] px-1.5 py-1 text-[13px] leading-[13px] text-white ${bg}`}>
      {children}
    </span>
  );
}

/** `.empint` – company card (home carousel, /companies). */
export function CompanyCard({ company, spacing = "mb-[15px]" }: { company: Company; spacing?: string }) {
  return (
    <div
      className={`rounded-[10px] border border-line bg-white px-[18px] py-[22px] transition-all duration-[250ms] [transition-timing-function:cubic-bezier(0.02,0.01,0.47,1)] hover:-translate-y-[3px] hover:border-brand hover:shadow-[0_10px_20px_-5px_rgba(0,0,0,0.1)] ${spacing}`}
    >
      <Link href={`/company/${company.slug}`} title={company.name} className="block text-black">
        <div className="flex w-full">
          <div className="w-[65px] shrink-0 pr-[15px]">
            <Image
              src={logoOf(company.logo)}
              alt={company.name}
              title={company.name}
              width={50}
              height={50}
              className="h-auto w-full rounded-lg"
            />
          </div>
          <div className="min-w-0">
            <h4 className="mb-[5px] min-h-8 text-[16px] text-black">{company.name}</h4>
            <div className="text-brand">
              <i className="fa-solid fa-location-dot" /> {company.location}
            </div>
          </div>
        </div>
        <div className="mt-4 text-slate">
          <i className="fa-solid fa-briefcase" /> {company.openJobs} Công việc mở
        </div>
      </Link>
    </div>
  );
}

/** `.newjbox .jobint` – compact job card on the home page. */
export function JobTile({ job }: { job: Job }) {
  return (
    <div className="min-h-[113px] rounded-[10px] bg-snow p-[15px] shadow-[0_0_30px_rgba(0,0,0,0.1)] transition-all duration-[250ms] hover:-translate-y-[3px] hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)] max-md:text-center">
      <div className="flex flex-wrap md:flex-nowrap">
        <div className="w-full md:w-1/4 md:shrink-0 md:pr-3">
          <Link href={`/job/${job.slug}`} title={job.title} className="inline-block">
            <Image
              src={logoOf(job.logo)}
              alt={job.companyName}
              title={job.companyName}
              width={81}
              height={87}
              className="h-auto w-[81px] rounded-[10px] shadow-[0_10px_20px_rgba(0,0,0,0.05)]"
            />
          </Link>
        </div>
        <div className="w-full md:w-3/4">
          <h4 className="mb-[5px] text-[20px] max-md:mt-[5px]">
            <Link
              href={`/job/${job.slug}`}
              title={job.title}
              className="text-[18px] leading-[22px] font-normal text-black hover:text-brand"
            >
              {job.title}
            </Link>
          </h4>
          <div className="py-[7px] leading-[19px] text-muted">
            <Link href={`/company/${job.companySlug}`} title={job.companyName}>
              {job.companyName}
            </Link>{" "}
            - <span>{job.city}</span>
          </div>
          <div>
            <Tag kind="type">{job.type}</Tag>
          </div>
        </div>
      </div>
    </div>
  );
}

/** `.searchList > li` – full job row (/jobs, company page). */
export function JobRow({ job, showLocationTag = true }: { job: Job; showLocationTag?: boolean }) {
  return (
    <li className="mb-[15px] rounded-[10px] border border-line bg-[#fcfdff] px-[18px] py-[22px] transition-all duration-400 hover:border-b-brand hover:shadow-[0_10px_20px_-5px_rgba(0,0,0,0.1)] max-[560px]:text-center">
      <div className="flex flex-wrap items-center md:flex-nowrap">
        <div className="w-full md:w-2/3">
          <div className="mr-[15px] w-[70px] min-[561px]:float-left max-[560px]:mx-auto max-[560px]:mb-2.5">
            <Image
              src={logoOf(job.logo)}
              alt={job.companyName}
              title={job.companyName}
              width={70}
              height={75}
              className="h-auto w-full rounded-[10px]"
            />
          </div>
          <div className="overflow-hidden">
            <h3 className="mb-2.5 text-[25px] leading-6">
              <Link href={`/job/${job.slug}`} title={job.title} className="text-[18px] font-semibold text-black hover:text-[#333]">
                {job.title}
              </Link>
            </h3>
            <div className="my-2.5 text-[#969595]">
              <Link href={`/company/${job.companySlug}`} title={job.companyName} className="text-[#969595] hover:text-[#333]">
                {job.companyName}
              </Link>
            </div>
            <div className="flex flex-wrap gap-1 text-black max-[560px]:justify-center">
              {showLocationTag && <Tag kind="location">{job.location}</Tag>}
              <Tag kind="type">{job.type}</Tag>
              {!showLocationTag && (
                <>
                  <Tag kind="shift">{job.shift}</Tag>
                  <span className="self-center text-[#333]">- {job.city}</span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3">
          <div className="mt-5 flex justify-end gap-[5px] max-[560px]:justify-center md:mt-0">
            <Link
              href={`/job/${job.slug}`}
              className="block rounded-[7px] border border-brand bg-white px-[15px] text-center leading-9 font-bold text-brand uppercase hover:bg-brand hover:text-white"
            >
              Xem chi tiết
            </Link>
            {showLocationTag && (
              <Link
                href="/login"
                title="Add to Favourite"
                className="block rounded-[7px] border border-brand bg-white px-[15px] text-center leading-9 text-brand hover:bg-brand hover:text-white"
              >
                <i className="fa-regular fa-heart" />
              </Link>
            )}
          </div>
        </div>
      </div>
      <p className="mt-2.5 leading-[22px] text-[#333] max-lg:text-[16px]">{job.excerpt}</p>
    </li>
  );
}

/** `.largebanner` – the advertising slot repeated across pages. */
export function AdBanner({ boxed = true, className = "" }: { boxed?: boolean; className?: string }) {
  const img = (
    <Image src="/images/google-ad-wide.jpg" alt="Advertise your business here" width={728} height={90} className="block h-auto w-full" style={{ height: "auto" }} />
  );
  if (!boxed) return <div className={`mx-auto max-w-[650px] ${className}`}>{img}</div>;
  return (
    <div
      className={`relative mx-auto my-[30px] max-w-[748px] rounded-[5px] border border-white bg-white p-2.5 shadow-[0_1px_4px_rgba(0,0,0,0.3),inset_0_0_10px_rgba(0,0,0,0.1)] ${className}`}
    >
      {img}
    </div>
  );
}

/** `.viewallbtn` – centered call-to-action under each home section. */
export function ViewAllButton({ href, children, variant = "brand" }: { href: string; children: React.ReactNode; variant?: "brand" | "sun" }) {
  const cls =
    variant === "sun"
      ? "bg-sun text-black hover:bg-black hover:text-white"
      : "bg-brand text-white hover:bg-[#333] hover:text-white";
  return (
    <div className="mt-10 text-center">
      <Link href={href} className={`inline-block rounded-[5px] px-[30px] py-[15px] text-[18px] font-semibold ${cls}`}>
        {children}
      </Link>
    </div>
  );
}

/** `.titleTop` heading */
export function SectionTitle({
  children,
  subtitle,
  className = "",
  light = false,
}: {
  children: React.ReactNode;
  subtitle?: string;
  className?: string;
  light?: boolean;
}) {
  return (
    <div className={`mb-2.5 ${className}`}>
      {subtitle && (
        <div className={`text-[18px] font-semibold tracking-[3px] ${light ? "text-sun" : "text-brand"}`}>{subtitle}</div>
      )}
      <h3 className={`text-[36px] font-semibold ${light ? "text-white" : "text-black"} [&_span]:font-light [&_span]:text-brand`}>
        {children}
      </h3>
    </div>
  );
}
