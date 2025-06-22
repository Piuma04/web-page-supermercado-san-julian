import Link from 'next/link';
import CategoriesSidebarTrigger from './categoriesSidebar/CategoriesSidebarTrigger';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import AdministerUserSession from './AdministerUserSession';
import { Suspense } from 'react';


export default function HeaderServer() {


  return (
    <header className="sticky top-0 w-full bg-white shadow-md">
        <div className="flex justify-between items-center w-full p-4">
          <CategoriesSidebarTrigger />
          <Link href="/" >
            <Image
            src="/images/sanjulian.png" 
            alt="Imagen del supermercado San Julian"
            width={200} 
            height={200} 
            className='mt-4 mb-2'
            />
          </Link>
          <div className='flex flex-row items-center  justify-between gap-8 pr-4'>  
              <Link href="/cart">
                <ShoppingCart/>
              </Link>
              <Suspense>
                <AdministerUserSession/>
              </Suspense>
          </div>
        </div>
      
    </header>
  );
}
