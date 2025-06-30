import ProductCard from "./ProductCard";
import { fetchFilteredProducts } from "../lib/data";


export default async function ProductGrid({
  query,
  categoryId,
  currentPage,
}: {
  query: string;
  categoryId?: number;
  currentPage: number;
}) {
    const products = await fetchFilteredProducts(query, currentPage, categoryId);     
    return(
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    imageUrl={product.imageUrl}
                />
            ))}
        </div>
    );
}