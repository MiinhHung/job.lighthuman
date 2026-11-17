"use client";

/** Small success/info box shown after a demo form submit (there is no backend in the clone). */
export default function Notice({ children, onClose }: { children: React.ReactNode; onClose?: () => void }) {
  return (
    <div role="status" className="mb-5 flex items-start gap-3 rounded-[5px] border border-[#b7dcf5] bg-[#e8f4fd] px-4 py-3 text-left text-[14px] leading-[22px] text-[#0b4f80]">
      <i className="fa-solid fa-circle-info mt-1" />
      <div className="flex-1">{children}</div>
      {onClose && (
        <button type="button" onClick={onClose} aria-label="Đóng" className="text-[#0b4f80]">
          <i className="fa-solid fa-xmark" />
        </button>
      )}
    </div>
  );
}
