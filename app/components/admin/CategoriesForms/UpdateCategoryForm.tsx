'use client';

import { useActionState } from 'react';
import { updateCategory, categoryState } from '@/app/lib/actions';
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

type Props = {
  category: {
    id: number;
    name: string;
  };
};

export default function UpdateCategoryForm({ category }: Props) {
  const initialState: categoryState = { message: null, errors: {} };
  const updateCategoryWithID = updateCategory.bind(null, category.id);
  const [state, formAction] = useActionState(updateCategoryWithID, initialState);

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={category.id} />
      <Card className="border-red-300 shadow">
        <CardHeader>
          <CardTitle className="text-red-700 text-xl">Modificar categoría</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">

          {state.message && (
            <div className="mb-4 text-center text-red-600 font-semibold" aria-live="polite">
              {state.message}
            </div>
          )}


          <div className="space-y-2">
            <Label htmlFor="name" className="text-red-800">Nombre</Label>
            <Input
              id="name"
              name="name"
              defaultValue={category.name}
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