import { deleteBanner, deleteCategory, deleteProduct, modifyDisplayBanner } from "@/app/lib/actions";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon, ImagePlusIcon, PencilIcon, PlusIcon, Trash2 } from "lucide-react";
import Link from "next/link";

/*

PRODUCT BUTTONS

*/

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
      aria-label="Actualizar producto"
      href={`/admin/crudProducts/${id}/update`}
      className="text-red-700 border-red-300 hover:bg-red-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}




/*

CATEGORY BUTTONS

*/

export function CreateCategory() {
  return (
    <Button asChild className="bg-red-600  hover:bg-red-700 focus-visible:outline-red-600">
      <Link href="/admin/crudCategories/create" className="flex items-center gap-2 px-4 py-2">
        <span className="block">Crear Categoria</span>
        <PlusIcon className="h-5 w-5" />
      </Link>
    </Button>
  );
}

export function UpdateCategory({ id  }: { id: string}) {
  return (
    <Link
      aria-label="Actualizar categoria"
      href={`/admin/crudCategories/${id}/update`}
      className="text-red-700 border-red-300 hover:bg-red-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}





/*

BANNER BUTTONS

*/

export function CreateBanner() {
  return (
    <Button asChild className="bg-red-600 hover:bg-red-700 text-white font-medium shadow-sm">
      <Link href="/admin/crudBanners/create" className="flex items-center gap-2 px-4 py-2">
        <ImagePlusIcon className="h-5 w-5" />
        <span className="hidden md:block">Crear banner</span>
      </Link>
    </Button>
  );
}

