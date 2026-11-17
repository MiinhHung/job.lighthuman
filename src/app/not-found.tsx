import Link from "next/link";
import { PageTitle } from "@/components/PageBanners";

export default function NotFound() {
  return (
    <>
      <PageTitle title="404" />
      <div className="py-[100px] text-center">
        <h2 className="text-[30px] text-brand">Không tìm thấy trang</h2>
        <p className="mt-4 text-[16px]">Trang bạn tìm không tồn tại hoặc đã bị gỡ.</p>
        <Link href="/" className="mt-8 inline-block rounded-[5px] bg-brand px-[30px] py-[15px] text-[18px] font-semibold text-white">
          Về trang chủ
        </Link>
      </div>
    </>
  );
}
