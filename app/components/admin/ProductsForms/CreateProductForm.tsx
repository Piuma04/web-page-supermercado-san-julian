'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { createProduct, productState } from '@/app/lib/actions';
import { useActionState, useState } from 'react';
import { CldUploadButton } from 'next-cloudinary';
import { Checkbox } from '@/components/ui/checkbox';

type Category = {
  id: number;
  name: string;
};

type Props = {
  categories: Category[];
};


import type { CloudinaryUploadWidgetResults, CloudinaryUploadWidgetInfo } from 'next-cloudinary';

export default function CreateProductForm({ categories }: Props) {
  const initialState: productState = { message: null, errors: {} };
  const [state, formAction] = useActionState(createProduct, initialState);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [notifyUsers, setNotifyUsers] = useState(true);

  const handleUploadSuccess = (results: CloudinaryUploadWidgetResults) => {
    
    const info = results.info as CloudinaryUploadWidgetInfo | undefined;
    if (info && typeof info === 'object' && 'secure_url' in info) {
      const url = info.secure_url as string;
      setImageUrl(url);
      console.log('Imagen subida:', url);
    }
  };

  
  const handleFormSubmit = async (formData: FormData) => {
    const result = await formAction(formData);
    setImageUrl(""); 
    return result;
  };

  return (
    <form action={handleFormSubmit} >
      <Card className="border-red-300 shadow">
        <CardHeader>
          <CardTitle className="text-red-700 text-xl">Agregar producto</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
     

          {state.message && (
            <div className="mb-4 text-center text-red-600 font-semibold" aria-live="polite">
              {state.message}
            </div>
          )}

         
          <div className="space-y-2">
            <Label htmlFor="name" className="text-red-800">Nombre</Label>
            <Input id="name" name="name" placeholder="Ej: Coca Cola" required />
            <div id="name-error" aria-live="polite" aria-atomic="true">
              {state.errors?.name &&
                state.errors.name.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>

          {/* Descripción */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-red-800">Descripción</Label>
            <Input id="description" name="description" placeholder="Breve descripción" />
            <div id="description-error" aria-live="polite" aria-atomic="true">
              {state.errors?.description &&
                state.errors.description.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>

          {/* Precio */}
          <div className="space-y-2">
            <Label htmlFor="price" className="text-red-800">Precio (ARS)</Label>
            <Input 
              id="price" 
              name="price" 
              type="number" 
              min="0" 
              step ="0.01"
              required 
              aria-describedby="price-error"
            />
            <div id="price-error" aria-live="polite" aria-atomic="true">
              {state.errors?.price &&
                state.errors.price.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>

          {/* Imagen */}
         
           <div>
              <CldUploadButton
                uploadPreset="upload_products"
                onSuccess={handleUploadSuccess}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors font-semibold"
              >
                Subir Imagen
              </CldUploadButton>
              
              <input type="hidden" name="image" value={imageUrl} />
              {imageUrl && (
                <div>
                  <p>Imagen actual:</p>
                  <img src={imageUrl} alt="Imagen subida" width="300" />
                  <p>URL: {imageUrl}</p>
                </div>
              )}
            </div>

          {/* Categoría */}
          <div className="space-y-2">
            <Label htmlFor="categoryId" className="text-red-800">Categoría</Label>
            <select
              id="categoryId"
              name="categoryId"
              required
              className="block w-full rounded-md border border-gray-300 p-2 text-sm"
              defaultValue=""
              aria-describedby="category-error"
            >
              <option value="" disabled>
                Seleccioná una categoría
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <div id="category-error" aria-live="polite" aria-atomic="true">
              {state.errors?.categoryId &&
                state.errors.categoryId.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>

          {/* Habilitar Notificaciones*/}
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="notifyUsers" 
              checked={notifyUsers} 
              onCheckedChange={(checked) => setNotifyUsers(checked as boolean)}
            />
            <Label 
              htmlFor="notifyUsers" 
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Notificar a los clientes de este nuevo producto
            </Label>
            <input 
              type="hidden" 
              name="notifyUsers" 
              value={notifyUsers ? 'true' : 'false'} 
            />
          </div>

          {/* Acciones */}
          <div className="flex justify-end gap-4 pt-4">
            <Link href="/admin/crudProducts">
              <Button variant="outline" type="button">Cancelar</Button>
            </Link>
            <Button type="submit" className="bg-red-600 text-white hover:bg-red-700">
              Crear producto
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
