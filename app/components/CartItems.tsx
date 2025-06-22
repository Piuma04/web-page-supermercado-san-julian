import { auth } from "@/auth";
import { fetchCartByUserID } from "../lib/data";


export default async function CartItems() {
    const session = await auth();
    

    //se asume que inicio sesion, sino ver de cambiar eso
    //sino ver de que otra manera se puede obtener el id
    const userId = session!.user!.id!;

    const cartItems = await fetchCartByUserID(userId.toString());

    return (
        <div>
            {cartItems && cartItems.items && cartItems.items.length > 0 ? (
                <ul>
                    {cartItems.items.map((item: any) => (
                        <li key={item.id}>{item.name}</li>
                    ))}
                </ul>
            ) : (
                <div>No items in cart.</div>
            )}
        </div>
    );
}
