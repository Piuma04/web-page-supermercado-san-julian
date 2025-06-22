

import { addItemToCart, substractItemFromCart, deleteItemFromCart } from "@/app/lib/data";



type ButtonProps = {
    cartItemId: number;
};

export function AddItemButton({ cartItemId }: ButtonProps) {
    

    const addItemToCartWithId = addItemToCart.bind(null,cartItemId)

    return (
        <form action={addItemToCartWithId}>
            <input type="hidden" name="cartItemId" value={cartItemId} />
            <button type="submit" className="px-2 py-1 bg-green-500 text-white rounded">+</button>
        </form>
    );
}

export function SubstractItemButton({ cartItemId , quantity  }: {cartItemId:number, quantity:number } )  {
   


    const substractItemFromCartWithId = quantity > 1 ? substractItemFromCart.bind(null,cartItemId) : deleteItemFromCart.bind(null,cartItemId)

    return (
        <form action={substractItemFromCartWithId}>
            <input type="hidden" name="cartItemId" value={cartItemId} />
            <button type="submit" className="px-2 py-1 bg-yellow-500 text-white rounded">-</button>
        </form>
    );
}

export function DeleteButton({ cartItemId }: ButtonProps) {
   

    const deleteItemFromCartWithId = deleteItemFromCart.bind(null,cartItemId)

    return (
        <form action={deleteItemFromCartWithId}>
            <input type="hidden" name="cartItemId" value={cartItemId} />
            <button type="submit" className="px-2 py-1 bg-red-500 text-white rounded">Eliminar</button>
        </form>
    );
}

