import { addItemToCart, substractItemFromCart, deleteItemFromCart } from "@/app/lib/data";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type ButtonProps = {
    cartItemId: number;
};

export function AddItemButton({ cartItemId }: ButtonProps) {
    const addItemToCartWithId = addItemToCart.bind(null, cartItemId)

    return (
        <form action={addItemToCartWithId}>
            <input type="hidden" name="cartItemId" value={cartItemId} />
            <Button 
                type="submit" 
                variant="outline"
                size="sm"
                className="p-1 h-8 w-8 rounded-md"
                aria-label="Add one"
            >
                <Plus size={16} />
            </Button>
        </form>
    );
}

export function SubstractItemButton({ cartItemId, quantity }: { cartItemId: number, quantity: number }) {
    const substractItemFromCartWithId = quantity > 1 ? substractItemFromCart.bind(null, cartItemId) : deleteItemFromCart.bind(null, cartItemId)

    return (
        <form action={substractItemFromCartWithId}>
            <input type="hidden" name="cartItemId" value={cartItemId} />
            <Button 
                type="submit" 
                variant="outline"
                size="sm"
                className="p-1 h-8 w-8 rounded-md"
                aria-label="Remove one"
            >
                <Minus size={16} />
            </Button>
        </form>
    );
}

export function DeleteButton({ cartItemId }: ButtonProps) {
    const deleteItemFromCartWithId = deleteItemFromCart.bind(null, cartItemId)

    return (
        <form action={deleteItemFromCartWithId}>
            <input type="hidden" name="cartItemId" value={cartItemId} />
            <Button 
                type="submit" 
                size="sm"
                className="bg-red-600 hover:bg-red-700 text-white rounded-md flex items-center gap-1 px-2"
                aria-label="Delete item"
            >
                <Trash2 size={16} />
                <span className="text-xs">Eliminar</span>
            </Button>
        </form>
    );
}

