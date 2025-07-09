import { deleteBanner, deleteCategory, deleteProduct, modifyDisplayBanner } from "@/app/lib/actions";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { PencilIcon, PlusIcon, Trash2, TrashIcon } from "lucide-react";
import Link from "next/link";
import { StringValidation } from "zod";

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
        <form action = {deleteProductWithId} >
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
      
      href={`/admin/crudCategories/${id}/update`}
      className="text-red-700 border-red-300 hover:bg-red-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}



export function DeleteCategory({ id, prod }: { id: number; prod: boolean }) {



  if (prod) {
    
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Eliminar
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>No se puede eliminar</AlertDialogTitle>
            <AlertDialogDescription>
              Esta categoría tiene productos asociados y no puede ser eliminada.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel type="button">Cerrar</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }





  const deleteCategorywithId = deleteCategory.bind(null, id);
  
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 className="mr-2 h-4 w-4" />
          Eliminar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form action = {deleteCategorywithId}>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará la categoría permanentemente y no se puede deshacer.
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


/*

BANNER BUTTONS

*/

export function CreateBanner() {
  return (
    <Button asChild className="bg-red-600 hover:bg-red-700 focus-visible:outline-red-600">
      <Link href="/admin/crudBanners/create" className="flex items-center gap-2 px-4 py-2">
        <span className="hidden md:block">Crear banner</span>
        <PlusIcon className="h-5 w-5" />
      </Link>
    </Button>
  );
}


export function DeleteBanner({ id }: { id: number }) {
   const deleteBannerWithId = deleteBanner.bind(null, id);
  return (
      <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 className="mr-2 h-4 w-4" />
          Eliminar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form action = {deleteBannerWithId} >
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará el banner.
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


export function ModifyDisplayBannerButton({ id, isOnDisplay }: { id: number; isOnDisplay: boolean }) {

  
  const handleModifyDisplayBanner = async (formData: FormData) => {
    // We expect a hidden input named "newIsOnDisplay" in the form
    const newIsOnDisplay = formData.get("newIsOnDisplay") === "true";
    await modifyDisplayBanner(id, newIsOnDisplay);
  };

  if (isOnDisplay) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Sacar del roster
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <form action={handleModifyDisplayBanner}>
            <input type="hidden" name="newIsOnDisplay" value="false" />
            <AlertDialogHeader>
              <AlertDialogTitle>Eliminar del roster actual</AlertDialogTitle>
              <AlertDialogDescription>
                El banner actual sera retirado del roster en display
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel type="button">Cancelar</AlertDialogCancel>
              <Button type="submit" variant="destructive">
                Confirmar retiro
              </Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 className="mr-2 h-4 w-4" />
          Eliminar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form action={handleModifyDisplayBanner}>
          <input type="hidden" name="newIsOnDisplay" value="true" />
          <AlertDialogHeader>
            <AlertDialogTitle>Poner en el roster</AlertDialogTitle>
            <AlertDialogDescription>
              Este banner sera puesto en el roster
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel type="button">Cancelar</AlertDialogCancel>
            <Button type="submit" variant="destructive">
              Confirmar adición
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
