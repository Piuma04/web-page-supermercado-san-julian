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
import createBanner, { bannerState } from '@/app/lib/actions';
import { useActionState, useState } from 'react';
import { CldUploadButton } from 'next-cloudinary';
import { Checkbox } from '@/components/ui/checkbox';
import type { CloudinaryUploadWidgetResults, CloudinaryUploadWidgetInfo } from 'next-cloudinary';

export default function CreateBannerForm() {
  const initialState: bannerState = { message: null, errors: {} };
  const [state, formAction] = useActionState(createBanner, initialState);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isOnDisplay, setIsOnDisplay] = useState<boolean>(true);

  const handleUploadSuccess = (results: CloudinaryUploadWidgetResults) => {
    const info = results.info as CloudinaryUploadWidgetInfo | undefined;
    if (info && typeof info === 'object' && 'secure_url' in info) {
      const url = info.secure_url as string;
      setImageUrl(url);
      console.log('Imagen subida:', url);
    }
  };

  const handleFormSubmit = async (formData: FormData) => {
    // Add isOnDisplay and imageUrl to formData
    formData.set('isOnDisplay', isOnDisplay ? 'true' : 'false');
    formData.set('imageUrl', imageUrl);
    const result = await formAction(formData);
    setImageUrl('');
    return result;
  };

  return (
    <form action={handleFormSubmit}>
      <Card className="border-red-300 shadow">
        <CardHeader>
          <CardTitle className="text-red-700 text-xl">Agregar banner</CardTitle>
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
            <Input id="name" name="name" placeholder="Ej: Banner principal" required />
            <div id="name-error" aria-live="polite" aria-atomic="true">
              {state.errors?.name &&
                state.errors.name.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>

          {/* Imagen */}
          <div>
            <CldUploadButton
              signatureEndpoint="/api/cloudinary-signature"
              uploadPreset="upload_banners_secure"
              onSuccess={handleUploadSuccess}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors font-semibold"
            >
              Subir Imagen
            </CldUploadButton>
            <input type="hidden" name="imageUrl" value={imageUrl} />
            {imageUrl && (
              <div>
                <p>Imagen actual:</p>
                <img src={imageUrl} alt="Imagen subida" width="300" />
                <p>URL: {imageUrl}</p>
              </div>
            )}
            <div id="imageUrl-error" aria-live="polite" aria-atomic="true">
              {state.errors?.imageUrl &&
                state.errors.imageUrl.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>

          {/* Mostrar en portada */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isOnDisplay"
              checked={isOnDisplay}
              onCheckedChange={(checked) => setIsOnDisplay(!!checked)}
            />
            <Label htmlFor="isOnDisplay" className="text-sm font-medium leading-none">
              Mostrar banner en portada
            </Label>
          </div>
          <input type="hidden" name="isOnDisplay" value={isOnDisplay ? 'true' : 'false'} />

          {/* Acciones */}
          <div className="flex justify-end gap-4 pt-4">
            <Link href="/admin/crudBanners">
              <Button variant="outline" type="button">Cancelar</Button>
            </Link>
            <Button type="submit" className="bg-red-600 text-white hover:bg-red-700">
              Crear banner
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
