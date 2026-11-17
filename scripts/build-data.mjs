// Converts the scraped snapshot (ref/data/*.json) into the JSON files the app reads (src/data).
// Usage: node scripts/build-data.mjs
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const refDir = path.resolve(root, "../ref");
const outDir = path.join(root, "src/data");
fs.mkdirSync(outDir, { recursive: true });

const site = JSON.parse(fs.readFileSync(path.join(refDir, "data/site.json"), "utf8"));
const mappingPath = path.join(refDir, "data/mapping.json");
const mapping = fs.existsSync(mappingPath) ? JSON.parse(fs.readFileSync(mappingPath, "utf8")) : [];
const homeHtml = fs.readFileSync(path.join(refDir, "home.clean.html"), "utf8");

const ORIGIN = "https://job.lighthuman.vn/";
const local = (url) => (url ? "/" + url.replace(ORIGIN, "").replace(/ /g, "%20") : "");
const slugOf = (url) => (url || "").split("/").filter(Boolean).pop();
const clean = (s) => (s || "").replace(/ /g, " ").replace(/\s+/g, " ").trim();
// Light HTML tidy for scraped rich text: drop empty paragraphs, nbsp runs, inline classes.
const tidy = (html) =>
  (html || "")
    .replace(/&nbsp;/g, " ")
    .replace(/\s(class|id|aria-level|data-[\w-]+)="[^"]*"/g, "")
    .replace(/<p>\s*<\/p>/g, "")
    .replace(/https:\/\/job\.lighthuman\.vn\//g, "/")
    .replace(/\s+/g, " ")
    .trim();

// ---------- Functional areas / industries ----------
const functionalAreas = mapping
  .filter((m) => m.kind === "functional_area_id")
  .map((m) => ({ id: m.id, name: m.name, jobs: m.jobs }));
const industries = mapping
  .filter((m) => m.kind === "industry_id")
  .map((m) => ({ id: m.id, name: m.name, jobs: m.jobs, footer: !!m.footer }));

// ---------- Jobs ----------
const jobs = site.jobs.map((j) => {
  const slug = slugOf(j.url);
  const f = j.fields || {};
  const parts = j.location.split(" - ").map(clean);
  return {
    slug,
    id: Number(slug.split("-").pop()),
    title: clean(j.title),
    companySlug: slugOf(j.companyUrl),
    companyName: clean(j.companyName),
    logo: local(j.logo),
    location: parts.join(" - "),
    city: parts[0] || "",
    state: parts.length > 2 ? parts[1] : "",
    country: parts[parts.length - 1] || "",
    type: clean(j.types[0] || f["Hình thức công việc"]),
    shift: clean(f["Shift"]),
    careerLevel: clean(f["Cấp độ nghề nghiệp"]),
    positions: clean(f["Vị trí"]),
    experience: clean(f["Kinh nghiệm"]),
    gender: clean(f["Giới tính"]),
    degree: clean(f["Bằng cấp"]),
    deadline: clean(f["Hạn nộp hồ sơ"]),
    fullLocation: clean(f["Địa điểm"]),
    posted: clean(j.posted),
    excerpt: clean(j.excerpt),
    description: tidy(j.description),
    benefits: tidy(j.benefits),
    skills: (j.skills || []).map(clean),
    related: (j.related || []).map(slugOf),
    functionalAreas: functionalAreas.filter((a) => a.jobs.includes(slug)).map((a) => a.id),
    industries: industries.filter((a) => a.jobs.includes(slug)).map((a) => a.id),
  };
});

// ---------- Companies ----------
// Cities of companies the /companies listing hides (read off the home carousel cards).
const homeCardCity = {
  "canawan-51": "Quận Bình Thạnh",
  "fe-credit-49": "Quận Tân Bình",
  "cong-ty-tnhh-tu-van-va-dich-vu-thanh-cong-viet-nam-52": "Quận Ngô Quyền",
  "light-humans-clients-44": "Quận Bình Thạnh",
  "concentrix-50": "Quận 12",
};
const jobSlugs = new Set(jobs.map((j) => j.slug));
const companies = site.companies.map((c) => {
  const slug = slugOf(c.url);
  const [memberSince = "", address = ""] = c.locTexts || [];
  const ownJobs = jobs.filter((j) => j.companySlug === slug).map((j) => j.slug);
  const listed = (c.jobUrls || []).map(slugOf).filter((s) => jobSlugs.has(s));
  return {
    slug,
    id: Number(slug.split("-").pop()),
    name: clean(c.name),
    logo: local(c.logo),
    location: clean(c.location) || homeCardCity[slug] || "",
    hiddenFromList: !!c.hiddenFromList,
    openJobs: ownJobs.length || c.openJobs,
    industry: clean(c.industry),
    memberSince: clean(memberSince.replace(/^Thành viên từ,?/, "")),
    address: clean(address),
    details: Object.fromEntries(Object.entries(c.details || {}).map(([k, v]) => [clean(k), clean(v)])),
    aboutHtml: tidy(c.aboutHtml),
    jobs: [...new Set([...listed, ...ownJobs])],
  };
});

// Featured companies on the home carousel, in the order the site shows them.
const empBlock = homeHtml.slice(homeHtml.indexOf("employerList"), homeHtml.indexOf("largebanner"));
const featuredCompanies = [];
for (const m of empBlock.matchAll(/href="https:\/\/job\.lighthuman\.vn\/company\/([^"]+)"/g)) {
  if (!featuredCompanies.includes(m[1])) featuredCompanies.push(m[1]);
}

// Latest jobs on home (18, newest first) in site order.
const latestBlock = homeHtml.slice(homeHtml.indexOf("jobslist newjbox"));
const latestJobs = [];
for (const m of latestBlock.matchAll(/<h4><a href="https:\/\/job\.lighthuman\.vn\/job\/([^"]+)"/g)) {
  if (!latestJobs.includes(m[1])) latestJobs.push(m[1]);
}

// Functional areas shown in the home search <select>.
const sel = homeHtml.match(/<select class="form-control" id="functional_area_id"[\s\S]*?<\/select>/)[0];
const searchAreas = [...sel.matchAll(/<option value="(\d+)">([^<]+)<\/option>/g)].map((m) => ({ id: m[1], name: m[2] }));

// ---------- Categories (all-categories page) ----------
const categories = site.categories.map((c) => ({
  id: decodeURIComponent(c.url).match(/functional_area_id\[\]=(\d+)/)?.[1] || "",
  name: clean(c.name),
  image: local(c.image),
  count: c.count,
}));

const write = (name, data) => fs.writeFileSync(path.join(outDir, name), JSON.stringify(data, null, 1));
write("jobs.json", jobs);
write("companies.json", companies);
write("categories.json", categories);
write("taxonomy.json", { functionalAreas, industries, searchAreas, featuredCompanies, latestJobs });

console.log(`jobs=${jobs.length} companies=${companies.length} categories=${categories.length} areas=${functionalAreas.length} industries=${industries.length} featured=${featuredCompanies.length} latest=${latestJobs.length}`);
