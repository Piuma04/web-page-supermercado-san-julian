
import { auth } from "@/auth";
import { fetchCartByUserID } from "../../lib/data";
import CartItem from "./CartItem";
import { AddItemButton, DeleteButton, SubstractItemButton } from "./CartButtons";

export default async function CartItems() {
    const session = await auth();

    const userEmail = session!.user!.email!;

    const cartItems = await fetchCartByUserID(userEmail);
    
    return (
        <div>
            {cartItems && cartItems.items && cartItems.items.length > 0 ? (
                <div className="mb-4">
                    <h2 className="text-xl font-bold mb-2">Cart Items:</h2>
                    
                    <ul>
                        {cartItems.items.map((item) => (
                            <li key={item.id}>
                                    
                                    <div className="flex items-center gap-4 border-b py-2">
                                        {item.product.imageUrl && (
                                            <img src={item.product.imageUrl} alt={item.product.name} className="w-16 h-16 object-cover rounded" />
                                        )}
                                        <div className="flex-1">
                                            <div className="font-semibold">{item.product.name}</div>
                                            <div className="text-gray-600">Precio: ${item.product.price}</div>
                                            <div className="text-gray-600">Cantidad: {item.quantity}</div>
                                            <div className="text-gray-600">Subtotal: ${item.quantity * item.product.price}</div>
                                        </div>
                                        <div className="flex gap-2">
                                            <SubstractItemButton cartItemId={item.id} quantity = {item.quantity} />
                                            <AddItemButton cartItemId={item.id} />
                                            <DeleteButton cartItemId={item.id} />
                                        </div>
                                    </div>
                            </li>
                        ))}
                    </ul>
                    <p>
                            Precio Total:{" "}
                            {cartItems.items.reduce(
                                (total, item) => total + item.quantity * item.product.price,
                                0
                            )}
                    </p>
                </div>
            ) : (
                <div>No items in cart.</div>
            )}
        </div>
    );
}
