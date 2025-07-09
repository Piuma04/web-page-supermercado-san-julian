import { fetchFilteredBanners } from "@/app/lib/data";
import AdminBannerCard from "./AdminBannerCard";

type Props = {
  query: string;
  page: number;
};

export default async function AdminBannerTable({ query, currentPage }: {query:string, currentPage:number}) {
  const banners = await fetchFilteredBanners(query, currentPage);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {banners.length === 0 ? (
        <p className="col-span-full text-center text-muted-foreground">
          No se encontraron banners.
        </p>
      ) : (
        banners.map((banner) => (
          <AdminBannerCard
            key={banner.id} 
            banner={banner} 
          />
        ))
      )}
    </div>
  );
}
