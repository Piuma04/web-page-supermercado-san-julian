"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Loader2, Minus, Plus, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { addToCart } from "../../lib/actions";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { AspectRatio } from "@/components/ui/aspect-ratio";

type ProductCardProps = {
  id: number;     
  name: string;  
  price: number;
  imageUrl: string | null;
};

export default function ProductCard({ id, name, price, imageUrl }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [isPending, setIsPending] = useState(false);
  const { data: session } = useSession();
  const [state, setState] = useState<{ success: boolean; message: string } | null>(null);

  // Oculta el mensaje automáticamente después de 2 segundos
  useEffect(() => {
    if (state) {
      const timer = setTimeout(() => setState(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [state]);

  const handleAddToCart = async () => {
    if (!session || !session.user || !session.user.email) {
      redirect("/api/auth/signin");
    }
    
    setIsPending(true);
    
    try {
      await addToCart(id, quantity);
      setQuantity(1);
      setIsPending(false);
      setState({success: true, message:"Agregado al carrito"});
    } catch (error) {
      setIsPending(false);
      setState({success: false, message:"Error al agregar al carrito"});
    }
  };

  const imageUrlParsed = (imageUrl === "" || imageUrl === null) ? "/images/stockImage.png" : imageUrl;
  return (
    <div className=" bg-white p-4 rounded-lg  shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="space-y-3">
        {/* Product Image */}
        <AspectRatio ratio={1}>
          <Link href={`/products/${id}`} >
          <div className="relative size-full">
              <Image
                src = {imageUrlParsed}
                alt={name}
                fill
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                className="h-full w-full rounded-lg object-contain"
              />
          </div>
          {/* Subtle overlay on hover */}
          <div className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-colors duration-300 rounded-lg"></div>
          </Link>
        </AspectRatio>

        {/* Product Name */}
        <div>
          <h2 className="text-md sm:text-lg font-semibold text-gray-800 truncate">{name}</h2>
        </div>

        {/* Product Cart Menu */}
        <div className="flex flex-col space-y-3 items-center">
            <div className="flex items-center space-x-1">
            <Button 
              variant="outline" 
              size="sm" 
              aria-label="Aumentar cantidad"
              className="p-1 h-8 w-8 rounded-md" 
              onClick={() => setQuantity(Math.max(1, quantity - 1))} 
              disabled={quantity === 1 || isPending}
            >
              <Minus size={16} />
            </Button>
            <span className="w-6 text-center text-sm font-medium">{quantity}</span>
            <Button 
              variant="outline" 
              size="sm" 
              aria-label="Decrementar cantidad"
              className="p-1 h-8 w-8 rounded-md" 
              onClick={() => setQuantity(quantity + 1)}
              disabled={isPending}
            >
              <Plus size={16} />
            </Button>
            </div>
            <div>
            <Button 
              className="bg-red-600 hover:bg-red-700 text-xs rounded-md min-w-[100px]" 
              size="sm" 
              onClick={handleAddToCart}
              disabled={isPending || quantity === 0}
            >
              {isPending ? (
                <>
                  <Loader2 size={16} className="mr-1 animate-spin" />
                </>
              ) : (
                <>
                  <ShoppingCart size={16} className="mr-1" />
                  <span>Agregar</span>
                </>
              )}
            </Button>
            {state ? (
              <p className={`text-xs mt-2 ${state.success ? "text-green-600" : "text-red-600"}`}>
              {state.message}
              </p>
            ): (
              <p className="text-xs mt-2">‎</p>
              )}
            </div>
        </div>

        {/* Product Price */}
        <div className="text-sm sm:text-md text-gray-600 flex justify-center">
          <p>
            {quantity} Producto{quantity > 1 ? "s" : ""}:{" "}
            <span className="font-bold text-red-600">
              ${(price * quantity).toFixed(2)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}