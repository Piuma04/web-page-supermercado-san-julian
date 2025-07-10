import Link from "next/link";
import { auth, signOut } from "@/auth";
import { User, LogOut, LogIn } from "lucide-react";

export default async function AdministerUserSession() {
    const session = await auth();

    if (session?.user?.email) {
        // Show Profile icon on mobile, text on larger screens
        return (
            <Link className="flex flex-col items-center justify-center pt-3" href="/profile" aria-label="Ir al perfil de usuario">
            <span className="block sm:hidden">
                <User size={25} />
            </span>
            <span className="hidden sm:flex flex-col items-center text-sm">
                <User size={25} />
                Perfil
            </span>
            </Link>
        );
    }

    // Show user icon on mobile, text on larger screens
    return (
        <Link
            className="text-gray-500 hover:text-gray-700 flex items-center gap-2"
            href="/login"
            aria-label="Iniciar sesión"
        >
            <span className="block sm:hidden">
                <LogIn size={25} />
            </span>
            <span className="hidden sm:block text-sm text-black">
                Iniciar sesión
            </span>
        </Link>
    );
}