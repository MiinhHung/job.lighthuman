import { PageTitle } from "@/components/PageBanners";
import { site } from "@/lib/site";
import ContactForm from "./ContactForm";

export const metadata = { title: "Jobs In United States of America" };

const MAP =
  "https://maps.google.com/maps?q=" +
  encodeURIComponent("Công ty cổ phần Giải Pháp Nhân Sự Ánh Sáng (Light Human), 213 Chu Văn An, Bình Thạnh") +
  "&output=embed";

function InfoBox({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <div className="mb-[30px] flex border border-[#ddd] p-[15px]">
      <span className="mr-2.5 w-[70px] shrink-0 text-center text-[50px] leading-[50px] text-brand">
        <i className={icon} />
      </span>
      <div className="mt-[5px] overflow-hidden pr-5">
        <strong className="mb-[5px] block text-[16px] font-bold text-black uppercase">{title}</strong>
        {children}
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageTitle title="Liên hệ với chúng tôi" />
      <div className="py-[50px] max-lg:px-3">
        <div className="container-site">
          <div className="mb-10 text-center">
            <span className="mb-2.5 text-[17px] text-[#292929]">Chúng tôi ở đây để giúp bạn</span>
            <h2 className="m-0 text-[40px] font-extrabold tracking-[1px] text-[#292929]">Liên hệ nhanh</h2>
            <p className="leading-6">
              Vestibulum at magna tellus. Vivamus sagittis nunc aliquet. Vivamin orci aliquam
              <br />
              eros vel saphicula. Donec eget ultricies ipsmconsequat
            </p>
          </div>

          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 lg:w-1/3">
              <InfoBox icon="fa-solid fa-house" title="Địa chỉ:">
                <p className="m-0">{site.address}</p>
              </InfoBox>
            </div>
            <div className="w-full px-3 lg:w-1/3">
              <InfoBox icon="fa-solid fa-envelope" title="Địa chỉ email:">
                <p className="m-0">
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </p>
              </InfoBox>
            </div>
            <div className="w-full px-3 lg:w-1/3">
              <InfoBox icon="fa-solid fa-phone" title="Điện thoại:">
                <p className="m-0">
                  <a href={`tel:${site.phone}`}>{site.phone}</a>
                </p>
                <p className="m-0">
                  <a href={`tel:${site.phone}`}>{site.phone}</a>
                </p>
              </InfoBox>
            </div>
          </div>

          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 lg:w-1/3">
              <iframe title="Bản đồ" src={MAP} className="mb-[30px] h-[400px] w-full border-0" loading="lazy" allowFullScreen />
            </div>
            <div className="w-full px-3 lg:w-2/3">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
