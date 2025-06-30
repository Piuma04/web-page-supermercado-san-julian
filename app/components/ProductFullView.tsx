"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Loader2, Minus, Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { addToCart } from "../lib/actions";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

type ProductFullViewProps =  {
    id:number;     
    name:string;  
    description: string | null;
    price: number;
    imageUrl: string | null;
    category: string
};


export default function ProductFullView({ id, name, description, price, imageUrl, category }: ProductFullViewProps) {
  const [quantity, setQuantity] = useState(1);
  const [isPending, setIsPending] = useState(false);
  const { data: session } = useSession();

  const handleAddToCart = async () => {
  if (!session || !session.user || !session.user.email) {
    redirect("/api/auth/signin");
  }
  
  setIsPending(true);
  try {
    await addToCart(session.user.email, id, quantity);
  } catch (error) {
    console.error("Error adding to cart:", error);
  } finally {
    setIsPending(false);
  }
};

  return (
      <main className="flex flex-col items-center min-h-screen bg-white py-8 px-2">
        <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Image */}
            <div className="flex-1 flex flex-col items-center">
              <div className="relative w-full aspect-square max-w-xs mx-auto">
                <Image
                  src={imageUrl ?? "https://media.istockphoto.com/id/1147544807/es/vector/no-imagen-en-miniatura-gr%C3%A1fico-vectorial.jpg?s=2048x2048&w=is&k=20&c=pOl6SlMTFYgl2568V8ALEd7Gz7nE07ECPZOu2e7VHr4="}
                  alt={name}
                  fill
                  className="object-contain rounded-lg"
                  sizes="(max-width: 640px) 100vw, 400px"
                  priority
                />
              </div>
            </div>
            {/* Info */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">{name}</h1>
                <p className="text-md font-medium text-red-600 mb-2">${price}</p>
                <p className="text-sm text-gray-500 mb-1">
                  Categoría: <span className="font-semibold">{category}</span>
                </p>
                <p className="text-md text-gray-700 mt-4">{description}</p>
              </div>
              {/* Quantity & Add to cart */}
              <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 space-y-2 sm:space-y-0 items-center mt-6">
                <div className="flex items-center space-x-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="p-1 h-7 w-7"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    disabled={quantity === 1 || isPending}
                  >
                    <Minus size={16} />
                  </Button>
                  <span className="w-6 text-center text-sm font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="p-1 h-7 w-7"
                    onClick={() => setQuantity(q => q + 1)}
                    disabled={isPending}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
                <div>
                  <Button
                    className="bg-red-600 hover:bg-red-700 px-2 py-1 h-10 text-base gap-1 font-bold flex items-center justify-center min-w-[120px]"
                    size="sm"
                    onClick={handleAddToCart}
                    disabled={isPending}
                  >
                    {isPending ? (
                      <>
                        <Loader2 size={20} className="mr-1 animate-spin" />
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={20} />
                        <span>Agregar</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
              <div className="text-sm text-gray-600 mt-2">
                <p>
                  {quantity} Producto{quantity > 1 ? "s" : ""}:{" "}
                  <span className="font-bold text-red-600">
                    ${(price * quantity).toFixed(2)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
}