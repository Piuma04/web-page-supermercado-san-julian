import { fetchProduct } from "@/app/lib/data";
import SimilarProductsCarousel from "@/app/components/carousel/SimilarProductsCarousel";
import SimilarProductsCarouselSkeleton from "@/app/components/carousel/SimilarProductsCarouselSkeleton";
import ProductFullView from "@/app/components/ProductFullView";
import Link from "next/link";
import { Suspense } from "react";

export default async function ProductDetailPage(props: { params: Promise<{ id: string }> }) {
    const { id } = await props.params;

    let product;
    let error = null;
    
    try {
        product = await fetchProduct(id);
        if (!product) {
            error = "Product not found";
        }
    } catch (e) {
        error = "Failed to load product";
        console.error(e);
    }

    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-xl w-full text-center">
                    <h2 className="text-2xl font-bold text-red-700 mb-2">
                        {error === "Product not found" ? "Producto no encontrado" : "Error al cargar el producto"}
                    </h2>
                    <p className="text-red-600 mb-4">
                        {error === "Product not found" 
                            ? "El producto que buscas no existe o ha sido eliminado."
                            : "Ha ocurrido un error al intentar cargar este producto."}
                    </p>
                    <Link 
                        href="/products" 
                        className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                    >
                        Volver a la tienda
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-4">
            <ProductFullView
                id={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
                imageUrl={product.imageUrl}
                category={product.category.name}
            />
            
            <Suspense fallback={<SimilarProductsCarouselSkeleton />}>
                <SimilarProductsCarousel categoryId={product.categoryId} productId={product.id} />
            </Suspense>
        </div>
    );
}