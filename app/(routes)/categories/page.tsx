import { fetchCategories } from "@/app/lib/data";
import Link from "next/link";

export default async function Page(){
    const categories = await fetchCategories();

    return (
        <div className="container mx-auto px-6 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Categorias</h1>
                <p className="text-gray-600">Busque entre todas nuestras categorias</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                    <Link
                        href={`/categories/${category.id}`}
                        key={category.id}
                        className="group bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6 hover:border-gray-300"
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {category.name}
                            </h2>
                            <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}