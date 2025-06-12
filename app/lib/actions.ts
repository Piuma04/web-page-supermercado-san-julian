'use server'    
import { signIn } from "@/auth"
import { AuthError } from "next-auth"

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const action = formData.get('action');
    switch (action) {
      case 'credentials':
        await signIn(action, formData);
      case 'google':{
        await signIn(action, formData);
      }
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