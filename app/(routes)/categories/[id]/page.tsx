import { fetchCategory } from "@/app/lib/data";

export default async function Page({ params }: { params: { id: string } }) {
  const {id} = await params
  const category = await fetchCategory(id);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">{category?.name}</h1>
      <ul className="space-y-4">
        {category?.products.map((product) => (
          <li
            key={product.id}
            className="border p-4 rounded-xl shadow flex flex-col gap-1"
          >
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-sm text-gray-500">
              Categoría: {category?.name}
            </p>
            <p className="text-md font-medium">${product.price}</p>
            {product.imageUrl && (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-40 h-auto mt-2 rounded"
              />
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
