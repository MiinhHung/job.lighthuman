import jobsJson from "@/data/jobs.json";
import companiesJson from "@/data/companies.json";
import categoriesJson from "@/data/categories.json";
import taxonomyJson from "@/data/taxonomy.json";

export type Job = {
  slug: string;
  id: number;
  title: string;
  companySlug: string;
  companyName: string;
  logo: string;
  location: string;
  city: string;
  state: string;
  country: string;
  type: string;
  shift: string;
  careerLevel: string;
  positions: string;
  experience: string;
  gender: string;
  degree: string;
  deadline: string;
  fullLocation: string;
  posted: string;
  excerpt: string;
  description: string;
  benefits: string;
  skills: string[];
  related: string[];
  functionalAreas: string[];
  industries: string[];
};

export type Company = {
  slug: string;
  id: number;
  name: string;
  logo: string;
  location: string;
  hiddenFromList: boolean;
  openJobs: number;
  industry: string;
  memberSince: string;
  address: string;
  details: Record<string, string>;
  aboutHtml: string;
  jobs: string[];
};

export type Category = { id: string; name: string; image: string; count: number };
export type Area = { id: string; name: string; jobs: string[] };

export const jobs = jobsJson as Job[];
export const companies = companiesJson as Company[];
export const categories = categoriesJson as Category[];
export const taxonomy = taxonomyJson as {
  functionalAreas: Area[];
  industries: (Area & { footer: boolean })[];
  searchAreas: { id: string; name: string }[];
  featuredCompanies: string[];
  latestJobs: string[];
};

/** Figures shown in the home stats bar (as published on the live site). */
export const siteStats = { jobs: 860, companies: 430, seekers: 8157 };

export const JOBS_PER_PAGE = 16;
export const COMPANIES_PER_PAGE = 20;

export const getJob = (slug: string) => jobs.find((j) => j.slug === slug);
export const getCompany = (slug: string) => companies.find((c) => c.slug === slug);

const PLACEHOLDER_LOGO = "/company_logos/no-image.png";
export const logoOf = (src?: string) => src || PLACEHOLDER_LOGO;

/** Featured jobs: the live site currently has none flagged. */
export const featuredJobs: Job[] = [];

export const latestJobs = () =>
  taxonomy.latestJobs.map((slug) => getJob(slug)).filter((j): j is Job => Boolean(j));

export const featuredCompanies = () =>
  taxonomy.featuredCompanies.map((slug) => getCompany(slug)).filter((c): c is Company => Boolean(c));

/** Companies visible on /companies (the live listing hides a few, we keep that behaviour). */
export const listedCompanies = companies.filter((c) => !c.hiddenFromList);

export const relatedJobs = (job: Job) =>
  job.related.map((slug) => getJob(slug)).filter((j): j is Job => Boolean(j));

export const companyJobs = (company: Company) =>
  company.jobs.map((slug) => getJob(slug)).filter((j): j is Job => Boolean(j));

export const footerAreas = () => {
  // The live footer lists functional areas that have jobs posted, newest first.
  const area = taxonomy.functionalAreas.find((a) => a.id === "635");
  return [{ id: area?.id ?? "635", name: area?.name ?? "Kinh doanh/Bán hàng" }];
};

export const footerIndustries = () => taxonomy.industries.filter((i) => i.footer);

/* ------------------------------------------------------------------
   Job search / filters (mirrors the sidebar of /jobs)
------------------------------------------------------------------- */

export type SearchParams = Record<string, string | string[] | undefined>;

export const toArray = (v: string | string[] | undefined) => (v === undefined ? [] : Array.isArray(v) ? v : [v]);

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d");

export type FilterKey =
  | "job_title"
  | "country"
  | "state"
  | "city"
  | "experience"
  | "job_type"
  | "job_shift"
  | "career_level"
  | "degree"
  | "gender"
  | "industry"
  | "skill"
  | "functional_area"
  | "company";

type FilterDef = {
  key: FilterKey;
  title: string;
  values: (job: Job) => string[];
  /** Widgets that the live site renders empty (no data configured). */
  alwaysEmpty?: boolean;
};

