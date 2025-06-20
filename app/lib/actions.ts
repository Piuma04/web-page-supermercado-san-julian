"use server"

import { createPreference } from "@/app/api/mercadopago";
import { Item } from "@/app/lib/types";
import { signIn } from "@/auth"
import { AuthError } from "next-auth"

export async function checkout(items:Item[]) {
    try {
        const preferenceUrl = await createPreference(items);
        return preferenceUrl!
    } catch (error) {
        console.error("Error creating preference:", error);
        throw new Error("Failed to create payment preference");
    }
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