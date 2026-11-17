"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Items visible per breakpoint: [base, md(≥768), lg(≥992), xl(≥1200)] */
  perView: [number, number, number, number];
  gap: number;
  interval?: number;
  className?: string;
};

function usePerView(perView: Props["perView"]) {
  const [n, setN] = useState(perView[3]);
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      setN(w >= 1200 ? perView[3] : w >= 992 ? perView[2] : w >= 768 ? perView[1] : perView[0]);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [perView]);
  return n;
}

/** Infinite, autoplaying slider in the spirit of the Owl Carousel used on the live site. */
export default function Carousel({ children, perView, gap, interval = 4000, className = "" }: Props) {
  const items = Children.toArray(children);
  const count = items.length;
  const n = usePerView(perView);
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const drag = useRef<number | null>(null);

  const canSlide = count > n;

  useEffect(() => {
    if (!canSlide || paused) return;
    const t = setInterval(() => {
      setAnimate(true);
      setIndex((i) => i + 1);
    }, interval);
    return () => clearInterval(t);
  }, [canSlide, paused, interval]);

  // When we run past the original set, jump back without animation (track is doubled).
  useEffect(() => {
    if (index < count) return;
    const t = setTimeout(() => {
      setAnimate(false);
      setIndex((i) => i - count);
    }, 450);
    return () => clearTimeout(t);
  }, [index, count]);

  useEffect(() => {
    if (!animate) {
      const r = requestAnimationFrame(() => setAnimate(true));
      return () => cancelAnimationFrame(r);
    }
  }, [animate]);

  const go = (dir: 1 | -1) => {
    setAnimate(true);
    setIndex((i) => {
      const next = i + dir;
      return next < 0 ? count - 1 : next;
    });
  };

  const track = canSlide ? [...items, ...items] : items;
  const width = `calc((100% - ${(n - 1) * gap}px) / ${n})`;
  const offset = `calc(${-index} * (((100% - ${(n - 1) * gap}px) / ${n}) + ${gap}px))`;

  return (
    <div
      className={`overflow-hidden ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onPointerDown={(e) => {
        drag.current = e.clientX;
      }}
      onPointerUp={(e) => {
        if (drag.current === null || !canSlide) return;
        const dx = e.clientX - drag.current;
        drag.current = null;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
      }}
    >
      <div
        className="flex"
        style={{
          gap,
          transform: `translateX(${offset})`,
          transition: animate ? "transform 400ms ease" : "none",
        }}
      >
        {track.map((child, i) => (
          <div key={i} className="shrink-0" style={{ width }} aria-hidden={i >= count || undefined}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