export const FILTERS: FilterDef[] = [
  { key: "job_title", title: "Việc làm theo tiêu đề", values: (j) => [j.title] },
  { key: "country", title: "Việc làm theo quốc gia", values: (j) => [j.country] },
  { key: "state", title: "Việc làm theo tiểu bang", values: (j) => [j.state] },
  { key: "city", title: "Việc làm theo khu vực", values: (j) => [j.city] },
  { key: "experience", title: "Việc làm theo kinh nghiệm", values: (j) => [j.experience], alwaysEmpty: true },
  { key: "job_type", title: "Việc làm theo loại hình công việc", values: (j) => [j.type] },
  { key: "job_shift", title: "Việc làm theo ca làm việc", values: (j) => [j.shift] },
  { key: "career_level", title: "Việc làm theo cấp bậc nghề nghiệp", values: (j) => [j.careerLevel], alwaysEmpty: true },
  { key: "degree", title: "Việc làm theo trình độ bằng cấp", values: (j) => [j.degree], alwaysEmpty: true },
  { key: "gender", title: "Việc làm theo giới tính", values: (j) => [j.gender] },
  { key: "industry", title: "Việc làm theo ngành nghề", values: (j) => j.industries, alwaysEmpty: true },
  { key: "skill", title: "Việc làm theo kỹ năng", values: (j) => j.skills },
  { key: "functional_area", title: "Việc làm theo các lĩnh vực chức năng", values: (j) => j.functionalAreas, alwaysEmpty: true },
  { key: "company", title: "Việc làm theo công ty", values: (j) => [j.companyName] },
];

/** Accepts both our param names and the live site's (`functional_area_id[]`, `search`, …). */
export function readFilters(sp: SearchParams) {
  const get = (...names: string[]) => names.flatMap((n) => toArray(sp[n]));
  const selected = {} as Record<FilterKey, string[]>;
  for (const f of FILTERS) selected[f.key] = get(f.key, `${f.key}[]`);
  selected.functional_area.push(...get("functional_area_id", "functional_area_id[]"));
  selected.industry.push(...get("industry_id", "industry_id[]"));
  const search = get("search")[0]?.trim() ?? "";
  const page = Math.max(1, Number(get("page")[0]) || 1);
  return { selected, search, page };
}

export function filterJobs(sp: SearchParams) {
  const { selected, search, page } = readFilters(sp);
  const q = norm(search);
  const matches = (job: Job, skip?: FilterKey) =>
    (!q || norm(`${job.title} ${job.companyName} ${job.skills.join(" ")} ${job.excerpt}`).includes(q)) &&
    FILTERS.every((f) => {
      if (f.key === skip) return true;
      const want = selected[f.key];
      if (!want.length) return true;
      const have = f.values(job);
      return want.some((w) => have.includes(w));
    });

  const results = jobs.filter((j) => matches(j));

  // Sidebar options with counts, computed like the live site (other filters applied).
  const widgets = FILTERS.map((f) => {
    if (f.alwaysEmpty) return { ...f, options: [] as { value: string; count: number }[] };
    const counts = new Map<string, number>();
    for (const j of jobs) {
      if (!matches(j, f.key)) continue;
      for (const v of f.values(j)) if (v) counts.set(v, (counts.get(v) ?? 0) + 1);
    }
    const options = [...counts.entries()]
      .map(([value, count]) => ({ value, count }))
      .sort((a, b) => b.count - a.count);
    return { ...f, options };
  });

  const total = results.length;
  const pages = Math.max(1, Math.ceil(total / JOBS_PER_PAGE));
  const current = Math.min(page, pages);
  const start = (current - 1) * JOBS_PER_PAGE;
  return {
    search,
    selected,
    widgets: widgets.map((w) => ({ key: w.key, title: w.title, options: w.options })),
    total,
    page: current,
    pages,
    from: total ? start + 1 : 0,
    to: Math.min(start + JOBS_PER_PAGE, total),
    items: results.slice(start, start + JOBS_PER_PAGE),
  };
}

export function searchCompanies(sp: SearchParams) {
  const search = (toArray(sp.search)[0] ?? "").trim();
  const q = norm(search);
  const list = listedCompanies.filter((c) => !q || norm(`${c.name} ${c.location}`).includes(q));
  const page = Math.max(1, Number(toArray(sp.page)[0]) || 1);
  const pages = Math.max(1, Math.ceil(list.length / COMPANIES_PER_PAGE));
  const current = Math.min(page, pages);
  return {
    search,
    page: current,
    pages,
    total: list.length,
    items: list.slice((current - 1) * COMPANIES_PER_PAGE, current * COMPANIES_PER_PAGE),
  };
}
