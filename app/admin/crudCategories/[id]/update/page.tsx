import { fetchCategory } from "@/app/lib/data";
import UpdateCategoryForm from "@/app/components/admin/CategoriesForms/UpdateCategoryForm";
import { notFound } from "next/navigation";




export default async function UpdateCategory(props: { params: Promise<{ id: string }> }){


    const params = await props.params;
    const id = params.id;

 

    const category = await fetchCategory(id);

    if (!category) {
        notFound();
    }

 

    return(
        <main>
            <UpdateCategoryForm category={category} />
        </main>
    );

}