'use client';
 
import { Search } from 'lucide-react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { FormEvent, useState, useEffect } from 'react';
 
export default function SearchBar({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get('query')?.toString() || ''
  );
  
  // Esto limpiará el input cuando cambie la ruta
  useEffect(() => {
    setSearchTerm('');
  }, [pathname]);

  // Esta función solo se ejecuta cuando se presiona Enter
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      replace('/');
      return;
    }
    
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    params.set('query', searchTerm.trim());
    
    if (pathname === '/') {
      replace(`/products?${params.toString()}`);
    } else {
      replace(`${pathname}?${params.toString()}`);
    }
  };
 
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 w-full">
        <Search size={20} className="text-gray-400 flex-shrink-0" />
        <input
          className="ml-2 bg-transparent w-full text-gray-800 placeholder:text-gray-400 text-base focus:outline-none"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="sr-only">
          Buscar
        </button>
      </div>
    </form>
  );
}