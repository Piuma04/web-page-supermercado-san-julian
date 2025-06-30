import { deleteProduct } from "@/app/lib/actions";
import { Button } from "@/components/ui/button";
import { PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import Link from "next/link";


export function CreateProduct() {
  return (
    <Button asChild className="bg-red-600 hover:bg-red-700 focus-visible:outline-red-600">
      <Link href="/admin/crud/create" className="flex items-center gap-2 px-4 py-2">
        <span className="hidden md:block">Crear producto</span>
        <PlusIcon className="h-5 w-5" />
      </Link>
    </Button>
  );
}

export function UpdateProduct({ id }: { id: string }) {
  return (
    <Link
      
      href={`/admin/crud/${id}/update`}
      className="text-red-700 border-red-300 hover:bg-red-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}


export function DeleteProduct({ id }: { id: number }) {
   const deleteProductWithId = deleteProduct.bind(null, id);
  return (
     <form action={deleteProductWithId}>
      <button type="submit" className="flex items-center gap-1 text-sm bg-red-600 text-white px-3 py-1.5 rounded-xl hover:bg-red-700">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-4" />
      </button>
    </form>
  );
}
  