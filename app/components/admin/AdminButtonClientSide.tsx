'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { deleteBanner, deleteCategory, deleteProduct,  modifyDisplayBannerAction } from "@/app/lib/actions";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { EyeIcon, EyeOffIcon, Trash2 } from "lucide-react"

type DeleteButtonProps = {
  id:number
};

export  function DeleteProduct({ id }: DeleteButtonProps) {
  const [disabled, setDisabled] = useState(false);

  const deleteProductWithId = deleteProduct.bind(null, id);

  const handleSubmit = () => {
    setDisabled(true);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 className="mr-2 h-4 w-4" />
          Eliminar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form action={deleteProductWithId} onSubmit={handleSubmit}>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará el producto permanentemente y no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel type="button" disabled={disabled}>Cancelar</AlertDialogCancel>
            <Button
              type="submit"
              variant="destructive"
              disabled={disabled}
            >
              Eliminar Producto
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}



export function DeleteCategory({ id, prod }: { id: number; prod: boolean }) {
  const [disabled, setDisabled] = useState(false);

  if (prod) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" disabled={disabled}>
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
            <AlertDialogCancel type="button" disabled={disabled}>Cerrar</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  const deleteCategorywithId = deleteCategory.bind(null, id);

  const handleSubmit = () => {
    setDisabled(true);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" disabled={disabled}>
          <Trash2 className="mr-2 h-4 w-4" />
          Eliminar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form action={deleteCategorywithId} onSubmit={handleSubmit}>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará la categoría permanentemente y no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel type="button" disabled={disabled}>Cancelar</AlertDialogCancel>
            <Button type="submit" variant="destructive" disabled={disabled}>
              Confirmar eliminación
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function DeleteBanner({ id }: { id: number }) {
  const [disabled, setDisabled] = useState(false);
  const deleteBannerWithId = deleteBanner.bind(null, id);

  const handleSubmit = () => {
    setDisabled(true);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
          disabled={disabled}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Eliminar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="border-red-100">
        <form action={deleteBannerWithId} onSubmit={handleSubmit}>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-700">¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará el banner permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel type="button" className="border-gray-300" disabled={disabled}>
              Cancelar
            </AlertDialogCancel>
            <Button
              type="submit"
              variant="destructive"
              className="bg-red-600 hover:bg-red-700"
              disabled={disabled}
            >
              Confirmar eliminación
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function ModifyDisplayBannerButton({ id, isOnDisplay }: { id: number; isOnDisplay: boolean }) {
  const [disabled, setDisabled] = useState(false);

  if (isOnDisplay) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="outline"
            className="w-full border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 hover:text-amber-800"
            disabled={disabled}
          >
            <EyeOffIcon className="mr-2 h-4 w-4" />
            Desactivar banner
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <form
            action={modifyDisplayBannerAction}
            onSubmit={() => setDisabled(true)}
          >
            <input type="hidden" name="bannerId" value={id} />
            <input type="hidden" name="newIsOnDisplay" value="false" />
            <AlertDialogHeader>
              <AlertDialogTitle>Desactivar banner</AlertDialogTitle>
              <AlertDialogDescription>
                El banner será retirado del roster y dejará de mostrarse al público.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel type="button" disabled={disabled}>Cancelar</AlertDialogCancel>
              <Button
                type="submit"
                variant="outline"
                className="border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
                disabled={disabled}
              >
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
          disabled={disabled}
        >
          <EyeIcon className="mr-2 h-4 w-4" />
          Activar banner
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form
          action={modifyDisplayBannerAction}
          onSubmit={() => setDisabled(true)}
        >
          <input type="hidden" name="bannerId" value={id} />
          <input type="hidden" name="newIsOnDisplay" value="true" />
          <AlertDialogHeader>
            <AlertDialogTitle>Activar banner</AlertDialogTitle>
            <AlertDialogDescription>
              El banner será agregado al roster y se mostrará al público.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel type="button" disabled={disabled}>Cancelar</AlertDialogCancel>
            <Button
              type="submit"
              variant="outline"
              className="border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
              disabled={disabled}
            >
              Confirmar activación
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}