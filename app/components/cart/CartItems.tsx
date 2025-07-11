import { auth } from "@/auth";
import { fetchCart } from "@/app/lib/data";
import CartItem from "./CartItem";
import { Button } from "@/components/ui/button";
import { ShoppingCart} from "lucide-react";
import Link from "next/link";
import CartForm from "./CartForm";

export default async function CartItems() {
    
    const cartItems = await fetchCart();
    
    if(!cartItems) throw new Error("No se encontro carrito asociado al usuario")

    const totalAmount = cartItems && cartItems.items 
        ? cartItems.items.reduce((total, item) => total + item.quantity * item.product.price, 0)
        : 0;
    
    return (
        <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                <ShoppingCart className="text-red-600" />
                Mi Carrito
            </h2>
            
            {cartItems && cartItems.items && cartItems.items.length > 0 ? (
                <div className="flex flex-col lg:flex-row gap-5 items-start">
                    {/* Order Summary - Arriba en móvil, derecha en desktop */}
                    <div className="bg-white p-4 rounded-lg shadow-md mb-6 w-full lg:w-1/3 order-first lg:order-last">
                        <h3 className="text-lg font-semibold mb-2 border-b pb-2">Resumen de la compra</h3>
                        <div className="flex justify-between py-2">
                            <span className="text-gray-600">Subtotal:</span>
                            <span className="font-medium">${totalAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                            <span className="text-gray-600">Envío:</span>
                            <span className="font-medium text-green-700">Gratis</span>
                        </div>
                        <div className="flex justify-between py-3 text-lg font-bold">
                            <span>Total:</span>
                            <span className="text-red-600">${totalAmount.toFixed(2)}</span>
                        </div>
                        <CartForm/>
                    </div>
                    
                    {/* Cart Items - Abajo en móvil, izquierda en desktop */}
                    <div className="space-y-2 mb-8 w-full lg:w-2/3 order-last lg:order-first">
                        {cartItems.items.map((item) => (
                            <CartItem 
                                key={item.id}
                                id={item.id}
                                product={item.product}
                                quantity={item.quantity}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-lg p-8 text-center shadow-md">
                    <div className="flex justify-center mb-4">
                        <ShoppingCart size={64} className="text-gray-300" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Tu carrito está vacío</h3>
                    <p className="text-gray-500 mb-6">Agrega algunos productos para comenzar tu compra</p>
                    <Link href="/products">
                        <Button className="bg-red-600 hover:bg-red-700 text-white">
                            Explorar Productos
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
}
