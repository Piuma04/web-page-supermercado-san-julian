"use server"

import { createPreference } from "@/app/api/mercadopago";
import { Item } from "@/app/lib/types";

export async function checkout(items:Item[]) {
    try {
        const preferenceUrl = await createPreference(items);
        return preferenceUrl!
    } catch (error) {
        console.error("Error creating preference:", error);
        throw new Error("Failed to create payment preference");
    }
}
