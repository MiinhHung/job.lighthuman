"use client";

import { useRouter } from "next/navigation";

/** The live site asks visitors to log in before messaging an employer. */
export default function SendMessageButton({ className }: { className: string }) {
  const router = useRouter();
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        if (window.confirm("Vui lòng đăng nhập để gửi tin nhắn cho nhà tuyển dụng.")) router.push("/login");
      }}
    >
      <i className="fa-solid fa-envelope" /> Gửi tin nhắn
    </button>
  );
}
