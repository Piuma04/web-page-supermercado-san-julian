"use server";
import { auth } from "@/auth";
import { fetchCartByUserID } from "../lib/data";


export default async function CartItems() {
    const session = await auth();

    const userEmail = session!.user!.email!;

    const cartItems = await fetchCartByUserID(userEmail);

    return (
        <div>
            {cartItems && cartItems.items && cartItems.items.length > 0 ? (
                <div className="mb-4">
                <h2 className="text-xl font-bold mb-2">Cart Items:</h2>
                <p>Total Items: {cartItems.items.length}</p>
                <ul>
                    {cartItems.items.map((item) => (
                        <li key={item.id}>{item.product.name} = {item.quantity}</li>
                    ))}
                </ul>
                </div>
            ) : (
                <div>No items in cart.</div>
            )}
        </div>
    );
}
