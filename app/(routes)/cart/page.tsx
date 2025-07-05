import CartItems from "@/app/components/cart/CartItems";
import { Suspense } from "react";

export default function Page() {
  return (
    
      <main className="p-6">
        <Suspense fallback={<div>Loading cart items...</div>}>
          <CartItems />
        </Suspense>
      </main>
 
  );
}