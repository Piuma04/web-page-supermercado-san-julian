import { deleteProduct } from "@/app/lib/actions";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { PencilIcon, PlusIcon, Trash2, TrashIcon } from "lucide-react";
import Link from "next/link";


export function CreateProduct() {
  return (
    <Button asChild className="bg-red-600 hover:bg-red-700 focus-visible:outline-red-600">
      <Link href="/admin/crudProducts/create" className="flex items-center gap-2 px-4 py-2">
        <span className="hidden md:block">Crear producto</span>
        <PlusIcon className="h-5 w-5" />
      </Link>
    </Button>
  );
}

export function UpdateProduct({ id }: { id: string }) {
  return (
    <Link
      
      href={`/admin/crudProducts/${id}/update`}
      className="text-red-700 border-red-300 hover:bg-red-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}


export function DeleteProduct({ id }: { id: number }) {
   const deleteProductWithId = deleteProduct.bind(null, id);
  return (
       <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 className="mr-2 h-4 w-4" />
          Eliminar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form
          action={deleteProductWithId}
        
        >
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará el producto permanentemente y no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel type="button">Cancelar</AlertDialogCancel>
            <Button type="submit" variant="destructive">
              Confirmar eliminación
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
  