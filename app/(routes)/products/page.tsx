import ProductCard from "@/app/components/ProductCard";
import ProductTable from "@/app/components/ProductTable";
import { fetchProducts } from "@/app/lib/data";
import Link from "next/link";

export default async function Page(
  props: {
    searchParams?: Promise<{
      query?: string;
      page?: string;
    }>;
  }
) {

  /*
  hay que hacer que agarre la cantidad total de productos para saber cuantas páginas hay
  */
  

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Productos</h1>
      <ProductTable query={''} currentPage={3}/>
    </main>
  );
}
