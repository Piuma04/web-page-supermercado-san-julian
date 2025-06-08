export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
    },
  });

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Productos</h1>
      <ul className="space-y-4">
        {products.map((product) => (
          <li
            key={product.id}
            className="border p-4 rounded-xl shadow flex flex-col gap-1"
          >
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-sm text-gray-500">Categoría: {product.category?.name}</p>
            <p className="text-md font-medium">${product.price}</p>
            {product.imageUrl && (
              <img src={product.imageUrl} alt={product.name} className="w-40 h-auto mt-2 rounded" />
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
