"use client";

import { useState } from "react";

export type Role = "candidate" | "employer";

/** `.userbtns .nav-tabs` – Ứng viên / Nhà tuyển dụng switch with the little arrow under the active tab. */
export default function AuthTabs({ children }: { children: (role: Role) => React.ReactNode }) {
  const [role, setRole] = useState<Role>("candidate");
  const tabs: { id: Role; label: string }[] = [
    { id: "candidate", label: "Ứng viên" },
    { id: "employer", label: "Nhà tuyển dụng" },
  ];
  return (
    <>
      <ul role="tablist" className="flex">
        {tabs.map((t) => {
          const active = role === t.id;
          return (
            <li key={t.id} className="w-1/2">
              <button
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setRole(t.id)}
                className={`relative block w-full rounded-t-[5px] px-[30px] py-[15px] text-center text-[18px] font-semibold ${
                  active
                    ? "bg-brand text-white after:absolute after:-bottom-2.5 after:left-1/2 after:-ml-[5px] after:border-x-[10px] after:border-t-[10px] after:border-x-transparent after:border-t-brand after:content-['']"
                    : "bg-[#f2f2f2] text-[#222] hover:bg-brand hover:text-white"
                }`}
              >
                {t.label}
              </button>
            </li>
          );
        })}
      </ul>
      <div className="mb-[30px] rounded-b-[10px] border-b-[3px] border-brand bg-white p-[50px] shadow-[0_6px_12px_rgba(0,0,0,0.05)] max-sm:p-6">
        {children(role)}
      </div>
    </>
  );
}

export const inputCls =
  "block w-full rounded-none border border-[#ddd] bg-white px-[13px] py-2.5 text-[16px] leading-6 text-[#495057] placeholder:text-[#6c757d] focus:border-[#86b7fe] focus:shadow-[0_0_0_0.25rem_rgba(13,110,253,0.25)]";

export const submitCls =
  "w-full rounded-[5px] bg-brand p-2.5 text-[16px] leading-6 font-bold text-white uppercase hover:bg-[#222]";
