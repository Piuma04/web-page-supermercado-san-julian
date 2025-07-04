

import { Card, CardContent } from '@/components/ui/card';
import { DeleteProduct, UpdateProduct } from './AdminButtons';
import { CldImage } from 'next-cloudinary';
import Image from 'next/image';


type Product = {
  id: number;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  category: {
    name: string;
  };
};

type Props = {
  product: Product;
};

export default function AdminProductCard({ product}: Props) {
  return (
    <Card className="w-full max-w-sm border-red-600">
      <CardContent className="p-4 flex flex-col gap-4">
        <div className="relative w-full h-48 rounded-xl overflow-hidden border border-red-100">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-red-100 text-red-600 text-sm">
              Imagen no disponible
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-red-800">{product.name}</h3>
          <p className="text-sm text-muted-foreground">{product.description}</p>
          <p className="text-md font-bold text-red-700">${product.price}</p>
          <p className="text-xs text-gray-500">Categoría: {product.category.name}</p>
        </div>

        <div className="flex justify-between gap-2">
          <UpdateProduct id = {product.id.toString()}/>

          <DeleteProduct id={product.id} />
        </div>
      </CardContent>
    </Card>

  );
}
