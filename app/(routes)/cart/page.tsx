import CartItems from "@/app/components/cart/CartItems";
import CartItemsSkeleton from "@/app/components/cart/CartItemSkeleton";
import { Suspense } from "react";

export default function Page() {
  return (
    
      <main className="p-6">
        <Suspense fallback={<CartItemsSkeleton/>}>
          <CartItems />
        </Suspense>
      </main>
 
  );
}