import { Card, CardContent } from '@/components/ui/card';
import { DeleteBanner } from '../AdminButtons';
import Image from 'next/image';

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
    <Card className="w-full max-w-sm border-red-600">
      <CardContent className="p-4 flex flex-col gap-4">
        <div className="relative w-full h-48 rounded-xl overflow-hidden border border-red-100">
          {banner.imageUrl ? (
            <Image
              src={banner.imageUrl}
              alt={banner.name}
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
          <h3 className="text-lg font-semibold text-red-800">{banner.name}</h3>
          <span className={`text-xs font-bold ${banner.isOnDisplay ? 'text-green-600' : 'text-gray-400'}`}>
            {banner.isOnDisplay ? 'En display' : 'No visible'}
          </span>
        </div>

        <div className="flex justify-end gap-2">
          <DeleteBanner id={banner.id} />
        </div>
      </CardContent>
    </Card>
  );
}


