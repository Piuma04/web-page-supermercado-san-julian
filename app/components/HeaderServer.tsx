import Link from 'next/link';
import CategoriesSidebarTrigger from './categoriesSidebar/CategoriesSidebarTrigger';
import Image from 'next/image';
import { ShoppingCart, Menu, Search } from 'lucide-react';
import AdministerUserSession from './AdministerUserSession';
import { Suspense } from 'react';

export default function HeaderServer() {
  return (
    <header className="sticky top-0 w-full bg-white shadow-md z-10 rounded-b-2xl">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full px-2 sm:px-0">
        <div className="flex items-center justify-between w-full sm:w-auto">
          {/* Categories: show sidebar trigger on desktop, menu icon on mobile */}
          <div className="flex items-center">
            <CategoriesSidebarTrigger/>
          </div>
          {/* Logo centered on mobile, left on desktop */}
          <Link href="/" className="flex-1 flex justify-center sm:justify-start">
            <Image
              src="/images/sanjulian.png"
              alt="Imagen del supermercado San Julian"
              width={140}
              height={140}
              className="my-2"
              priority
            />
          </Link>
          {/* Dummy searchbar on mobile */}
          <div className="flex-1 flex justify-end sm:hidden">
            <div className="flex items-center bg-gray-100 rounded-md px-2 py-1 ml-2 w-32">
              <Search size={18} className="text-gray-400" />
              <span className="ml-1 text-gray-400 text-sm">Buscar...</span>
            </div>
          </div>
        </div>
        {/* Dummy searchbar on desktop */}
        <div className="hidden sm:flex flex-1 justify-center">
          <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 w-80 max-w-xs">
            <Search size={20} className="text-gray-400" />
            <span className="ml-2 text-gray-400 text-base">Buscar productos...</span>
          </div>
        </div>
        {/* Cart and user session */}
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
