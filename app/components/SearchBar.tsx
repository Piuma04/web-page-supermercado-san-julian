'use client';
 
import { Search } from 'lucide-react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
 
export default function SearchBar({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((value: string) => {
    if (!value.trim()) {
      replace('/');
      return;
    }

    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    params.set('query', value.trim());

    if (pathname.startsWith("/categories") || pathname.startsWith('/products')) {
      replace(`${pathname}?${params.toString()}`);
    } else {
      replace(`/products?${params.toString()}`);
    }
  }, 500);

  return (
      <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 w-full">
        <Search size={20} className="text-gray-400 flex-shrink-0" />
        <input
          className="ml-2 bg-transparent w-full text-gray-800 placeholder:text-gray-400 text-base focus:outline-none"
          placeholder={placeholder}
          defaultValue={searchParams.get('query')?.toString()}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
  );
}