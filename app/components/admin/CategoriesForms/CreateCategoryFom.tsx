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
import { addCategory, categoryState } from '@/app/lib/actions';
import { useActionState } from 'react';

export default function CreateCategoryForm() {
  const initialState: categoryState = { message: null, errors: {} };
  const [state, formAction] = useActionState(addCategory, initialState);

  return (
    <form action={formAction}>
      <Card className="border-red-300 shadow">
        <CardHeader>
          <CardTitle className="text-red-700 text-xl">Agregar categoría</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">

          {state.message && (
            <div className="mb-4 text-center text-red-600 font-semibold" aria-live="polite">
              {state.message}
            </div>
          )}


          <div className="space-y-2">
            <Label htmlFor="name" className="text-red-800">Nombre</Label>
            <Input id="name" name="name" placeholder="Ej: Bebidas" required />
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
              Crear categoría
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );

}