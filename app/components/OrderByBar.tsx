'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ArrowUpDown } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function OrderByBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  
  // Obtener el valor actual de orden de los parámetros de URL
  const [orderBy, setOrderBy] = useState(
    searchParams.get('sort')?.toString() || 'relevance'
  );
  
  // Actualizar el estado cuando cambian los parámetros de URL
  useEffect(() => {
    setOrderBy(searchParams.get('sort')?.toString() || 'relevance');
  }, [searchParams]);

  // Manejar cambio de selección
  const handleChange = (selectedOrder: string) => {
    setOrderBy(selectedOrder);
    
    const params = new URLSearchParams(searchParams);
    params.set('page', '1'); // Resetear paginación al cambiar orden
    
    if (selectedOrder === 'relevance') {
      params.delete('sort'); // Opcional: quitar el parámetro para la opción por defecto
    } else {
      params.set('sort', selectedOrder);
    }
    
    // Actualizar la URL con el nuevo parámetro de ordenamiento
    replace(`${pathname}?${params.toString()}`);
  };
 
  return (
    <div className="flex items-center justify-start mb-4">
      <div className="flex items-center gap-2 px-4 py-2 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
        <ArrowUpDown size={16} />
        <span className="text-sm font-medium text-gray-700">Ordenar por:</span>
        <Select value={orderBy} onValueChange={handleChange}>
          <SelectTrigger className='border-none'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Más relevante</SelectItem>
            <SelectItem value="price_desc">Mayor precio</SelectItem>
            <SelectItem value="price_asc">Menor precio</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}