import Carousel from "@/components/Carousel";
import { SectionTitle } from "@/components/cards";
import { testimonials } from "@/lib/site";

/** `.testimonialwrap` – "Câu chuyện thành công" slider over the faces background. */
export default function Testimonials() {
  return (
    <div className="overflow-hidden bg-brand bg-[url(/images/testimonials-bg.jpg)] bg-center bg-repeat py-[70px] text-center lg:bg-fixed"
      style={{ backgroundImage: "url(/images/testimonials-bg.jpg)" }}>
      <div className="container-site">
        <SectionTitle subtitle="Chia sẻ" light>
          Câu chuyện thành công
        </SectionTitle>
        <Carousel perView={[1, 2, 3, 3]} gap={30} interval={5000} className="mt-10">
          {testimonials.map((t) => (
            <div key={t.name} className="h-full">
              <div className="rounded-[15px] bg-white p-10 text-left">
                <div className="pt-[15px] pb-[5px] font-heading text-[24px] font-bold text-[#333]">{t.name}</div>
                <div className="mb-[15px] font-heading font-semibold text-brand">{t.company}</div>
                <div className="mb-5 flex gap-1 text-[16px] text-star">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <i key={i} className="fa-solid fa-star" />
                  ))}
                </div>
                <p className="text-[16px] leading-6 text-[#333] italic">{t.text}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
