import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DeleteCategory, UpdateCategory } from "./AdminButtons";
import { fetchFilteredCategories } from "@/app/lib/data";

export default async function AdminCategoryTable({  currentPage }: { currentPage:number}){


    const categories = await fetchFilteredCategories( currentPage);

    return(


        <div className="my-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => (
                <Card 
                    key={category.id} 
                    className="border-red-200 shadow hover:shadow-md transition-shadow"
                >
                    <CardContent className="p-4 flex justify-between items-center">
                    <span className="text-lg font-medium text-red-800">{category.name}</span>
                    <div className="flex space-x-2">
                        <Button 
                        variant="outline" 
                        className="text-red-700 border-red-300 hover:bg-red-100"
                        asChild
                        >
                        <UpdateCategory id={category.id.toString()} />
                        </Button>
                        <DeleteCategory id={category.id} prod={category.products.length >=1 } />
                    </div>
                    </CardContent>
                </Card>
                ))}
            </div>
        </div>

    );
}