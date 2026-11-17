import { AdBanner } from "@/components/cards";
import { PageTitle } from "@/components/PageBanners";

export const metadata = { title: "Jobs In United States of America" };

export default function FaqPage() {
  return (
    <>
      <PageTitle title="Câu hỏi thường gặp" />
      <div className="py-[95px] max-lg:px-3">
        <div className="container-site">
          <AdBanner boxed={false} className="max-w-[650px]" />
          <div className="h-[120px]" />
        </div>
      </div>
    </>
  );
}
