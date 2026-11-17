"use client";

import Link from "next/link";
import { useState } from "react";
import AuthTabs, { inputCls, submitCls } from "@/components/forms/AuthTabs";
import Notice from "@/components/forms/Notice";

export default function RegisterForm() {
  const [msg, setMsg] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (f.get("password") !== f.get("password_confirmation")) return setMsg("Mật khẩu xác nhận không khớp.");
    if (!f.get("terms_of_use")) return setMsg("Bạn cần chấp nhận điều khoản sử dụng.");
    setMsg("Bản demo chưa kết nối máy chủ — thông tin đăng ký hợp lệ nhưng chưa được lưu.");
  };

  return (
    <AuthTabs>
      {(role) => (
        <div key={role}>
          <h3 className="text-[25px] text-[#222]">{role === "candidate" ? "Register as a Candidate" : "Register as a Employer"}</h3>
          {msg && (
            <div className="mt-3">
              <Notice onClose={() => setMsg(null)}>{msg}</Notice>
            </div>
          )}
          <form className="mt-4" onSubmit={onSubmit}>
            {role === "candidate" ? (
              <>
                <Field name="first_name" placeholder="Tên" required />
                <Field name="middle_name" placeholder="Tên đệm" />
                <Field name="last_name" placeholder="Họ" required />
              </>
            ) : (
              <Field name="name" placeholder="Tên" required />
            )}
            <Field name="email" type="email" placeholder="Email" required />
            <Field name="password" type="password" placeholder="Mật khẩu" required />
            <Field name="password_confirmation" type="password" placeholder="Xác nhận mật khẩu" required />
            <div className="mb-[15px]">
              <label className="inline-flex items-center gap-1.5">
                <input type="checkbox" name="is_subscribed" value="1" defaultChecked /> Subscribe to Newsletter
              </label>
            </div>
            <div className="mb-[15px]">
              <label className="inline-flex items-center gap-1.5">
                <input type="checkbox" name="terms_of_use" value="1" />
                <Link href="/cms/terms-of-use">Tôi chấp nhận điều khoản sử dụng</Link>
              </label>
            </div>
            <div className="h-[78px]" />
            <input type="submit" value="Đăng ký" className={`${submitCls} mt-4`} />
          </form>
          <div className="mt-[30px] text-center text-[18px] text-[#666]">
            <i className="fa-solid fa-user" /> Có tài khoản?{" "}
            <Link href="/login" className="font-semibold">
              Đăng nhập
            </Link>
          </div>
        </div>
      )}
    </AuthTabs>
  );
}

function Field({ name, placeholder, type = "text", required }: { name: string; placeholder: string; type?: string; required?: boolean }) {
  return (
    <div className="mb-[15px]">
      <input type={type} name={name} required={required} placeholder={placeholder} className={inputCls} />
    </div>
  );
}
