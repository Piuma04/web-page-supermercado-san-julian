"use client";
import { modifyCartItem } from "@/app/lib/actions";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";


type CartButtonsProps = {
    cartItemId: number;
    quantity: number;
};

export function CartButtons({ cartItemId, quantity }: CartButtonsProps) {

    const modifyCartItemId = modifyCartItem.bind(null, cartItemId);
    const [errorMessage, formAction, isPending] = useActionState(modifyCartItemId, undefined);

    return (
        <div>
            <form action={formAction} className="flex items-center gap-2">
                <Button
                    name="action"
                    value={"decrement"}
                    type="submit"
                    variant="outline"
                    disabled={isPending}
                    size="sm"
                    className="p-1 h-8 w-8 rounded-md"
                    aria-label="Remove one"
                >
                    <Minus size={16} />
                </Button>

                <span className="inline-flex items-center justify-center min-w-[2rem] h-8 bg-gray-100 text-gray-800 font-medium text-sm px-2 rounded">
                    {quantity}
                </span>

                <Button
                    name="action"
                    value={"increment"}
                    type="submit"
                    variant="outline"
                    disabled={isPending}
                    size="sm"
                    className="p-1 h-8 w-8 rounded-md"
                    aria-label="Add one"
                >
                    <Plus size={16} />
                </Button>

                <Button
                    name="action"
                    value={"delete"}
                    type="submit"
                    disabled={isPending}
                    size="sm"
                    className="bg-red-600 hover:bg-red-700 text-white rounded-md flex items-center gap-1 px-2"
                    aria-label="Delete item"
                >
                    <Trash2 size={16} />
                    <span className="text-xs">Eliminar</span>
                </Button>
            </form>
            {errorMessage && (
                <div className="text-red-600 mt-2">
                    {errorMessage}
                </div>
            )}
        </div>
    );
}