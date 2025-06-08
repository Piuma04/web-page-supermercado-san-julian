import { fetchProduct } from "@/app/lib/data";

export default async function Page({params}: {params: {id: String}}) {
    const {id} = await params
    const product = await fetchProduct(id);

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">{product?.name}</h1>
            <p className="text-md font-medium">${product?.price}</p>
            <p className="text-sm text-gray-500">Categoría: {product?.category.name}</p>
            <p className="text-md font-medium">Descripción: {product?.description}</p>
            {product?.imageUrl && (
                <img
                src={product.imageUrl}
                alt={product.name}
                className="w-40 h-auto mt-2 rounded"
                />
            )}
        </main>
    );
}