



/*

Usar este si se queiren usar trancisiones en el server


*/



import { AddItemButton, SubstractItemButton, DeleteButton } from "./CartButtons";

type Product = {
    id: number;
    name: string;
    price: number;
    imageUrl?: string;
};

type CartItemProps = {
    id: number;
    product: Product;
    quantity: number;
};

export default function CartItem({ id, product, quantity }: CartItemProps) {
    return (
        <div className="flex items-center gap-4 border-b py-2">
            {product.imageUrl && (
                <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover rounded" />
            )}
            <div className="flex-1">
                <div className="font-semibold">{product.name}</div>
                <div className="text-gray-600">Precio: ${product.price}</div>
                <div className="text-gray-600">Cantidad: {quantity}</div>
                <div className="text-gray-600">Subtotal: ${quantity * product.price}</div>
            </div>
            <div className="flex gap-2">
                <SubstractItemButton cartItemId={id} quantity = {quantity} />
                <AddItemButton cartItemId={id} />
                <DeleteButton cartItemId={id} />
            </div>
        </div>
    );
}