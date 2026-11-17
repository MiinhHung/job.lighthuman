"use client";

import { useRef, useState } from "react";

type Widget = { key: string; title: string; options: { value: string; count: number }[] };

const VISIBLE = 3;

function WidgetBlock({ widget, selected, onChange }: { widget: Widget; selected: string[]; onChange: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const list = expanded ? widget.options : widget.options.slice(0, VISIBLE);
  return (
    <div className="mb-5 border-b border-[#ddd] pb-5">
      <h4 className="mb-5 text-[14px] font-semibold text-black">{widget.title}</h4>
      <ul>
        {list.map((o, i) => {
          const id = `${widget.key}_${i}`;
          return (
            <li key={o.value} className="relative mb-2.5 py-[5px] pr-6 pl-[30px] leading-[14px]">
              <input
                type="checkbox"
                id={id}
                name={widget.key}
                value={o.value}
                defaultChecked={selected.includes(o.value)}
                onChange={onChange}
                className="hidden"
              />
              <label htmlFor={id} className="opt-check">
                <i className="fa-solid fa-check" />
              </label>
              <label htmlFor={id} className="cursor-pointer">
                {o.value}
              </label>
              <span className="absolute top-1.5 right-0">{o.count}</span>
            </li>
          );
        })}
      </ul>
      {widget.options.length > VISIBLE && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-2.5 inline-block text-brand"
        >
          {expanded ? "Ẩn bớt" : "Xem thêm"}
        </button>
      )}
    </div>
  );
}

/** `.sidebar` on /jobs – every checkbox change resubmits the form, like the live site. */
export default function JobFilters({
  widgets,
  selected,
  search,
}: {
  widgets: Widget[];
  selected: Record<string, string[]>;
  search: string;
}) {
  const form = useRef<HTMLFormElement>(null);
  return (
    <form ref={form} action="/jobs" method="get" className="mb-[30px] rounded-[5px] bg-ice p-5">
      {search && <input type="hidden" name="search" value={search} />}
      {widgets.map((w) => (
        <WidgetBlock key={w.key} widget={w} selected={selected[w.key] ?? []} onChange={() => form.current?.requestSubmit()} />
      ))}
      <noscript>
        <button type="submit" className="w-full bg-brand py-2.5 text-white">
          Lọc
        </button>
      </noscript>
    </form>
  );
}
