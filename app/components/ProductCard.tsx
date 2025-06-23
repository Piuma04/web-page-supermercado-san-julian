"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import {useState} from "react";
import { addToCart } from "../lib/data";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
type ProductCardProps =  {
    id:number;     
    name:string;  
    description: string;
    price: number;
    imageUrl: string;
};


export default function ProductCard({ id, name, description, price, imageUrl }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const { data: session } = useSession();

  const handleAddToCart = () => {
  if (!session || !session.user || !session.user.email) {
    redirect("/api/auth/signin");
  }
  else
    addToCart(session.user.email, id, quantity);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="space-y-3">
        
        <div className="w-full flex justify-center items-center">
          <Link href={`/products/${id}`} className="block w-full">
            <div className="relative w-full aspect-square max-w-xs mx-auto">
              <Image
                src={imageUrl}
                alt={name}
                fill
                className="object-contain rounded-lg"
                sizes="(max-width: 640px) 100vw, 400px"
                priority
              />
            </div>
          </Link>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 truncate">{name}</h2>
        </div>

        <div className="flex flex-col sm:flex-row space-x-4 space-y-2">
            <div className="flex items-center space-x-1">
            <Button variant="outline" size="sm" className="p-1 h-7 w-7" onClick={() => setQuantity(quantity - 1)} disabled={quantity === 1}
            >
              <Minus size={16} />
            </Button>
            <span className="w-6 text-center text-sm font-medium">{quantity}</span>
            <Button variant="outline" size="sm" className="p-1 h-7 w-7" onClick={() => setQuantity(quantity + 1)}>
              <Plus size={16} />
            </Button>
            </div>
            <div>
            <Button className="bg-red-600 hover:bg-red-700 px-2 py-1 h-7 text-xs gap-1" size="sm" onClick={handleAddToCart}>
              <ShoppingCart size={16} />
              <span>Agregar</span>
            </Button>
            </div>
        </div>

        <div className="text-sm text-gray-600">
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