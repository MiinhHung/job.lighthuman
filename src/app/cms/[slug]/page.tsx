import { notFound } from "next/navigation";
import { AdBanner } from "@/components/cards";
import { JobSearchForm, PageSearch } from "@/components/PageBanners";

const pages: Record<string, { title: string; metaTitle: string; body: string }> = {
  "about-us": { title: "Về chúng tôi", metaTitle: "Jobs In Pakistan", body: "về chúng tôi" },
  "terms-of-use": { title: "Điều khoản sử dụng", metaTitle: "Terms of use", body: "Điều khoản sử dụng" },
};

// Every slug is prerendered at build time, so awaiting params up-front is fine.
export const instant = false;

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/cms/[slug]">) {
  const { slug } = await props.params;
  return { title: pages[slug]?.metaTitle ?? "LIGHT HUMAN JOB PORTAL" };
}

export default async function CmsPage(props: PageProps<"/cms/[slug]">) {
  const { slug } = await props.params;
  const page = pages[slug];
  if (!page) notFound();
  return (
    <>
      <PageSearch>
        <JobSearchForm />
      </PageSearch>
      <div className="py-[50px] lg:py-[100px]">
        <div className="container-site">
          <AdBanner className="!mt-0" />
          <h2 className="mb-[15px] text-[36px] font-bold text-brand max-lg:mt-5">{page.title}</h2>
          <div className="cms-content">
            <p>{page.body}</p>
          </div>
        </div>
      </div>
    </>
  );
}
