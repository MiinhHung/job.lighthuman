import Carousel from "@/components/Carousel";
import { CompanyCard } from "@/components/cards";
import type { Company } from "@/lib/data";

/** "Công ty nổi bật" – two cards stacked per column, sliding like the live Owl carousel. */
export default function FeaturedCompanies({ companies }: { companies: Company[] }) {
  const columns: Company[][] = [];
  for (let i = 0; i < companies.length; i += 2) columns.push(companies.slice(i, i + 2));

  return (
    <Carousel perView={[1, 2, 4, 5]} gap={15} interval={3500} className="py-5">
      {columns.map((col) => (
        <ul key={col[0].slug}>
          {col.map((c) => (
            <li key={c.slug}>
              <CompanyCard company={c} />
            </li>
          ))}
        </ul>
      ))}
    </Carousel>
  );
}
