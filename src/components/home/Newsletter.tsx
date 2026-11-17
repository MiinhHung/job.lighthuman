"use client";

import { useState } from "react";

/** `.subscribe` – newsletter strip at the bottom of the home page. */
export default function Newsletter() {
  const [done, setDone] = useState(false);

  return (
    <div className="bg-linear-[211deg] from-sun from-0% to-brand-dark to-100% py-[50px]">
      <div className="container-site">
        <div className="-mx-3 flex flex-wrap items-center">
          <div className="w-full px-3 lg:w-1/3">
            <h6 className="mb-[5px] text-[30px] text-white">Bản tin</h6>
            <p className="text-white">Đăng ký nhận các thông báo về việc làm mới nhất.</p>
          </div>
          <div className="w-full px-3 max-lg:mt-5 lg:w-2/3">
            {done ? (
              <div className="rounded-[5px] bg-white px-5 py-[15px] text-[16px] leading-6 text-brand">
                <i className="fa-solid fa-circle-check" /> Cảm ơn bạn đã đăng ký nhận bản tin!
              </div>
            ) : (
              <form
                className="flex flex-wrap md:flex-nowrap"
                onSubmit={(e) => {
                  e.preventDefault();
                  setDone(true);
                }}
              >
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Tên"
                  className="mr-px w-full rounded-l-[5px] border-r border-[#ddd] bg-white px-[13px] py-[15px] text-[16px] leading-6 md:w-1/2"
                />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email"
                  className="w-full bg-white px-[13px] py-[15px] text-[16px] leading-6 max-md:mt-px md:w-1/2"
                />
                <button
                  type="submit"
                  className="w-full rounded-r-[5px] bg-brand px-5 py-[15px] text-[16px] leading-6 font-semibold whitespace-nowrap text-white uppercase hover:bg-black max-md:mt-2.5 max-md:rounded-[5px] md:ml-2 md:w-[110px] md:shrink-0"
                >
                  Đăng ký
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
