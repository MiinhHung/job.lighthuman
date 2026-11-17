import Image from "next/image";
import Link from "next/link";
import { AdBanner, JobTile, SectionTitle, ViewAllButton } from "@/components/cards";
import FeaturedCompanies from "@/components/home/FeaturedCompanies";
import Newsletter from "@/components/home/Newsletter";
import Testimonials from "@/components/home/Testimonials";
import { featuredCompanies, latestJobs, siteStats, taxonomy } from "@/lib/data";

export const metadata = { title: "Jobs In United States of America" };

const heroBtn =
  "mt-12 inline-block rounded-lg px-[25px] py-[15px] text-[18px] leading-[27px] font-bold shadow-[0_15px_25px_rgba(0,0,0,0.2)] hover:bg-white hover:text-black";

function Hero() {
  return (
    <div className="lg:flex lg:h-[950px]">
      {/* Người tìm việc */}
      <div className="bubble-halo flex h-[600px] items-center bg-brand bg-[url(/images/srjobseekerbg.png)] bg-right-bottom bg-no-repeat py-10 pr-10 pl-[60px] max-sm:bg-size-[60%] lg:h-auto lg:flex-1">
        <div className="relative z-[1] max-w-[425px]">
          <h2 className="text-[18px] font-bold text-white uppercase">
            <i className="fa-solid fa-user" /> Người tìm việc
          </h2>
          <h3 className="text-[24px] font-normal text-white sm:text-[48px]">
            Hãy viết câu chuyện thành công của bạn ngay hôm nay.
          </h3>
          <p className="text-[18px] text-white">Công việc mơ ước không tự nhiên mà có, chính bạn là người tạo ra nó.</p>
          <Link href="/login" className={`${heroBtn} bg-sun text-black`}>
            Ứng tuyển ngay
          </Link>
        </div>
      </div>
      {/* Nhà tuyển dụng */}
      <div className="bubble-halo bubble-halo-strong flex h-[600px] items-center bg-sun bg-[url(/images/srcompanybg.jpg)] bg-right-bottom bg-no-repeat py-10 pr-10 pl-[60px] max-sm:bg-size-[80%] lg:h-auto lg:flex-1">
        <div className="relative z-[1] max-w-[425px]">
          <h2 className="text-[18px] font-bold text-black uppercase">
            <i className="fa-solid fa-building" /> Nhà tuyển dụng
          </h2>
          <h3 className="text-[24px] font-normal text-black sm:text-[48px]">Tìm kiếm nhân tài - Kết nối tương lai.</h3>
          <p className="text-[18px] text-black">Hành trình vạn dặm bắt đầu từ một bước chân..</p>
          <Link href="/register" className={`${heroBtn} bg-charcoal text-white`}>
            Đăng tin tuyển dụng
          </Link>
        </div>
      </div>
    </div>
  );
}

