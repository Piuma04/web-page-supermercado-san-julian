'use client';

import { useActionState } from 'react';
import { updateProduct, productState } from '@/app/lib/actions';
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

type Category = {
  id: number;
  name: string;
};

type Props = {
  product: {
    id: number;
    name: string;
    description: string | null;
    price: number;
    categoryId: number;
    imageUrl: string | null;
  };
  categories: Category[];
};

export default function UpdateProductForm({ categories, product }: Props) {
  const initialState: productState = { message: null, errors: {} };
  const updateProductWithID = updateProduct.bind(null, product.id);
  const [state, formAction] = useActionState(updateProductWithID, initialState);

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={product.id} />
      <Card className="border-red-300 shadow">
        <CardHeader>
          <CardTitle className="text-red-700 text-xl">Modificar producto</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">

          
          {state.message && (
            <div className="mb-4 text-center text-red-600 font-semibold" aria-live="polite">
              {state.message}
            </div>
          )}

          {/* Nombre */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-red-800">Nombre</Label>
            <Input
              id="name"
              name="name"
              defaultValue={product.name}
              required
              aria-describedby="name-error"
            />
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
            <Input
              id="description"
              name="description"
              defaultValue={product.description ?? ''}
              aria-describedby="description-error"
            />
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
              defaultValue={product.price}
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
          <div className="space-y-2">
            <Label htmlFor="image" className="text-red-800">Imagen</Label>
            <Input id="image" name="image" type="file" accept="image/*" aria-describedby="image-error" />
            {product.imageUrl && (
              <img src={product.imageUrl} alt="Imagen actual" className="mt-2 h-20" />
            )}
            <div id="image-error" aria-live="polite" aria-atomic="true">
              {state.errors?.image &&
                state.errors.image.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          {/* Categoría */}
          <div className="space-y-2">
            <Label htmlFor="categoryId" className="text-red-800">Categoría</Label>
            <select
              id="categoryId"
              name="categoryId"
              required
              className="block w-full rounded-md border border-gray-300 p-2 text-sm"
              defaultValue={product.categoryId}
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
          {/* Acciones */}
          <div className="flex justify-end gap-4 pt-4">
            <Link href="/admin/crud">
              <Button variant="outline" type="button">Cancelar</Button>
            </Link>
            <Button type="submit" className="bg-red-600 text-white hover:bg-red-700">
              Guardar cambios
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}