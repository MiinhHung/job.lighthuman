"use client";

import Link from "next/link";
import { useState } from "react";
import AuthTabs, { inputCls, submitCls } from "@/components/forms/AuthTabs";
import Notice from "@/components/forms/Notice";

export default function LoginForm() {
  const [sent, setSent] = useState<string | null>(null);
  return (
    <AuthTabs>
      {(role) => (
        <div key={role}>
          <div className="mb-5 pb-5 text-center">
            <h5 className="mb-[15px] text-[20px] font-bold text-[#555]">Login with Social</h5>
            <a href="https://www.facebook.com" className="mx-[5px] inline-block size-9 bg-[#3b5998] text-[18px] leading-9 text-white" aria-label="Facebook">
              <i className="fa-brands fa-facebook" />
            </a>
            <a href="https://twitter.com" className="mx-[5px] inline-block size-9 bg-[#00aced] text-[18px] leading-9 text-white" aria-label="Twitter">
              <i className="fa-brands fa-twitter" />
            </a>
          </div>
          <div className="relative mb-[35px] text-center after:absolute after:top-1/2 after:left-0 after:z-[1] after:h-px after:w-full after:bg-[#e0e6f6] after:content-['']">
            <span className="relative z-[2] inline-block bg-white px-[15px]">Or login with your account</span>
          </div>
          {sent && <Notice onClose={() => setSent(null)}>{sent}</Notice>}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const email = new FormData(e.currentTarget).get("email");
              setSent(`Bản demo chưa kết nối máy chủ — không thể đăng nhập tài khoản ${email}.`);
            }}
          >
            <div className="mb-[15px]">
              <input type="email" name="email" required autoFocus placeholder="Địa chỉ email" className={inputCls} />
            </div>
            <div className="mb-[15px]">
              <input type="password" name="password" required placeholder="Mật khẩu" className={inputCls} />
            </div>
            <div className="mb-4 leading-5">
              <i className="fa-solid fa-lock" /> Quên mật khẩu của bạn? <Link href="/login">Nhấp vào đây</Link>
            </div>
            <input type="submit" value="Đăng nhập" className={submitCls} />
          </form>
          <div className="mt-[30px] text-center text-[18px] text-[#666]">
            <i className="fa-solid fa-user" /> Người dùng mới?{" "}
            <Link href="/register" className="font-semibold">
              Đăng ký tại đây
            </Link>
          </div>
        </div>
      )}
    </AuthTabs>
  );
}
