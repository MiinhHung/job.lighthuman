"use client";

import { useState } from "react";
import Notice from "@/components/forms/Notice";

const field =
  "mb-[15px] w-full border border-[#ddd] px-5 py-2.5 text-[12px] leading-8 text-[#8c8c8c] placeholder:text-[#8c8c8c]";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  return (
    <div className="text-right">
      {sent && <Notice onClose={() => setSent(false)}>Cảm ơn bạn! Tin nhắn đã được ghi nhận (bản demo chưa gửi đến máy chủ).</Notice>}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
          e.currentTarget.reset();
        }}
      >
        <div className="-mx-3 flex flex-wrap">
          <div className="w-full px-3 md:w-1/2">
            <input name="full_name" placeholder="Họ và tên" required className={field} />
          </div>
          <div className="w-full px-3 md:w-1/2">
            <input name="email" type="email" placeholder="Email" required className={field} />
          </div>
          <div className="w-full px-3 md:w-1/2">
            <input name="phone" placeholder="Điện thoại" className={field} />
          </div>
          <div className="w-full px-3 md:w-1/2">
            <input name="subject" placeholder="Chủ đề" required className={field} />
          </div>
          <div className="w-full px-3">
            <textarea name="message_txt" placeholder="Tin nhắn" required rows={10} className={`${field} h-[290px] resize-y`} />
          </div>
        </div>
        <button type="submit" className="mt-5 inline-block bg-brand px-10 py-[18px] text-[16px] font-semibold text-white uppercase hover:bg-[#222]">
          Gửi tin nhắn
        </button>
      </form>
    </div>
  );
}
