"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNav, site } from "@/lib/site";

export default function Header() {
  const [sticky, setSticky] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  // Close the mobile drawer after navigating (state reset keyed on the route).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      id="siteheader"
      className={`fixed top-0 z-10 w-full py-[15px] transition-colors duration-300 ${
        sticky ? "bg-navy" : "bg-linear-to-t from-black/0 to-black/60"
      }`}
    >
      <div className="flex w-full flex-wrap items-start px-3 lg:flex-nowrap">
        {/* Logo */}
        <div className="flex w-full items-center justify-between lg:w-1/6 lg:shrink-0">
          <Link href="/" className="my-[5px] inline-block">
            <Image src={site.logo} alt={site.name} width={165} height={70} priority className="h-[70px] w-auto" />
          </Link>
          <button
            type="button"
            aria-label="Mở menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="mt-[5px] rounded-[5px] bg-[#eee] p-2.5 text-[18px] leading-none text-black lg:hidden"
          >
            <i className="fa-solid fa-bars" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="lg:w-5/6">
          <div
            className={`fixed inset-y-0 left-full z-[10000] w-4/5 overflow-y-auto bg-black/80 p-[30px] transition-[transform,visibility] duration-300 ease-in-out lg:static lg:inset-auto lg:z-auto lg:visible lg:w-auto lg:translate-x-0 lg:overflow-visible lg:bg-transparent lg:p-0 ${
              open ? "visible -translate-x-full" : "invisible"
            }`}
          >
            <button
              type="button"
              aria-label="Đóng menu"
              onClick={() => setOpen(false)}
              className="mb-4 text-[26px] leading-none text-white lg:hidden"
            >
              <i className="fa-solid fa-circle-xmark" />
            </button>
            <ul className="flex flex-col lg:ml-auto lg:flex-row lg:items-start lg:justify-end">
              {mainNav.map((item) => (
                <li key={item.href} className="px-2.5 lg:px-[15px]">
                  <Link
                    href={item.href}
                    className="block py-4 text-[14px] font-semibold text-white hover:text-sun"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="px-2.5 lg:px-[15px]">
                <Link
                  href="/register"
                  className="mt-2 inline-block rounded-[40px] bg-brand px-[18px] py-2.5 text-[14px] font-semibold text-white hover:text-sun"
                >
                  Đăng ký
                </Link>
              </li>
              <li className="group relative mt-[7px] px-2.5 lg:px-[15px]">
                <Link href="/" className="block pt-2" aria-label="Ngôn ngữ">
                  <Image
                    src="/images/lang.png"
                    alt=""
                    width={36}
                    height={36}
                    className="size-9 rounded-full border border-[#ddd] p-[3px]"
                  />
                </Link>
                <ul className="absolute top-[95%] right-0 z-20 hidden w-[200px] rounded-md border border-black/15 bg-white py-2 text-left shadow-lg group-hover:block">
                  {[
                    { label: "English", locale: "en" },
                    { label: "Vietnam", locale: "vi" },
                  ].map((l) => (
                    <li key={l.locale}>
                      <button
                        type="button"
                        onClick={() => {
                          document.documentElement.lang = l.locale;
                        }}
                        className="block w-full px-5 py-[15px] text-left text-[14px] font-semibold text-[#555] hover:bg-brand hover:text-white"
                      >
                        {l.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
