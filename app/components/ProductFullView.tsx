"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Loader2, Minus, Plus, ShoppingCart, CheckCircle } from "lucide-react";
import { useState } from "react";
import { addToCart } from "../lib/actions";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";


type ProductFullViewProps = {
    id: number;
    name: string;
    description: string | null;
    price: number;
    imageUrl: string | null;
    category: string
};

export default function ProductFullView({ id, name, description, price, imageUrl, category }: ProductFullViewProps) {
  const [quantity, setQuantity] = useState(1);
  const [isPending, setIsPending] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { data: session } = useSession();

  const handleAddToCart = async () => {
    if (!session || !session.user || !session.user.email) {
      redirect("/api/auth/signin");
    }
    
    setIsPending(true);
    try {
      await addToCart(id, quantity);
      
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsPending(false);
    }
  };

  const imageUrlParsed = (imageUrl === "" || imageUrl === null) ? "https://media.istockphoto.com/id/1147544807/es/vector/no-imagen-en-miniatura-gr%C3%A1fico-vectorial.jpg?s=2048x2048&w=is&k=20&c=pOl6SlMTFYgl2568V8ALEd7Gz7nE07ECPZOu2e7VHr4=" : imageUrl;

  // Helper to truncate description
  const MAX_DESCRIPTION_LENGTH = 120;
  const isLongDescription = description && description.length > MAX_DESCRIPTION_LENGTH;
  const displayedDescription = !showFullDescription && isLongDescription
    ? description?.slice(0, MAX_DESCRIPTION_LENGTH) + "..."
    : description;

  return (
    <main className="flex flex-col items-center min-h-fit py-8 px-4">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="md:w-1/2 p-6 bg-gray-50 flex items-center justify-center">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <Image
                src={imageUrlParsed}
                alt={name}
                fill
                className="object-contain rounded-lg"
                sizes="(max-width: 768px) 100vw, 500px"
                priority
              />
            </div>
          </div>
          
          {/* Product Info */}
          <div className="md:w-1/2 p-8 flex flex-col justify-between">
            <div>
              <div className="mb-1">
                <span className="px-3 py-1 text-xs font-medium bg-red-50 text-red-700 rounded-full">
                  {category}
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-800 mb-3">{name}</h1>
              <p className="text-2xl font-medium text-red-600 mb-4">
                ${price.toFixed(2)}
              </p>
              
              <div className="my-6">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Descripción</h3>
                <div className="text-gray-600 bg-gray-50 p-4 rounded-lg">
                  <p className="text-md">
                    {displayedDescription}
                    {isLongDescription && (
                      <button
                        className="ml-2 text-blue-600 font-medium hover:underline text-sm"
                        onClick={() => setShowFullDescription(!showFullDescription)}
                        type="button"
                      >
                        {showFullDescription ? 'Ver menos' : 'Ver más'}
                      </button>
                    )}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Quantity & Add to cart */}
            <div className="mt-6 border-t pt-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex items-center border rounded-md overflow-hidden">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-10 w-10 rounded-none"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    disabled={quantity === 1 || isPending}
                  >
                    <Minus size={16} />
                  </Button>
                  <span className="w-10 text-center font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-10 w-10 rounded-none"
                    onClick={() => setQuantity(q => q + 1)}
                    disabled={isPending}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
                
                <Button
                  className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-6 py-2 h-10 gap-2 font-bold"
                  onClick={handleAddToCart}
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      <span>Agregando...</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={20} />
                      <span>Agregar al carrito</span>
                    </>
                  )}
                </Button>
              </div>
              
              <div className="text-sm text-gray-600 mt-4">
                <p className="flex items-center gap-1">
                  Subtotal ({quantity} {quantity > 1 ? "productos" : "producto"}):
                  <span className="font-bold text-red-600 text-lg">
                    ${(price * quantity).toFixed(2)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}