function Stats() {
  const items = [
    { icon: "fa-briefcase", value: siteStats.jobs, label: "Việc làm", color: "text-brand" },
    { icon: "fa-building", value: siteStats.companies, label: "Nhà tuyển dụng", color: "text-sun" },
    { icon: "fa-users", value: siteStats.seekers, label: "Người tìm việc", color: "text-brand" },
  ];
  return (
    <div className="relative z-[2] mx-auto bg-mist px-3 pt-5 sm:px-[30px] lg:-mt-[74px] lg:w-[530px] lg:rounded-t-[35px] lg:shadow-[0_-16px_20px_rgba(0,0,0,0.2)]">
      <div className="-mx-1.5 flex sm:-mx-3">
        {items.map((s) => (
          <div key={s.label} className="flex min-w-0 flex-1 px-1.5 sm:px-3">
            <div className="mr-2 sm:mr-[15px]">
              <i className={`fa-solid ${s.icon} text-[24px] sm:text-[36px] ${s.color}`} />
            </div>
            <div className="min-w-0">
              <h4 className={`mb-0 text-[22px] sm:text-[32px] ${s.color}`}>{s.value}</h4>
              <p className="text-[14px]">{s.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HomeSearch() {
  return (
    <div className="bg-mist py-[30px]">
      <div className="container-site">
        <h3 className="text-[24px] text-ink sm:text-[25px]">Tìm kiếm việc làm</h3>
        <form action="/jobs" method="get">
          <div className="rounded-[10px] bg-white p-2.5 shadow-[0_20px_40px_5px_rgba(0,0,0,0.1)]">
            <div className="flex flex-col md:flex-row">
              <input
                type="text"
                name="search"
                placeholder="Nhập kỹ năng hoặc chức danh công việc"
                autoComplete="off"
                className="h-[50px] min-w-0 flex-1 px-[15px] py-[13px] text-[16px] text-[#495057]"
              />
              <select
                name="functional_area"
                defaultValue=""
                className="h-[50px] min-w-0 flex-1 bg-white px-[15px] text-[16px] text-[#212529] max-md:border-t max-md:border-[#eee] md:border-l md:border-[#eee]"
              >
                <option value="">Chọn lĩnh vực chức năng</option>
                {taxonomy.searchAreas.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                aria-label="Tìm kiếm"
                className="rounded-lg bg-sun px-5 py-[13px] text-[16px] leading-6 font-bold text-black uppercase max-md:mt-[15px] md:ml-2.5"
              >
                <i className="fa-solid fa-magnifying-glass" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    { icon: "fa-solid fa-user", title: "Tạo tài khoản" },
    { icon: "fa-brands fa-black-tie", title: "Tìm kiếm công việc mong muốn" },
    { icon: "fa-solid fa-file-lines", title: "Gửi hồ sơ của bạn" },
  ];
  return (
    <div>
      <div className="mx-auto w-full max-w-[1140px] px-3">
        <div className="relative m-[30px] rounded-[40px] bg-brand p-[30px] lg:my-[60px] lg:mr-[200px] lg:ml-0 lg:py-[60px] lg:pr-0 lg:pl-[70px]">
          <div className="lg:w-7/12">
            <SectionTitle light>Cách thức hoạt động</SectionTitle>
            <ul>
              {steps.map((s) => (
                <li key={s.title} className="mt-10 flex gap-[30px]">
                  <div className="flex size-20 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_0_40px_rgba(0,0,0,0.2)]">
                    <i className={`${s.icon} text-[40px] text-sun`} />
                  </div>
                  <div>
                    <h4 className="mb-[5px] text-[24px] text-white">{s.title}</h4>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="max-w-[536px] lg:absolute lg:top-0 lg:-right-[230px]">
            <Image src="/images/howitworks.png" alt="" width={536} height={536} className="h-auto w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoBoxes() {
  return (
    <div className="lg:flex">
      <div className="bubble-halo bubble-halo-box flex-1 bg-brand px-[30px] py-[50px] text-center">
        <div className="relative z-[1]">
          <SectionTitle light>Bạn đang tìm kiếm công việc! </SectionTitle>
          <h4 className="mb-[30px] text-[24px] text-sun">Tìm kiếm công việc mong muốn của bạn</h4>
          <div className="mt-[30px]">
            <Link href="/register" className="inline-block rounded-[5px] bg-sun px-[30px] py-[15px] text-[18px] font-semibold text-black hover:bg-black hover:text-white">
              Ứng tuyển
            </Link>
          </div>
        </div>
      </div>
      <div className="bubble-halo bubble-halo-strong bubble-halo-box flex-1 bg-sun px-[30px] py-[50px] text-center">
        <div className="relative z-[1]">
          <div className="mb-2.5">
            <h3 className="text-[36px] font-semibold text-black">Bạn đang tìm kiếm ứng viên!</h3>
          </div>
          <h4 className="mb-[30px] text-[24px] text-black">Đăng tin tuyển dụng</h4>
          <div className="mt-[30px]">
            <Link href="/register" className="inline-block rounded-[5px] bg-brand px-[30px] py-[15px] text-[18px] font-semibold text-white hover:bg-white hover:text-brand">
              Đăng tin
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const section = "overflow-hidden px-[30px] py-10 lg:px-0 lg:py-[50px]";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <HomeSearch />

      {/* Công ty nổi bật */}
      <div className={section}>
        <div className="container-site">
          <SectionTitle>Công ty nổi bật</SectionTitle>
          <FeaturedCompanies companies={featuredCompanies()} />
          <AdBanner />
        </div>
      </div>

      {/* Việc làm theo lĩnh vực – empty on the live site (no categories flagged for home) */}
      <div className={`${section} bg-cloud`}>
        <div className="container-site">
          <SectionTitle>Việc làm theo lĩnh vực</SectionTitle>
          <ul className="flex flex-wrap" />
          <ViewAllButton href="/all-categories">Xem tất cả danh mục</ViewAllButton>
        </div>
      </div>

      {/* Nổi bật Việc làm */}
      <div
        className={`${section} relative before:pointer-events-none before:absolute before:-bottom-[150px] before:-left-[150px] before:size-[480px] before:animate-scale-up before:rounded-full before:border-[100px] before:border-sun before:opacity-30 before:content-[''] after:pointer-events-none after:absolute after:-top-[100px] after:-right-[100px] after:size-[300px] after:animate-scale-up after:rounded-full after:border-[60px] after:border-brand after:opacity-10 after:content-['']`}
      >
        <div className="container-site relative z-[1]">
          <SectionTitle>
            Nổi bật <span>Việc làm</span>
          </SectionTitle>
          <ul className="flex flex-wrap" />
          <ViewAllButton href="/jobs?is_featured=1">Xem tất cả công việc nổi bật</ViewAllButton>
        </div>
      </div>

      {/* Ngành nghề phổ biến */}
      <div className={`${section} bg-cloud`}>
        <div className="container-site">
          <SectionTitle className="text-center">Ngành nghề phổ biến</SectionTitle>
          <ul />
        </div>
      </div>

      <HowItWorks />
      <InfoBoxes />

      {/* Mới nhất Việc làm */}
      <div className={section}>
        <div className="container-site">
          <SectionTitle>
            Mới nhất <span>Việc làm</span>
          </SectionTitle>
          <ul className="-mx-3 flex flex-wrap">
            {latestJobs().map((job) => (
              <li key={job.slug} className="mt-[30px] w-full px-3 md:w-1/3">
                <JobTile job={job} />
              </li>
            ))}
          </ul>
          <ViewAllButton href="/jobs">Xem tất cả công việc mới nhất</ViewAllButton>
        </div>
      </div>

      <Testimonials />

      {/* Việc làm theo khu vực */}
      <div className={`${section} bg-ice`}>
        <div className="container-site">
          <SectionTitle>Việc làm theo khu vực</SectionTitle>
          <ul />
        </div>
      </div>

      {/* Mới nhất Blog */}
      <div className={section}>
        <div className="container-site">
          <SectionTitle subtitle="Truy cập để xem các bài viết mới nhất">
            Mới nhất <span>Blog</span>
          </SectionTitle>
          <ul />
          <ViewAllButton href="/blog">Xem tất cả bài viết trên blog</ViewAllButton>
        </div>
      </div>

      <Newsletter />
    </>
  );
}
