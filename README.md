# Light Human Job Portal – bản clone (Next.js + Tailwind)

Bản dựng lại giao diện và chức năng của https://job.lighthuman.vn bằng **Next.js 16 (App Router)** và **Tailwind CSS 4**.
Dữ liệu (việc làm, công ty, danh mục) là ảnh chụp thật từ trang gốc, lưu ở `src/data/*.json`; ảnh nằm trong `public/`.

## Chạy

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Trang

| Đường dẫn | Nội dung |
|---|---|
| `/` | Trang chủ: hero 2 cột, thống kê, tìm kiếm, công ty nổi bật (carousel), cách thức hoạt động, việc làm mới nhất, câu chuyện thành công (carousel), bản tin |
| `/jobs` | Danh sách việc làm: tìm từ khoá, lọc theo sidebar (tự lọc khi tick), phân trang 16 việc/trang. Nhận cả tham số kiểu cũ `functional_area_id[]` |
| `/job/[slug]` | Chi tiết việc làm (81 trang prerender) |
| `/companies`, `/company/[slug]` | Danh sách và chi tiết công ty |
| `/all-categories` | 146 lĩnh vực chức năng |
| `/login`, `/register` | Form có tab Ứng viên / Nhà tuyển dụng, kiểm tra dữ liệu phía client |
| `/contact-us`, `/blog`, `/faq`, `/cms/about-us`, `/cms/terms-of-use` | Trang phụ |

Các trang cần tài khoản trên bản gốc (`/my-profile`, `/apply/...`, yêu thích…) chuyển về `/login`, giống bản gốc.
Bản clone **chưa có backend**: form đăng nhập/đăng ký/liên hệ/bản tin chỉ kiểm tra và hiện thông báo.

## Cấu trúc

- `src/app/globals.css` – token màu/font lấy từ `main.css` gốc (`--color-brand #056cb8`, `--color-sun #ffd302`…)
- `src/lib/data.ts` – kiểu dữ liệu, tìm kiếm & bộ lọc việc làm
- `src/lib/site.ts` – menu, liên hệ, mạng xã hội, testimonial
- `src/components/` – Header (sticky + menu mobile), Footer, Carousel, thẻ việc làm/công ty, banner trang

## Cập nhật dữ liệu từ trang gốc

```bash
npm i -D playwright && npx playwright install chromium
node scripts/scrape/data.js ../ref/data/site.json          # việc làm, công ty, danh mục
node scripts/scrape/mapping.js ../ref/data/site.json ../ref/home.clean.html ../ref/data/mapping.json
node scripts/scrape/extra.js ../ref/data/site.json canawan-51 fe-credit-49 cong-ty-tnhh-tu-van-va-dich-vu-thanh-cong-viet-nam-52 light-humans-clients-44 concentrix-50
node scripts/build-data.mjs                                 # sinh lại src/data/*.json
```
