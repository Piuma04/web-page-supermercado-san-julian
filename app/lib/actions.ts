"use server"

import { createPreference } from "@/app/api/mercadopago";
import { Item } from "@/app/lib/types";
import { signIn } from "@/auth"
import { AuthError } from "next-auth"
import { redirect } from "next/navigation";

export async function checkout(formData: FormData){
  let preferenceUrl: string | undefined = undefined;
  try{
    const itemsJson = formData.get('items');
    if (!itemsJson || typeof itemsJson !== 'string') {
      throw new Error("Items not provided or invalid");
    }
    const items: Item[] = JSON.parse(itemsJson);
    preferenceUrl = await createPreference(items);
  } catch (error) {
    console.error("Error creating payment preference:", error);
    throw new Error("Failed to create payment preference");
  }
  if (!preferenceUrl) {
    throw new Error("Failed to create payment url");
  }
  redirect(preferenceUrl);
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const action = formData.get('action');
    switch (action) {
      case 'credentials':
        await signIn(action, formData);
      break;
      case 'google':
        await signIn(action, formData);
      break;
      default:
        return 'Invalid action.';
    }
    
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}