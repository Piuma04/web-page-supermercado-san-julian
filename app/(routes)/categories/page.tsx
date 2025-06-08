import { fetchCategories } from "@/app/lib/data";

export default async function Page(){
    const categories = await fetchCategories();

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Categorias</h1>
            <ul className="space-y-4">
                {categories.map((category) => (
                    <li
                        key={category.id}
                        className="border p-4 rounded-xl shadow flex flex-col gap-1"
                    >
                        <h2 className="text-xl font-semibold">{category.name}</h2>
                    </li>
                ))}
            </ul>
        </main>
    );
}