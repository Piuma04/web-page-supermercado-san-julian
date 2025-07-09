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
import DescriptionIA from './DescriptionIA';

export default function CreateProductForm({ categories }: Props) {
  const initialState: productState = { message: null, errors: {} };
  
  const [state, formAction] = useActionState(createProduct, initialState);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [notifyUsers, setNotifyUsers] = useState(true);
  const [description, setDescription] = useState(""); 
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleUploadStart = () => {
    setUploading(true);
    setUploadError(null);
  };

  const handleUploadSuccess = (results: CloudinaryUploadWidgetResults) => {
    const info = results.info as CloudinaryUploadWidgetInfo | undefined;
    
    if (info && typeof info === 'object' && 'secure_url' in info) {
      const url = info.secure_url as string;
      setImageUrl(url);
      console.log('Imagen subida:', url);
    }
    setUploading(false);
  };

  const handleUploadError = (error: any) => {
    console.error('Error al subir imagen:', error);
    setUploadError('Error al subir la imagen. Por favor, intenta de nuevo.');
    setUploading(false);
  };

  const handleFormSubmit = async (formData: FormData) => {
    const result = await formAction(formData);
    setImageUrl(""); 
    return result;
  };

  const removeImage = () => {
    setImageUrl("");
    setUploadError(null);
  };

  return (
    <form action={handleFormSubmit}>
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

          {/* Nombre */}
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
            <textarea
              id="description"
              name="description"
              placeholder="Breve descripción"
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={3}
              className="block w-full rounded-md border border-gray-300 p-2 text-sm resize-vertical focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
              style={{ minHeight: '3rem', maxHeight: '12rem', overflowY: 'auto' }}
            />
            <DescriptionIA setDescription={setDescription} />

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
              step="0.01"
              placeholder="0.00"
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
            <Label className="text-red-800">Imagen del producto</Label>
            
            <div className="flex flex-col gap-3">
              <CldUploadButton
                signatureEndpoint="/api/cloudinary-signature"
                uploadPreset="upload_products_secure"
                onUpload={handleUploadStart}
                onSuccess={handleUploadSuccess}
                onError={handleUploadError}
                options={{
                  maxFileSize: 10000000, // 10MB
                  maxImageWidth: 2000, 
                  maxImageHeight: 2000,
                  resourceType: 'image'
                }}
                className={`bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors font-semibold ${uploading ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
              >
                {uploading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Subiendo...
                  </span>
                ) : (
                  'Subir Imagen'
                )}
              </CldUploadButton>

              {/* Error de subida */}
              {uploadError && (
                <div className="text-sm text-red-500 bg-red-50 p-2 rounded border border-red-200">
                  {uploadError}
                </div>
              )}

              {/* Vista previa de la imagen */}
              {imageUrl && (
                <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium text-gray-700">Vista previa:</p>
                    <button
                      type="button"
                      onClick={removeImage}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Eliminar
                    </button>
                  </div>
                  <img 
                    src={imageUrl} 
                    alt="Imagen del producto" 
                    className="max-w-xs rounded-lg shadow-md border"
                  />
                  <p className="text-xs text-gray-500 mt-2 break-all">
                    URL: {imageUrl}
                  </p>
                </div>
              )}
            </div>
            
            {/* Input hidden para enviar la URL */}
            <input type="hidden" name="image" value={imageUrl} />
            
            {/* Error de validación del servidor */}
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
              className="block w-full rounded-md border border-gray-300 p-2 text-sm focus:border-red-500 focus:ring-red-500"
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

          {/* Habilitar Notificaciones */}
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
              <Button variant="outline" type="button">
                Cancelar
              </Button>
            </Link>
            <Button 
              type="submit" 
              className="bg-red-600 text-white hover:bg-red-700"
              disabled={uploading}
            >
              {uploading ? 'Procesando...' : 'Crear producto'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}