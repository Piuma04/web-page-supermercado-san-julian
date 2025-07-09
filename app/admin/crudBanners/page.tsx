import { fetchAllBanners } from "@/app/lib/data";


export default async function  createBanner(){

    const banners = await fetchAllBanners()
}