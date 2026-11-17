import { PageTitle } from "@/components/PageBanners";
import LoginForm from "./LoginForm";

export const metadata = { title: "LIGHT HUMAN JOB PORTAL" };

export default function LoginPage() {
  return (
    <>
      <PageTitle title="Đăng nhập" />
      <div className="relative py-[100px] max-lg:px-3">
        <div className="container-site">
          <div className="mx-auto max-w-[600px] lg:w-5/12 lg:max-w-none">
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
}
