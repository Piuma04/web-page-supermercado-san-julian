import { Card, CardContent } from '@/components/ui/card';
import { DeleteBanner, ModifyDisplayBannerButton } from '../AdminButtons';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { ImageIcon } from 'lucide-react';

type Banner = {
  id: number;
  name: string;
  imageUrl: string;
  isOnDisplay: boolean;
};

type Props = {
  banner: Banner;
};

export default function AdminBannerCard({ banner }: Props) {
  return (
    <Card className="w-full max-w-sm border border-red-200 shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        {/* Banner image with status indicator */}
        <div className="relative w-full h-48">
          {banner.imageUrl ? (
            <Image
              src={banner.imageUrl}
              alt={banner.name}
              fill
              className="object-cover rounded-t-lg"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-red-50 text-red-600">
              <ImageIcon className="mr-2 h-6 w-6" />
              <span className="text-sm font-medium">Imagen no disponible</span>
            </div>
          )}

          {/* Status badge */}
          <div className="absolute top-3 right-3">
            <Badge
              className={
                banner.isOnDisplay
                  ? 'bg-green-100 text-green-800 border border-green-300'
                  : 'bg-gray-100 text-gray-800 border border-gray-300'
              }
            >
              {banner.isOnDisplay ? 'Activo' : 'Inactivo'}
            </Badge>
          </div>
        </div>

        {/* Card body */}
        <div className="p-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-red-800 mb-1">
              {banner.name}
            </h3>
            <div className="h-0.5 w-16 bg-red-200 rounded-full"></div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <ModifyDisplayBannerButton
              id={banner.id}
              isOnDisplay={banner.isOnDisplay}
            />

            <div className="flex justify-end">
              <DeleteBanner id={banner.id} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


