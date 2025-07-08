'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ArrowDown, ArrowUp, Minus } from 'lucide-react';
import { TableHead } from '@/components/ui/table';

export default function TotalHead() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const estado: 'neu' | 'asc' | 'desc' =
    sort === 'total' && order === 'asc'
      ? 'asc'
      : sort === 'total' && order === 'desc'
      ? 'desc'
      : 'neu';

  const siguiente: Record<typeof estado, typeof estado> = {
    neu: 'asc',
    asc: 'desc',
    desc: 'neu',
  };

  const handleClick = () => {
    const nuevo = siguiente[estado];
    const params = new URLSearchParams(searchParams.toString());

    if (nuevo === 'neu') {
      params.delete('sort');
      params.delete('order');
    } else {
      params.set('sort', 'total');
      params.set('order', nuevo);
    }

    params.set('page', '1'); 
    router.push(`${pathname}?${params.toString()}`);
  };

  const icon =
    estado === 'asc' ? (
      <ArrowUp size={16} />
    ) : estado === 'desc' ? (
      <ArrowDown size={16} />
    ) : (
      <Minus size={16} className="text-muted-foreground" />
    );

  return (
    <TableHead onClick={handleClick} className="whitespace-nowrap cursor-pointer">
      <div className="flex items-center gap-2">
        Total {icon}
      </div>
    </TableHead>
  );
}
