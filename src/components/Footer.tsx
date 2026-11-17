import Image from "next/image";
import Link from "next/link";
import { footerAreas, footerIndustries } from "@/lib/data";
import { quickLinks, site, socials } from "@/lib/site";
import CurrentYear from "./CurrentYear";

const linkCls = "block py-2 text-[14px] text-[#888] hover:text-brand";

export default function Footer() {
  return (
    <>
      <footer className="bg-ice py-[50px]">
        <div className="container-site">
          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 md:w-1/2 lg:w-1/4">
              <h5 className="mb-[15px] text-[24px] font-bold leading-none text-ink max-lg:mt-[25px] lg:text-[18px]">
                Liên kết nhanh
              </h5>
              <ul>
                {quickLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={linkCls}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full px-3 md:w-1/2 lg:w-1/4">
              <h5 className="mb-[15px] text-[24px] font-bold leading-none text-ink max-lg:mt-[25px] lg:text-[18px]">
                Việc làm theo lĩnh vực chức năng
              </h5>
              <ul>
                {footerAreas().map((a) => (
                  <li key={a.id}>
                    <Link href={`/jobs?functional_area=${a.id}`} className={linkCls}>
                      {a.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full px-3 md:w-1/2 lg:w-1/4">
              <h5 className="mb-[15px] text-[24px] font-bold leading-none text-ink max-lg:mt-[25px] lg:text-[18px]">
                Việc làm theo ngành nghề
              </h5>
              <ul>
                {footerIndustries().map((i) => (
                  <li key={i.id}>
                    <Link href={`/jobs?industry=${i.id}`} className={linkCls}>
                      {i.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full px-3 md:w-1/2 lg:w-1/4">
              <h5 className="mb-[15px] text-[24px] font-bold leading-none text-ink max-lg:mt-[25px] lg:text-[18px]">
                Liên hệ với chúng tôi
              </h5>
              <div className="relative mb-5 pt-2 pl-[30px] leading-5 text-ink">
                <i className="fa-solid fa-location-dot absolute top-2.5 left-0.5 text-[18px]" />
                {site.address}
              </div>
              <div className="relative mb-5 pl-[30px] text-ink">
                <i className="fa-regular fa-envelope absolute top-0 left-0 text-[17px]" />
                <a href={`mailto:${site.email}`} className="text-ink">
                  {site.email}
                </a>
              </div>
              <div className="relative mb-5 pl-[30px] text-[18px] font-bold text-ink">
                <i className="fa-solid fa-phone absolute top-0 left-0 text-[18px]" />
                <a href={`tel:${site.phone}`} className="text-ink">
                  {site.phone}
                </a>
              </div>
              <div className="mt-5 flex flex-wrap">
                {socials.map((s) => (
                  <a
                    key={s.icon}
                    href={s.href}
                    target="_blank"
                    rel="nofollow noopener"
                    aria-label={s.label}
                    className="mr-[5px] inline-block text-[32px] leading-none text-brand hover:text-[#36b3e5]"
                  >
                    <i className={`fa-brands ${s.icon}`} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div className="py-2.5 text-[#777]">
        <div className="container-site">
          <div className="-mx-3 flex flex-wrap items-center">
            <div className="w-full px-3 py-[13px] leading-6 lg:w-2/3">
              Bản quyền © <CurrentYear /> {site.name}. Đã đăng ký bản quyền. Thiết kế bởi:{" "}
              <a href={site.designer.url} target="_blank" rel="nofollow noopener">
                {site.designer.name}
              </a>
            </div>
            <div className="w-full px-3 lg:w-1/3 lg:text-right">
              <Image src="/images/payment-icons.png" alt="PayPal, Stripe" width={168} height={25} className="inline-block" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
