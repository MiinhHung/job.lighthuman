import Image from "next/image";
import { PageTitle } from "@/components/PageBanners";
import RegisterForm from "./RegisterForm";

export const metadata = { title: "LIGHT HUMAN JOB PORTAL" };

export default function RegisterPage() {
  return (
    <>
      <PageTitle title="Đăng ký" />
      <div className="relative py-[100px] max-lg:px-3">
        <div className="container-site">
          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 lg:w-5/12">
              <div className="mx-auto max-w-[600px]">
                <RegisterForm />
              </div>
            </div>
            <div className="w-full px-3 lg:w-7/12">
              <Image src="/images/login-page-banner.png" alt="" width={630} height={600} className="mx-auto h-auto max-w-full" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
