import { CartButtons } from "./CartButtons";
import Image from "next/image";

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
    const imageUrlParsed = (product.imageUrl === "" || product.imageUrl === null) ? "/images/stockImage.png" : product.imageUrl;

    return (
        <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow mb-4 border border-gray-100">
            
            <div className=" w-full sm:w-32 h-32 relative">
                <Image
                    src={imageUrlParsed}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    className="h-full w-full rounded-lg object-contain"
                />
            </div>
            
            {/* Product Info */}
            <div className="flex-grow text-center sm:text-left">
                <h3 className="font-semibold text-lg text-gray-800 truncate">{product.name}</h3>
                <div className="text-sm text-gray-500 mt-1">Precio: <span className="font-medium text-gray-700">${product.price.toFixed(2)}</span></div>
                <div className="text-sm text-gray-700 font-bold mt-2">
                    Subtotal: <span className="text-red-600">${(quantity * product.price).toFixed(2)}</span>
                </div>
            </div>
            
            {/* Quantity Controls */}
            <div className="flex-shrink-0 mt-4 sm:mt-0">
                <CartButtons cartItemId={id} quantity={quantity}/>
            </div>
        </div>
    );
}