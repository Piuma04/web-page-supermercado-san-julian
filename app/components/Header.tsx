import Link from 'next/link';
import CategoriesSidebarTrigger from './categoriesSidebar/CategoriesSidebarTrigger';
import Image from 'next/image';
import { ShoppingCart, Menu, Search } from 'lucide-react';
import AdministerUserSession from './AdministerUserSession';
import { Suspense } from 'react';
import SearchBar from './SearchBar';

export default function Header() {
  return (
    <header className="sticky top-0 w-full bg-white shadow-md z-50 rounded-b-2xl">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full px-2 sm:px-0">
        <div className="flex items-center justify-between w-full sm:w-auto">
          
          <div className="flex items-center">
            <CategoriesSidebarTrigger/>
          </div>
         
          <Link href="/" className="flex-1 flex justify-center md:ml-4 sm:justify-start">
            <div className="size-5/6 p-4">
            <Image
              src="/images/sanjulian.png"
              alt="Imagen del supermercado San Julian"
              width={200}
              height={200}
              className="w-auto h-auto object-contain"
              priority
            />
            </div>
          </Link>
          
          <div className="flex-1 flex justify-end sm:hidden">
            <div className="flex items-center bg-gray-100 rounded-md px-2 py-1 ml-2 w-32">
              <Suspense>
                <SearchBar placeholder="Buscar.." />
              </Suspense>
            </div>
          </div>
        </div>
        
        <div className="hidden sm:flex flex-1 justify-center">
          <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 w-80 max-w-xs">
            <Suspense>
              <SearchBar placeholder="Buscar productos..." />
            </Suspense>
          </div>
        </div>
        
        <div className="flex flex-row items-center gap-6 sm:gap-8 mt-2 sm:mt-0 justify-end mr-1 sm:mr-3 mb-2 sm:mb-0">
          <Link href="/cart" className="flex flex-col items-center justify-center pt-3"> 
            <span className="block sm:hidden">
              <ShoppingCart size={25} />
            </span>
            <span className="hidden sm:flex flex-col items-center text-sm">
                <ShoppingCart size={25} />
                Carrito
            </span>
          </Link>
          <Suspense>
            <AdministerUserSession />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
