import { fetchAllBanners } from "@/app/lib/data";


export default async function  crudBanners(){

    const banners = await fetchAllBanners()
}