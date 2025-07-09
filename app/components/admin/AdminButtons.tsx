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
    <Button asChild className="bg-red-600 hover:bg-red-700 text-white font-medium shadow-sm">
      <Link href="/admin/crudBanners/create" className="flex items-center gap-2 px-4 py-2">
        <ImagePlusIcon className="h-5 w-5" />
        <span className="hidden md:block">Crear banner</span>
      </Link>
    </Button>
  );
}

export function DeleteBanner({ id }: { id: number }) {
  const deleteBannerWithId = deleteBanner.bind(null, id);
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800">
          <Trash2 className="mr-2 h-4 w-4" />
          Eliminar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="border-red-100">
        <form action={deleteBannerWithId}>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-700">¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará el banner permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel type="button" className="border-gray-300">Cancelar</AlertDialogCancel>
            <Button type="submit" variant="destructive" className="bg-red-600 hover:bg-red-700">
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
    "use server"
    const newIsOnDisplay = formData.get("newIsOnDisplay") === "true";
    await modifyDisplayBanner(id, newIsOnDisplay);
  };

  if (isOnDisplay) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 hover:text-amber-800"
          >
            <EyeOffIcon className="mr-2 h-4 w-4" />
            Desactivar banner
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <form action={handleModifyDisplayBanner}>
            <input type="hidden" name="newIsOnDisplay" value="false" />
            <AlertDialogHeader>
              <AlertDialogTitle>Desactivar banner</AlertDialogTitle>
              <AlertDialogDescription>
                El banner será retirado del roster y dejará de mostrarse al público.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel type="button">Cancelar</AlertDialogCancel>
              <Button type="submit" variant="outline" className="border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100">
                Confirmar desactivación
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
        <Button 
          variant="outline" 
          className="w-full border-green-200 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800"
        >
          <EyeIcon className="mr-2 h-4 w-4" />
          Activar banner
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form action={handleModifyDisplayBanner}>
          <input type="hidden" name="newIsOnDisplay" value="true" />
          <AlertDialogHeader>
            <AlertDialogTitle>Activar banner</AlertDialogTitle>
            <AlertDialogDescription>
              El banner será agregado al roster y se mostrará al público.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel type="button">Cancelar</AlertDialogCancel>
            <Button type="submit" variant="outline" className="border-green-200 bg-green-50 text-green-700 hover:bg-green-100">
              Confirmar activación
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
