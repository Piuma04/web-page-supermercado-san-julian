import { fetchCategories, fetchProduct } from "@/app/lib/data";
import UpdateProductForm from "@/app/components/admin/ProductsForms/UpdateProductForm";
import { notFound } from "next/navigation";




export default async function UpdateProduct(props: { params: Promise<{ id: string }> }){


    const params = await props.params;
    const id = params.id;

 

    const [product, categories] = await Promise.all ([

        fetchProduct(id),
        fetchCategories(),
    ])

    if (!product) {
        return notFound();
    }

    const simpleCategories = categories.map(({ id, name }) => ({ id, name }))

    return(
        <main>
            <UpdateProductForm categories={simpleCategories} product={product} />
        </main>
    );

}