

import { CartButtons } from "./CartButtons";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

type Product = {
    id: number;
    name: string;
    price: number;
    imageUrl: string | null;
};

type CartItemProps = {
    id: number;
    product: Product;
    quantity: number;
};

export default function CartItem({ id, product, quantity }: CartItemProps) {
    return (
        <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow mb-4 border border-gray-100">
            {/* Product Image */}
            <div className=" w-32 h-32">
            <AspectRatio ratio={1}>
                <Image
                    src={product.imageUrl ?? "https://media.istockphoto.com/id/1147544807/es/vector/no-imagen-en-miniatura-gr%C3%A1fico-vectorial.jpg?s=2048x2048&w=is&k=20&c=pOl6SlMTFYgl2568V8ALEd7Gz7nE07ECPZOu2e7VHr4="}
                    alt={product.name}
                    fill
                    className="h-full w-full rounded-lg object-contain"
                />
            </AspectRatio>
            </div>
            
            {/* Product Info */}
            <div className="flex-1 min-w-0 text-center sm:text-left">
                <h3 className="font-semibold text-lg text-gray-800 truncate">{product.name}</h3>
                <div className="text-sm text-gray-500 mt-1">Precio: <span className="font-medium text-gray-700">${product.price.toFixed(2)}</span></div>
                <div className="text-sm text-gray-700 font-bold mt-2">
                    Subtotal: <span className="text-red-600">${(quantity * product.price).toFixed(2)}</span>
                </div>
            </div>
            
            {/* Quantity Controls */}
            <CartButtons cartItemId={id} quantity={quantity}/>
        </div>
    );
}